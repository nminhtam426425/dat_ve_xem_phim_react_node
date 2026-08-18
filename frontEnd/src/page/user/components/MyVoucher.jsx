import { useEffect, useState } from "react"
import { formatDate2 } from "../../validate"
import { customeFetch, apiUserService } from "../../config"

const MyVoucher = () => {
    const [vouchers, setVouchers] = useState([])

    useEffect(()=>{
        const getDatas = async () => {
            try{
                const res = await customeFetch(apiUserService.baseURL+'/vouchers/private','authen','GET')
                if(res.ok){
                    const data = await res.json()
                    setVouchers(data)
                }
            }
            catch(err){
                console.log(err)
            }
        }
        getDatas()
    },[])

    return <>
        <div className="space-y-4">
            <RenderListVoucher type="private" data={vouchers}/>
        </div>
    </>
}

const RenderListVoucher = ({data}) => {

    return <>
        <div className="flex flex-wrap gap-4 w-[300px] justify-center md:w-full">
            {
                data.length > 0
                ?
                data?.map( item => <>
                    <div 
                        key={item.code}
                        className={`relative group bg-zinc-900 border border-zinc-800/50 rounded-xl overflow-hidden shadow-2xl transition-transform  
                            ${item.Users[0].VoucherOfUser.is_use == 0 ? 'opacity-100 active:scale-95 duration-200' : 'opacity-50'}`}
                        >
                        <div className="relative h-40 w-full overflow-hidden">
                            <img className={`w-full h-full object-cover transition-transform ${item.Users[0].VoucherOfUser.is_use == 0 ? 'group-hover:scale-110 duration-500' : ''}`} 
                            src={item?.url == null ? "https://media.istockphoto.com/id/1130968355/vector/cinema-ticket-on-white-background-movie-ticket-template-in-black-and-red-colors.jpg?s=612x612&w=0&k=20&c=6qosLaT7Asf1bxDRpRG-SyV2jyh7dajfvIoYtejjibs=" : item.url}/>
                            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent"></div>
                            <div className="absolute top-3 right-3 bg-red-600 text-white text-[10px] font-bold px-4 py-2 rounded-full uppercase tracking-tighter">
                                {item.code}
                            </div>
                        </div>
                        
                        <div className="p-2">
                            <h3 className="text-xl font-bold text-white mb-2">Giảm {item.discount_type == 'fixed_amount' ? `${item.discount/1000}K` : item.discount+'%'}</h3>
                            <p className="text-zinc-400 text-sm mb-4 line-clamp-2">Cho đơn hàng tối thiếu: {`${item.min_order_value/1000}K`}.</p>

                            {item.max_discount_value&&<p className="text-zinc-400 text-sm mb-4 line-clamp-2">Giảm tối đa: {`${item.max_discount_value/1000}K`}.</p>}
                        </div>
                        {
                            item.Users[0].VoucherOfUser.is_use == 1 &&
                            <span className="absolute inset-0 flex items-center justify-center uppercase italic text-white mb-4">
                                Đã sử dụng
                            </span>
                        }
                    </div>
                </>)
                : 
                <h1>Không có dữ liệu</h1>
            }
        </div>
    </>
}

export default MyVoucher