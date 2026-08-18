import { getAccessToken } from "../../tokenStore"
import { formatDate2 } from "../../validate"

const ContentListVoucher = ({datas, setConfirm, setDataBeforeConfirm}) => {
    return <main className="w-full bg-background2">
        <RenderListVoucher data={datas} setConfirm={setConfirm} setDataBeforeConfirm={setDataBeforeConfirm}/>
    </main>
}

const RenderListVoucher = ({data, setConfirm, setDataBeforeConfirm}) => {

    const hanleExchange = (voucher) => {
        setDataBeforeConfirm(voucher)
        setConfirm(true)
    }

    return <section className="p-2 md:p-4 lg:p-12">
        <div className="flex gap-4 w-[300px] md:w-full flex-wrap justify-center relative">
            {
                data.length > 0
                ?
                data?.map( item => <>
                    <div 
                        key={item.code}
                        className={`group w-full md:w-[500px] bg-zinc-900 border border-zinc-800/50 rounded-xl overflow-hidden shadow-2xl transition-transform active:scale-95 duration-200`}
                        >
                        <div className="relative h-40 w-full overflow-hidden">
                            <img className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500" src={item?.url == null ? "https://media.istockphoto.com/id/1130968355/vector/cinema-ticket-on-white-background-movie-ticket-template-in-black-and-red-colors.jpg?s=612x612&w=0&k=20&c=6qosLaT7Asf1bxDRpRG-SyV2jyh7dajfvIoYtejjibs=" : item.url}/>
                            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent"></div>
                            <div className="absolute top-3 right-3 bg-red-600 text-white text-[10px] font-bold px-4 py-2 rounded-full uppercase tracking-tighter">
                                {item.code}
                            </div>
                        </div>
                        
                        <div className="p-6">
                            <h3 className="text-xl font-bold text-white mb-2">Giảm {item.discount_type == 'fixed_amount' ? `${item.discount/1000}K` : item.discount+'%'}</h3>
                            <p className="text-zinc-400 text-sm mb-4 line-clamp-2">Cho đơn hàng tối thiếu: {`${item.min_order_value/1000}K`}.</p>
                            
                            {item.max_discount_value&&<p className="text-white font-bold mb-4 line-clamp-2">Giảm tối đa: {`${item.max_discount_value/1000}K`}.</p>}
                            
                            <p className="text-zinc-400 text-sm mb-4 line-clamp-2">Điểm để đôi thưởng: {item.point_cost}.</p>
                            <div className="flex items-center justify-between">
                            {
                                item.point_cost==0 
                                ?
                                <div className="flex flex-col">
                                   <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest">Hết hạn</span>
                                    <span className="text-sm font-semibold text-zinc-300">{formatDate2(item.expiry_date)}</span>
                                </div>
                                :
                                <div className="flex flex-col"></div>
                            }  
                                <button
                                    onClick={() => hanleExchange(item)}
                                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg text-sm transition-colors shadow-lg shadow-red-900/20"
                                    >
                                    Đổi thưởng
                                </button>
                            </div>
                        </div>
                    </div>
                </>)
                : 
                <div className="h-[475px]">
                    {
                        !getAccessToken()
                        ? 
                        <h1 className="text-white text-center">Vui lòng đăng ký tài khoản trên hệ thống để có thể sử dụng tính năng này.</h1>
                        :
                        <h1 className="text-white text-center">Hiện tại chưa có voucher đổi thưởng.</h1>
                    }
                    
                </div>
                
            }
        </div>
    </section>
}

export default ContentListVoucher