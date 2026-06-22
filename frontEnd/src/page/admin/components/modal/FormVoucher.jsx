import {Save,ChevronDown} from "lucide-react"
import {useEffect, useState } from "react"
import {customeFetch, apiUserService, handleInputOnChange, handleAddData, handleUpdateData} from '../../../config.js'
import { toast } from "sonner"
import { useLoading } from "../../../../LoadingContext.jsx"

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
    const [notPassValid, setNotPassValid] = useState(false)
    const [voucher, setVoucher] = useState({
        code: "",
        discount: 0,
        max_discount_value: 0,
        min_order_value: 0,
        point_cost: 0,
        usage_limit: 0,
        expiry_date: "",
        discount_type: "percentage"
        
    })

    useEffect( ()=>{
        if(dataItem){
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
        }
        else{
            setVoucher({
                code: "",
                discount: 0,
                max_discount_value: 0,
                min_order_value: 0,
                point_cost: 0,
                usage_limit: 0,
                expiry_date: "",
                discount_type: "percentage"
                
            })
        }
    },[dataItem])

    const handleInputChange = (e) => {
        handleInputOnChange(e, setVoucher, null, ()=>{})
        if(e.target.id == 'discount_type' && e.target.value == 'fixed_amount'){
            setPercentageType(false)
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
        if(dataItem.id){
            method = 'PUT'
            dataForApi = {
                id: dataItem.id,
                code: voucher.code,
                min_order_value: voucher.min_order_value,
                discount:voucher.discount,
                max_discount_value:voucher.max_discount_value,
                point_cost:voucher.point_cost,
                usage_limit: voucher.usage_limit,
                expiry_date:voucher.expiry_date,
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
                expiry_date:voucher.expiry_date,
                usage_limit:voucher.usage_limit,
                type: null,
                discount_type: voucher.discount_type,
            }
        }
        try{
            const res = await customeFetch(apiUserService.baseURL+'/vouchers','authen',method,JSON.stringify(dataForApi))
            if(res.ok){
                const data = await res.json()
                data.usage_limit = dataForApi.usage_limit
                console.log(data)
                if(dataForApi.id){
                    handleUpdateData(setDatas, 'id', dataForApi.id, data)
                    toast.success("Cập nhật thành công !")
                }
                else{
                    handleAddData(setDatas, data)
                    toast.success("Thêm thành công !")
                }
            }
            else
                toast.error("Thêm thất bại !")
            setPercentageType(true)
            setDataItem(null)
        }
        catch(err){
            console.log(err)
        }
        hideLoading()
    }
  
    return <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/20 modal-content">
        <span className="close" onClick={closeModal}>&times;</span>
        <form method="POST" className="p-8 space-y-4" onSubmit={handleAddOrUpdate}>

            <div className="grid grid-cols-1">
                <div className="md:col-span-8 space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-1">
                            <label className="block text-sm font-label-bold text-on-surface" htmlFor="code">Mã khuyến mãi
                                <span id="title_0" className="text-primary"></span>
                            </label>
                            <input 
                                className="w-full px-4 py-3 bg-surface-container-lowest border border-outline rounded-lg focus:ring-2 focus:ring-primary-container/20 focus:border-primary-container outline-none transition-all placeholder:text-outline-variant" 
                                id="code" 
                                placeholder="VD: KHUYENMAI" 
                                type="text"
                                value={voucher.code}
                                onChange={handleInputChange}
                                required/>
                        </div>

                        <div className="relative space-y-1"> 
                            <label className="block text-sm font-label-bold text-on-surface" htmlFor="discount_type">Kiểu voucher
                                <span id="title_0" className="text-primary"></span>
                            </label>
                            <select
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
                            <label className="block text-sm font-label-bold text-on-surface" htmlFor="discount">Giảm giá</label>
                            <div className="relative">
                                <input 
                                    className="w-full px-4 py-3 bg-surface-container-lowest border border-outline rounded-lg focus:ring-2 focus:ring-primary-container/20 focus:border-primary-container outline-none transition-all" 
                                    id="discount"
                                    type="text"
                                    value={voucher?.discount}
                                    onChange={handleInputChange} 
                                    required/>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <label className="block text-sm font-label-bold text-on-surface" htmlFor="min_order_value">Giá trị tối thiểu</label>
                            <div className="relative">
                                <input 
                                    className="w-full px-4 py-3 bg-surface-container-lowest border border-outline rounded-lg focus:ring-2 focus:ring-primary-container/20 focus:border-primary-container outline-none transition-all" 
                                    id="min_order_value" 
                                    value={voucher?.min_order_value}
                                    onChange={handleInputChange} 
                                    type="text"
                                    required/>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-1">
                            <label className="block text-sm font-label-bold text-on-surface" htmlFor="max_discount_value">Giảm tối đa (%)</label>
                            <div className="relative">
                                <input 
                                    className="w-full px-4 py-3 bg-surface-container-lowest border border-outline rounded-lg focus:ring-2 focus:ring-primary-container/20 focus:border-primary-container outline-none transition-all" 
                                    id="max_discount_value"
                                    readOnly={!percentageType}
                                    type="text"
                                    value={voucher?.max_discount_value}
                                    onChange={handleInputChange} 
                                    required/>
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="block text-sm font-label-bold text-on-surface" htmlFor="usage_limit">Số lượt sử dụng</label>
                            <div className="relative">
                                <input 
                                    className="w-full px-4 py-3 bg-surface-container-lowest border border-outline rounded-lg focus:ring-2 focus:ring-primary-container/20 focus:border-primary-container outline-none transition-all" 
                                    id="usage_limit"
                                    type="text"
                                    value={voucher?.usage_limit}
                                    onChange={handleInputChange} 
                                    required/>
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="block text-sm font-label-bold text-on-surface" htmlFor="point_cost">Điểm để đổi thưởng</label>
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

                        <div className="space-y-1">
                            <label className="block text-sm font-label-bold text-on-surface" htmlFor="expiry_date">Ngày hết hạn</label>
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
                        ${notPassValid ? 'hover:bg-primary transition-all cursor-not-allowed' : 'cursor-pointer active:scale-95'}`} 
                    type="submit"
                    disabled={notPassValid}>
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