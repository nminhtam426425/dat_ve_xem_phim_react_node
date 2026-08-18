import {Vouchers, VoucherOfUser, User, sequelize, Bookings} from "../model/index.js"
import {findObject, convertObjectForUpdate} from "./validate.js"
import { Op, Sequelize, where } from "sequelize"

class VoucherService {
    constructor(voucher) {
        this.voucher = voucher;
    }

    getAll = async () => {
        let vouchers =  await this.voucher.findAll({
            attributes: ['id','code','discount','max_discount_value','min_order_value','expiry_date','usage_limit','remain_usage','discount_type','point_cost']
        })
        return vouchers
    }

    // lấy danh sách voucher dùng cho sử dụng miễn phí
    // cần dăng ký tài khoản mới cho sử dụng
    getAllForUser = async (idUser) => {
        let voucherOfUser = await VoucherOfUser.findAll({
            attributes: ['voucher_id'],
            where: {
                user_id: idUser
            }
        })
        let voucherAreUsed = await Bookings.findAll({
            attributes: [],
            include:[
                {
                    model: Vouchers,
                    attributes: ['id'],
                    through: {
                        attributes:[]
                    }
                }
            ],
            where:{
                user_id: idUser
            }
        })
        voucherAreUsed = voucherAreUsed.filter(item => item.Vouchers.length > 0)

        let vouchers =  await this.voucher.findAll({
            attributes: ['id','code','discount','max_discount_value','min_order_value','expiry_date','usage_limit','remain_usage','discount_type'],
            where: {
                point_cost: 0,
                expiry_date: {
                    [Op.gte]: new Date()
                }
            }
        })
        // vì voucherAreUsed là mảng chứa props là 1 mảng
        //[ {Vouchers: []}
        //]
        return vouchers.filter(item => 
            item.remain_usage < item.usage_limit 
            && !voucherOfUser.some(voucher => voucher.voucher_id === item.id) 
            && !voucherAreUsed.some(voucherUsed => voucherUsed.Vouchers.some(temp => temp.id === item.id))
        )
    }

    // danh sách các voucher cho đổi thưởng
    // chỉ lấy nếu voucherOfUser chưa có dữ liệu
    getVoucherForPointExchange = async (idUser) => {
        let voucherOfUser = await VoucherOfUser.findAll({
            attributes: ['voucher_id'],
            where: {
                user_id: idUser
            }
        })

        let vouchers =  await this.voucher.findAll({
            attributes: ['id','code','discount','point_cost','max_discount_value','min_order_value','expiry_date','usage_limit','remain_usage','discount_type'],
            where: {
                point_cost: {
                    [Op.gt]: 0
                }
            }
        })
        return vouchers.filter(item => !voucherOfUser.some(voucher => voucher.voucher_id === item.id))
    }

    // lấy danh sách voucher của cá nhân
    getVoucherPrivate = async (idUser) => {
        let vouchers =  await this.voucher.findAll({
            attributes: ['id','code','discount','max_discount_value','min_order_value','expiry_date','usage_limit','remain_usage','discount_type'],
            include: [
                {
                    model: User,
                    attributes: ['role'],
                    through: {
                        attributes: ['is_use'],
                    },
                    where: {
                        id: idUser
                    }
                }
            ]
        })
        return vouchers
    }

    create = async ({code,min_order_value,discount,max_discount_value,point_cost,expiry_date,usage_limit,type,discount_type}) => {
        try{
            let codeExist = await this.voucher.findOne({
                where:{
                    code
                }
            })
            if(codeExist)
                throw new Error("Mã code đã tồn tại!")
            return await this.voucher.create({
                code,
                min_order_value,
                discount,
                max_discount_value,
                point_cost,
                expiry_date,
                usage_limit,
                remain_usage: 0,
                type,
                discount_type
            })
        }
        catch(err){
            throw new Error(err.message)
        }
    }

    useVoucher = async (idVoucher) => {
        try{
            await sequelize.transaction( async t => {
                const voucher = await this.voucher.findOne({
                    where: {
                        id: idVoucher
                    },
                    lock: t.LOCK.UPDATE,
                    transaction: t
                })
                if(voucher.remain_usage == voucher.usage_limit && voucher.remain_usage != 0)
                    throw new Error("Voucher dã hết lượt sử dụng !")
                let usage = voucher.remain_usage
                await voucher.update(
                    {
                        remain_usage: usage+1
                    },
                    {transaction: t}
                )
                return true
            })
        }
        catch(err){
            throw new Error(err.message)
        }
    }

    calcDiscountValue = async (voucher_id, total_amount) => {
        let voucher = await findObject(this.voucher,'id',voucher_id)

        if(voucher.remain_usage == 0)
            throw new Error("Voucher đã hết lượt sử dụng !")
        
        return (voucher.discount_type == 'percentage') ? Math.min(total_amount * (voucher.discount / 100), voucher.max_discount_value) : voucher.discount
    }

    // hàm cộng lại điểm cho nhưng user có voucher chưa sử dụng nhưng bị admin xóa hoặc cập nhật
    updateRewardPoint = async (users, voucher, voucher_id) => {
        if(!users || users.length == 0) return
        
        await User.update(
            { 
                reward_points: Sequelize.literal(`reward_points + ${Number(voucher.point_cost)}`) 
            },
            { 
                where: { 
                    id:{
                        [Op.in]: users
                    }
                } 
            }
        )
          
        await VoucherOfUser.destroy({
            where:{
                voucher_id: voucher_id,
                is_use: 0
            }
        })
    }

    updateVoucher = async ({id,code,min_order_value,discount,max_discount_value,point_cost,expiry_date,usage_limit}) => {
        try{
            let voucherUpdate = await findObject(this.voucher, 'id', id)
            if(voucherUpdate.point_cost > 0){
                let users = await VoucherOfUser.findAll({
                    attributes:['user_id'],
                    where:{
                        voucher_id: id
                    }
                })
                let idUsers = users.map(item => item.user_id)
                await this.updateRewardPoint(idUsers, voucherUpdate, id)

            }
            
            let sourceObj = {code,min_order_value,discount,max_discount_value,point_cost,expiry_date,usage_limit}
            voucherUpdate = convertObjectForUpdate(voucherUpdate,sourceObj)

            return await voucherUpdate.save()
        }
        catch(err){
            throw new Error(err.message)
        }
    }

    // hàm xóa nếu người dùng chưa dùng voucher ==>  phục hồi điểm cho user
    deleteVoucher = async (id) => {
        let voucherUpdate = await findObject(this.voucher, 'id', id)
        
        let users = await VoucherOfUser.findAll({
            attributes:['user_id'],
            where:{
                voucher_id: id,
                is_use: 0
            }
        })
        let idUsers = users.map(item => item.user_id)
        await this.updateRewardPoint(idUsers, voucherUpdate, id)

        return await this.voucher.destroy({
            where: {id: id}
        })
    }

    // đổi voucher bằng điểm
    pointExchange = async (idUser, idVoucher) => {
        const user = await User.findByPk(idUser)
        const voucher = await findObject(this.voucher, 'id', idVoucher)

        if(user.reward_points < voucher.point_cost)
            throw new Error("Điểm của bạn không đủ để đổi voucher này !")

        await this.useVoucher(idVoucher)
        let remanPoint = user.reward_points - voucher.point_cost
        
        await user.update({
            reward_points: remanPoint
        })

        return await VoucherOfUser.create({
            user_id: idUser,
            voucher_id: idVoucher,
            is_use: 0
        })
    }
}

export default new VoucherService(Vouchers)