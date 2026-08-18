import {Save,ChevronDown} from "lucide-react"
import {useEffect, useState } from "react"
import {customeFetch, apiUserService, handleInputOnChange, handleAddData, handleUpdateData} from '../../../config.js'
import { toast } from "sonner"
import { useLoading } from "../../../../LoadingContext.jsx"
import { formatVND2 } from "../../../validate.js"

const formatDate = (date) => {
    let format = new Date(date)
    let day = (format.getDate() < 10 ) ? '0'+format.getDate() : format.getDate()
    let tempMonth = format.getMonth()+1
    let month = tempMonth < 10 ? '0'+tempMonth : tempMonth
    return `${format.getFullYear()}-${month}-${day}`
}

const FormVoucher = ({dataItem,setDataItem, setDatas}) => {
    const {showLoading, hideLoading} = useLoading()
    const [percentageType, setPercentageType] = useState(true)
    const [notPassValid, setNotPassValid] = useState(true)
    // trường hợp khi chuyển từ % -> fixed_amount: cần kiểm tra phụ thuộc vào select và discount 
    const [notPassValid2, setNotPassValid2] = useState(true)
    const [typeDiscount, setTypeDiscount] = useState('percent_tage')
    const [formatVND, setFormatVND] = useState({
        min_order_value: 'vnd',
        max_discount_value: 'vnd'
    })
    const [voucher, setVoucher] = useState({
        code: "",
        discount: 10,
        max_discount_value: 0,
        min_order_value: 50000,
        point_cost: 1,
        usage_limit: 100,
        expiry_date: "",
        discount_type: "percentage"
        
    })
    const [voucherErr, setVoucherErr] = useState({
        code_0: "err",
        discount_0: "",
        max_discount_value_0: "",
        min_order_value_0: "",
        point_cost_0: "",
        usage_limit_0: "",
        expiry_date_0: "",
        discount_type_0: ""
        
    })

    useEffect( ()=>{
        if(dataItem?.id){
            setVoucher({
                code: dataItem.code || "",
                discount: dataItem.discount || 0,
                max_discount_value: dataItem.max_discount_value || 0,
                min_order_value: dataItem.min_order_value ||0,
                point_cost: dataItem.point_cost ||0,
                usage_limit: dataItem.usage_limit || 0,
                expiry_date: formatDate(dataItem.expiry_date) || "",
                discount_type: dataItem.discount_type || "percentage"
            })
            setVoucherErr({
                code_0: "",
                discount_0: "",
                max_discount_value_0: "",
                min_order_value_0: "",
                point_cost_0: "",
                usage_limit_0: "",
                expiry_date_0: "",
                discount_type_0: ""
                
            })
            setPercentageType(dataItem?.discount_type == 'percentage')
            setTypeDiscount(dataItem?.discount_type == 'percentage' ? 'percentage' : 'fix_amount')
        }
        else{
            setVoucher({
                code: "",
                discount: 10,
                max_discount_value: 0,
                min_order_value: 50000,
                point_cost: 1,
                usage_limit: 100,
                expiry_date: "",
                discount_type: "percentage"
            })
            setVoucherErr({
                code_0: "err",
                discount_0: "",
                max_discount_value_0: "",
                min_order_value_0: "",
                point_cost_0: "",
                usage_limit_0: "",
                expiry_date_0: "",
                discount_type_0: ""
            })
            setFormatVND({
                min_order_value: 'vnd',
                max_discount_value: 'vnd'
            })
            setTypeDiscount('percent_tage')
        }
    },[dataItem])

    useEffect(()=>{
        for(let key in voucherErr){
            if(voucherErr[key] != ''){
                setNotPassValid2(true)
                return
            }
        }
        setNotPassValid2(false)
    },[voucherErr])

    // các trường hợp đặc biệt khi set hiển thị Error (validate)
    // filed bị ảnh hưởng như chuyển từ cố định --> % : max_value
    // filed bị ảnh hưởng như chuyển từ free    --> đổi thưởng : expiry_date
    const handleInputChange = (e) => {
        handleInputOnChange(e, setVoucher, setVoucherErr, setNotPassValid, "formVoucher")
        const {id, value} = e.target
        if(id == 'discount_type' && value == 'fixed_amount'){
            setPercentageType(false)
            setVoucher(pre => ({
                ...pre,
                'max_discount_value': 0
            }))
            if(voucher.discount > 0){
                setVoucherErr(pre => {
                    const nextErrors = {
                        ...pre,
                        'discount_0': ''
                    }
            
                    // Kiểm tra toàn bộ form xem có lỗi nào không (bỏ qua khoảng trắng dư thừa nếu có)
                    const isValid = Object.values(nextErrors).every(err => String(err || "").trim() === "")
                    setNotPassValid(!isValid)
                    return nextErrors
                })
            }
        }
        else if(id == 'discount_type' && value == 'percentage'){
            setPercentageType(true)
            if(voucher.discount < 0 || voucher.discount > 100){
                setVoucherErr(pre => ({
                    ...pre,
                    'discount_0': ' *Không hợp lệ'
                }))
            }
        }
        else if(id == 'point_cost' && value == 0){
            setVoucherErr(pre => ({
                ...pre,
                expiry_date_0: ""
            }))
        }  
        else if(id == 'discount' && percentageType && Number(value) > 100){
            setVoucherErr(pre => ({
                ...pre,
                [`${id}_0`]: ' *Không hợp lệ' // id = discount: phần trăm giảm giá
            }))
        }  
        
    }

    const closeModal = () => {
        setDataItem(null)
    }

    const handleAddOrUpdate = async (e) => {
        e.preventDefault()
        showLoading("Đang xử lý dữ liệu !")
        let method = "POST"
        let dataForApi = {}
        if(dataItem?.id){
            method = 'PUT'
            dataForApi = {
                id: dataItem?.id,
                code: voucher.code,
                min_order_value: voucher.min_order_value,
                discount:voucher.discount,
                max_discount_value:voucher.max_discount_value,
                point_cost:voucher.point_cost,
                usage_limit: voucher.usage_limit,
                expiry_date: voucher.point_cost == 0 ? voucher.expiry_date : null,
                discount_type: voucher.discount_type,
            }
        }
        else{
            dataForApi = {
                code: voucher.code,
                min_order_value: voucher.min_order_value,
                discount:voucher.discount,
                max_discount_value:voucher.max_discount_value,
                point_cost:voucher.point_cost,
                expiry_date: voucher.point_cost == 0 ? voucher.expiry_date : null,
                usage_limit:voucher.usage_limit,
                discount_type: voucher.discount_type,
            }
        }
        try{
            const res = await customeFetch(apiUserService.baseURL+'/vouchers','authen',method,JSON.stringify(dataForApi))
            if(res.ok){
                const data = await res.json()
                data.usage_limit = dataForApi.usage_limit
                if(dataForApi.id){
                    handleUpdateData(setDatas, 'id', dataForApi.id, data)
                    toast.success("Cập nhật thành công !")
                }
                else{
                    handleAddData(setDatas, data)
                    toast.success("Thêm thành công !")
                }
                setVoucher({
                    code: "",
                    discount: 0,
                    max_discount_value: 0,
                    min_order_value: 50000,
                    point_cost: 1,
                    usage_limit: 100,
                    expiry_date: "",
                    discount_type: "percentage"
                })
            }
            else{
                const data = await res.json()
                toast.error(data.message)
            } 
            setPercentageType(true)
            setDataItem(null)
        }
        catch(err){
            console.log(err)
        }
        hideLoading()
    }

    const formatDiscount = (value) => {
        if(!value || !typeDiscount) return ""
        if(typeDiscount == 'fix_amount' && !percentageType)
            return formatVND2(value)
        return `${value}%`
    }
  
    return <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/20 modal-content">
        <span className="close" onClick={closeModal}>&times;</span>
        <form method="POST" className="p-8 space-y-4" onSubmit={handleAddOrUpdate}>
            <div className="grid grid-cols-1">
                <div className="md:col-span-8 space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-1">
                            <label className="block text-sm font-label-bold text-on-surface" htmlFor="code">Mã khuyến mãi
                                <p className={`h-4 text-primary ${voucherErr.code_0 == 'err' ? 'text-[0px]' : 'text-[9px]'}`} >{voucherErr.code_0}</p>
                            </label>
                            <input 
                                className="w-full px-4 py-3 bg-surface-container-lowest border border-outline rounded-lg focus:ring-2 focus:ring-primary-container/20 focus:border-primary-container outline-none transition-all placeholder:text-outline-variant" 
                                id="code" 
                                placeholder="VD: KHUYEN_MAI" 
                                type="text"
                                value={voucher.code.toUpperCase()}
                                onChange={handleInputChange}
                                required/>
                        </div>

                        <div className="relative space-y-1"> 
                            <label className="block text-sm font-label-bold text-on-surface" htmlFor="discount_type">Kiểu voucher
                            <p className={`h-4 text-primary text-[9px]}`} ></p>
                            </label>
                            <select
                                disabled={dataItem?.id}
                                value={voucher?.discount_type}
                                onChange={handleInputChange} 
                                className="w-full appearance-none px-4 py-4 bg-surface-container-low border border-outline-variant/50 rounded-lg focus:ring-2 focus:ring-primary outline-none text-label-bold cursor-pointer pr-10"
                                id="discount_type">
                                <option value="percentage">Phần trăm</option>
                                <option value="fixed_amount">Cố định</option>
                            </select>
                            <span className="material-symbols-outlined absolute right-3 mt-3 top-1/2 -translate-y-1/2 pointer-events-none text-secondary">
                                <ChevronDown size={20} />
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-1">
                            <label className="block text-sm font-label-bold text-on-surface" htmlFor="discount">
                                Giảm giá
                                <p className={`h-4 text-primary ${voucherErr.discount_0 == 'err' ? 'text-[0px]' : 'text-[9px]'}`} >{voucherErr.discount_0}</p>
                            </label>
                            <div className="relative">
                                <input 
                                    className="w-full px-4 py-3 bg-surface-container-lowest border border-outline rounded-lg focus:ring-2 focus:ring-primary-container/20 focus:border-primary-container outline-none transition-all" 
                                    id="discount"
                                    type={typeDiscount == null ? "number" : "text"}
                                    value={typeDiscount == null ? voucher?.discount : formatDiscount(voucher?.discount)}
                                    onChange={handleInputChange}
                                    onFocus={()=>setTypeDiscount(null)}
                                    onBlur={()=>setTypeDiscount('fix_amount')} 
                                    required/>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <label className="block text-sm font-label-bold text-on-surface" htmlFor="min_order_value">
                                Giá trị tối thiểu
                                <p className={`h-4 text-primary ${voucherErr.min_order_value_0 == 'err' ? 'text-[0px]' : 'text-[9px]'}`} >{voucherErr.min_order_value_0}</p>
                            </label>
                            <div className="relative">
                                <input 
                                    className="w-full px-4 py-3 bg-surface-container-lowest border border-outline rounded-lg focus:ring-2 focus:ring-primary-container/20 focus:border-primary-container outline-none transition-all" 
                                    id="min_order_value" 
                                    type={formatVND.min_order_value == 'vnd' ? "text" : "number"}
                                    value={formatVND.min_order_value == 'vnd' ? formatVND2(voucher?.min_order_value) : voucher?.min_order_value}
                                    onChange={handleInputChange} 
                                    onFocus={()=>setFormatVND(pre => ({
                                        ...pre,
                                        'min_order_value': null
                                    }))}
                                    onBlur={()=>setFormatVND(pre => ({
                                        ...pre,
                                        'min_order_value': 'vnd'
                                    }))} 
                                    required/>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-1">
                            <label className="block text-sm font-label-bold text-on-surface" htmlFor="max_discount_value">
                                Giảm tối đa - voucher giảm (%)
                                <p className={`h-4 text-primary ${voucherErr.max_discount_value_0 == 'err' ? 'text-[0px]' : 'text-[9px]'}`} >{voucherErr.max_discount_value_0}</p>
                            </label>
                            <div className="relative">
                                <input 
                                    className="w-full px-4 py-3 bg-surface-container-lowest border border-outline rounded-lg focus:ring-2 focus:ring-primary-container/20 focus:border-primary-container outline-none transition-all" 
                                    id="max_discount_value"
                                    readOnly={!percentageType}
                                    type={formatVND.max_discount_value == 'vnd' ? "text" : "number"}
                                    value={formatVND.max_discount_value == 'vnd' ? formatVND2(voucher?.max_discount_value) : voucher?.max_discount_value}
                                    onChange={handleInputChange} 
                                    onFocus={()=>setFormatVND(pre => ({
                                        ...pre,
                                        'max_discount_value': null
                                    }))}
                                    onBlur={()=>setFormatVND(pre => ({
                                        ...pre,
                                        'max_discount_value': 'vnd'
                                    }))} 
                                    required/>
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="block text-sm font-label-bold text-on-surface" htmlFor="usage_limit">
                                Số lượt sử dụng
                                <p className={`h-4 text-primary ${voucherErr.usage_limit_0 == 'err' ? 'text-[0px]' : 'text-[9px]'}`} >{voucherErr.usage_limit_0}</p>
                            </label>
                            <div className="relative">
                                <input 
                                    className="w-full px-4 py-3 bg-surface-container-lowest border border-outline rounded-lg focus:ring-2 focus:ring-primary-container/20 focus:border-primary-container outline-none transition-all" 
                                    id="usage_limit"
                                    type="number"
                                    value={voucher?.usage_limit}
                                    onChange={handleInputChange} 
                                    required/>
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="block text-sm font-label-bold text-on-surface" htmlFor="point_cost">
                                Điểm để đổi thưởng
                                <p className={`h-4 text-primary ${voucherErr.point_cost_0 == 'err' ? 'text-[0px]' : 'text-[9px]'}`} >{voucherErr.point_cost_0}</p>
                            </label>
                            <div className="relative">
                                <input 
                                    className="w-full px-4 py-3 bg-surface-container-lowest border border-outline rounded-lg focus:ring-2 focus:ring-primary-container/20 focus:border-primary-container outline-none transition-all" 
                                    id="point_cost"
                                    type="number"
                                    value={voucher?.point_cost}
                                    onChange={handleInputChange} 
                                    required/>
                            </div>
                        </div>
                        {
                            voucher?.point_cost == 0
                            &&
                            <div className="space-y-1">
                                <label className="block text-sm font-label-bold text-on-surface" htmlFor="expiry_date">
                                    Ngày hết hạn
                                    <p className={`h-4 text-primary ${voucherErr.expiry_date_0 == 'err' ? 'text-[0px]' : 'text-[9px]'}`} >{voucherErr.expiry_date_0}</p>
                                </label>
                                <div className="relative">
                                    <input 
                                        className="w-full px-4 py-3 bg-surface-container-lowest border border-outline rounded-lg focus:ring-2 focus:ring-primary-container/20 focus:border-primary-container outline-none transition-all" 
                                        id="expiry_date"
                                        value={voucher?.expiry_date}
                                        onChange={handleInputChange} 
                                        type="date"
                                        required/>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>

            <div className="pt-8 border-t border-outline-variant/30 flex items-center justify-end gap-4">
                <button 
                    className="px-8 py-3 rounded-lg border border-outline text-secondary font-label-bold hover:bg-surface-container-high hover:text-on-surface transition-all active:scale-95" 
                    type="button"
                    onClick={closeModal}>
                    Hủy bỏ
                </button>
                <button 
                    className={`px-10 py-3 rounded-lg bg-primary-container text-on-primary font-label-bold shadow-lg shadow-primary-container/30  flex items-center gap-2
                        ${(notPassValid || notPassValid2) ? 'hover:bg-primary transition-all cursor-not-allowed' : 'cursor-pointer active:scale-95'}`} 
                    type="submit"
                    disabled={(notPassValid || notPassValid2)}>
                    <span className="material-symbols-outlined text-lg">
                        <Save size={20}/>
                    </span>
                            Lưu thông tin
                </button>
            </div>
        </form>
    </div>
}

export default FormVoucher