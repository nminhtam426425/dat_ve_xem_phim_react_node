import { formatVND2 } from "../../../validate"
import {toast} from "sonner"
import { customeFetch, apiUserService } from "../../../config"

const ConfirmBook = ({confirm, setConfirm}) => {
    const handlePayment = async () => {
        try{
            let dataForApi = {
                showtime_id: confirm.showtime.id,
                price_at_booking: confirm.price_at_booking,
                role: 'user',
                useVoucher: confirm.useVoucher
            }
            const res = await customeFetch(apiUserService.baseURL+'/payments/vnpay/create-payment','authen','POST',JSON.stringify(dataForApi))
            if(res.ok){
                const data = await res.json()
                window.location.href = data.paymentUrl
            }
            else {
                const data = await res.json()
                toast.error(data.message)
            }
        }
        catch(err){
            console.log(err)
        }
    }
    return<>
         <div className="modal" style={{display: confirm ? 'flex' : 'none'}}>
            <div className="modal-content p-0">
                <div className="mt-2 text-center lg:text-left">
                    <h1 className="font-headline-lg text-headline-lg text-on-surface text-center">Xác nhận thông tin</h1>
                </div>
                <div className="w-[300px] md:w-[500px] max-w-md rounded-2xl bg-white p-6 shadow-xl transition-all dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">

                    <div className="space-y-2">
                        <div className="space-y-2 gap-4">
                            <label className="font-label-bold text-on-surface ml-1" htmlFor='fullname'>
                                Tên phim:
                            </label>
                            <div className="relative">
                                <h2 
                                    className="w-full pl-4 pr-4 py-2 bg-white border border-secondary/20 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all font-body-md" 
                                    placeholder="" 
                                    id="fullname"
                                    type="text">
                                        {confirm?.title}
                                </h2>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="font-label-bold text-on-surface ml-1" htmlFor='start'>
                                Suất chiếu:
                            </label>
                            <div className="relative">
                                <h2 
                                    className="w-full pl-4 pr-4 py-2 bg-primary/50 border border-secondary/20 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all font-body-md" 
                                    id="start"
                                    readOnly>{confirm?.showtime?.start_time}</h2>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="font-label-bold text-on-surface ml-1" htmlFor='end'>
                                Kết thúc:
                            </label>
                            <div className="relative">
                                <h2 
                                    className="w-full pl-4 pr-4 py-2 border border-secondary/20 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all font-body-md"  
                                    id="end">{confirm?.showtime?.end_time}</h2>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="font-label-bold text-on-surface ml-1" htmlFor="price">
                                Đã giảm:
                            </label>
                            <div className="relative">
                                <h2 
                                    className="w-full pl-4 pr-4 py-2 bg-white text-primary border border-secondary/20 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all font-body-md"
                                    id="price"
                                    >
                                    {formatVND2(confirm?.valueBeforeDiscount - confirm?.price_at_booking)}
                                </h2>
                            </div>
                        </div>
                        
                        <div className="space-y-2">
                            <label className="font-label-bold text-on-surface ml-1" htmlFor="price">
                                Thanh toán:
                            </label>
                            <div className="relative">
                                <h2 
                                    className="w-full pl-4 pr-4 py-2 bg-white border border-secondary/20 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all font-body-md"
                                    id="price"
                                    >
                                        {formatVND2(confirm?.price_at_booking)}
                                    </h2>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="font-label-bold text-on-surface ml-1" htmlFor="seats">
                                Ghế chọn:
                            </label>
                            <div className="relative">
                                <h2 
                                    className="w-full pl-4 pr-4 py-2 bg-primary/50 border border-secondary/20 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all font-body-md"
                                    id="seats">{confirm?.seats.join(', ')}</h2>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                    <button 
                        type="button" 
                        className="inline-flex items-center justify-center rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm font-semibold text-zinc-700 shadow-xs hover:bg-zinc-50 active:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700/50 cursor-pointer transition-colors"
                        onClick={()=>setConfirm(null)}
                        >Hủy bỏ
                    </button>

                    <button 
                        type="button" 
                        className="inline-flex items-center justify-center rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-red-500 active:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600 cursor-pointer transition-colors"
                        onClick={handlePayment}
                        >Xác nhận
                    </button>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default ConfirmBook