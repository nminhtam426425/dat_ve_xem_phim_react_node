import {Vouchers} from "../model/index.js"
import {findObject, convertObjectForUpdate} from "./validate.js"

class VoucherService {
    constructor(voucher) {
        this.voucher = voucher;
    }

    getAll = async () => {
        return await this.voucher.findAll({
            attributes: ['id','code','discount','max_discount_value','min_order_value','expiry_date','usage_limit','remain_usage','discount_type']
        })
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

    useVoucher = async ({voucher_id}) => {
        let voucherUpdate = await findObject(this.voucher,'id',voucher_id)

        if(voucherUpdate.remain_usage == 0)
            throw new Error("Voucher đã hết lượt sử dụng !")

        let remain = voucherUpdate.remain_usage
        voucherUpdate.remain_usage = --remain
        
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
}

export default new VoucherService(Vouchers)