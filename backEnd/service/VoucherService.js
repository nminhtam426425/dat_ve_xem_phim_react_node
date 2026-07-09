import {Vouchers, VoucherOfUser, User} from "../model/index.js"
import {findObject, convertObjectForUpdate} from "./validate.js"
import { Op, where } from "sequelize"

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

        let vouchers =  await this.voucher.findAll({
            attributes: ['id','code','discount','max_discount_value','min_order_value','expiry_date','usage_limit','remain_usage','discount_type'],
            where: {
                point_cost: 0
            }
        })
        return vouchers.filter(item => item.remain_usage < item.usage_limit && !voucherOfUser.some(voucher => voucher.voucher_id === item.id))
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
                    attributes: [],
                    through: {
                        attributes: [],
                        where:{
                            is_use: 0
                        }
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

    useVoucher = async (idUser,idVoucher, type) => {
        let voucherUpdate = await findObject(this.voucher,'id',idVoucher)

        if(voucherUpdate.remain_usage == voucherUpdate.usage_limit && type == "public")
            throw new Error("Voucher đã hết lượt sử dụng !")

        if(type =="private"){
            await VoucherOfUser.update(
                {
                    is_use: 1
                },
                {
                    where: {
                        user_id: idUser,
                        voucher_id: idVoucher
                    }
                }
            )
        }

        let remain = voucherUpdate.remain_usage
        voucherUpdate.remain_usage = ++remain
        
        return await voucherUpdate.save()
    }

    calcDiscountValue = async (voucher_id, total_amount) => {
        let voucher = await findObject(this.voucher,'id',voucher_id)

        if(voucher.remain_usage == 0)
            throw new Error("Voucher đã hết lượt sử dụng !")
        
        return (voucher.discount_type == 'percentage') ? Math.min(total_amount * (voucher.discount / 100), voucher.max_discount_value) : voucher.discount
    }

    updateVoucher = async ({id,code,min_order_value,discount,max_discount_value,point_cost,expiry_date,usage_limit}) => {
        try{
            let voucherUpdate = await findObject(this.voucher, 'id', id)
            
            let sourceObj = {code,min_order_value,discount,max_discount_value,point_cost,expiry_date,usage_limit}
            voucherUpdate = convertObjectForUpdate(voucherUpdate,sourceObj)

            return await voucherUpdate.save()
        }
        catch(err){
            throw new Error(err.message)
        }
    }

    // hàm xóa nếu người dùng chưa dùng voucher mà xóa trước hạn thì phải phục hồi điểm cho user
    deleteVoucher = async (id) => {
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

        return await VoucherOfUser.create({
            user_id: idUser,
            voucher_id: idVoucher,
            is_use: 0
        })
    }
}

export default new VoucherService(Vouchers)