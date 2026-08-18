import { useEffect, useState, useRef } from "react"
import { formatDate2 } from "../../../validate"
import { customeFetch, apiUserService, getAccessToken } from "../../../config"
import { toast } from "sonner"



const Voucher = ({showVoucher, setShowVoucher, priceBooking, priceAfterDiscount, setPriceBooking, useVoucher, setUseVoucher}) => {
    const [vouchers, setVouchers] = useState([])
    // dùng để sử dụng voucher cá nhân (cho phép sử dụng tối đa 2 voucher - 1 của hệ thống 1 - của ngươi tích điểm
    const [myVoucher, setMyVoucher] = useState([])
    const [showMyVoucher, setShowMyVoucher] = useState(false)
    const containerRef = useRef(null)

    useEffect(()=>{
        const getDatas = async () => {
            try{
                const [res,res2] = await Promise.all(
                    [
                        customeFetch(apiUserService.baseURL+'/vouchers/user','authen','GET'),
                        customeFetch(apiUserService.baseURL+'/vouchers/private','authen','GET')
                    ]
                )
                
                if(res.ok){
                    let data = await res.json()
                    data = data.map(item => {
                        item.type = 'public'
                        return item
                    })
                    setVouchers(data)
                }
                if(res2.ok){
                    let data = await res2.json()
                    data = data.map(item => {
                        item.type = 'private'
                        return item
                    })
                    setMyVoucher(data.filter(item => item.Users[0].VoucherOfUser.is_use == false))
                }
            }
            catch(err){
                console.log(err)
            }
        }
        getDatas()
    },[])

    // tính giá trị giảm giá của voucher sử dụng
    const getValueDiscount = (voucher) => {
        if(!voucher) return 
        let valueDiscount = 0
        if(voucher.discount_type == 'fixed_amount')
            valueDiscount = voucher.discount
        else{
            valueDiscount = Math.floor((priceBooking*voucher.discount)/100)
            if(voucher.max_discount_value != 0)
                valueDiscount = (valueDiscount > voucher.max_discount_value) ? voucher.max_discount_value : valueDiscount
            
        }
        return valueDiscount
    }

    // kiểm tra xem đã có loại này trong mảng voucher đang chọn hay chưa
    // VD: ['private'] => thêm mới private => private != private --> false --> xóa đi
    // VD: ['private'] => thêm mới public => private != public --> true --> giữ lại
    const checkUse = (arr, newItem) => {
        if (!arr || !newItem) return []
        if (arr.length === 0) return [newItem]
        return [...arr.filter(v => v.type != newItem.type) , newItem]
    }

    // tính tông giá trị giảm giá của các voucher đã chọn
    const calTotalPrice = (arrVoucher) => {
        if(!arrVoucher) return 0
        let totalDiscount = 0
        for(let i of arrVoucher)
            totalDiscount += getValueDiscount(i)
        
        return totalDiscount
    }

    const handleUseVoucher = (voucher) => {
        if(priceBooking < voucher.min_order_value){
            toast.error(`Đơn hàng chưa đạt giá trị tối thiểu ${voucher.min_order_value/1000}K để sử dụng voucher này !`)
            return
        }
        let newArr = checkUse(useVoucher, voucher)
        let discount = calTotalPrice(newArr)
        let tempDiscount = priceBooking - discount < 0 ? 0 : priceBooking - discount

        setUseVoucher(newArr)
        setPriceBooking(tempDiscount)
        setShowVoucher(false)
        containerRef.current.scrollTop = 0
    }

    const cancelVoucher = (voucher) => {
        let discount = getValueDiscount(voucher)
        setUseVoucher(pre => [...pre.filter(item => item.id != voucher.id)])
        setPriceBooking(priceAfterDiscount + discount)
        setShowVoucher(false)
        containerRef.current.scrollTop = 0
    }

    return <div className="modal" style={{display: showVoucher ? 'flex' : 'none'}}>
        <div className="modal-content modal-content-h-90 overflow-x-scroll bg-gray-200 rounded-2xl shadow-xl">
            <span className="close absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-[32px] cursor-pointer transition-colors duration-200 leading-none" style={{right: '0%'}} onClick={()=>setShowVoucher(false)}>&times;</span>

            <div className="flex gap-2 justify-between mb-2">
                <button 
                    className={`flex-1 py-3 text-center font-medium text-sm rounded-lg transition-all duration-200
                        ${!showMyVoucher 
                            ? "bg-white text-primary shadow-sm font-semibold" 
                            : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                        }`}
                    onClick={()=>setShowMyVoucher(false)}
                    >Có thẻ sử dụng
                </button>
                <button 
                   className={`flex-1 py-3 text-center font-medium text-sm rounded-lg transition-all duration-200
                    ${showMyVoucher 
                        ? "bg-white text-primary shadow-sm font-semibold" 
                        : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                    }`}
                    onClick={()=>setShowMyVoucher(true)}
                    >Voucher của tôi
                </button>
            </div>

            {
                showMyVoucher
                ?
                    <RenderListVoucher 
                    type="private" 
                    data={myVoucher} 
                    handleUseVoucher={handleUseVoucher} 
                    priceBooking={priceBooking} 
                    useVoucher={useVoucher}
                    cancelVoucher={cancelVoucher}
                    containerRef={containerRef}/>
                :
                    <RenderListVoucher 
                    type="public" 
                    data={vouchers}  
                    handleUseVoucher={handleUseVoucher} 
                    priceBooking={priceBooking} 
                    useVoucher={useVoucher}
                    cancelVoucher={cancelVoucher}
                    containerRef={containerRef}/>
            }
        </div>
    </div>
}

const RenderListVoucher = ({data, handleUseVoucher, priceBooking, useVoucher, cancelVoucher, containerRef}) => {
    const handleOnCanUse = (price, voucher) => {
        return true
        // if(!price || !voucher) return false
        // if(price >= voucher.min_order_value)
        //     return true
        // return false
    }
    
    return <>
        <div className="flex flex-col gap-4 w-[300px] md:w-[700px]">
            {
                data.length > 0
                ?
                data?.map( item => <>
                    <div 
                        ref={containerRef}
                        key={item.code}
                        className={`group bg-zinc-900 border border-zinc-800/50 rounded-xl overflow-hidden shadow-2xl transition-transform active:scale-95 duration-200
                            ${handleOnCanUse(priceBooking,item) ? '' : 'opacity-70'}`}
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

                            {item.max_discount_value&&<p className="text-white font-bold mb-4 line-clamp-4">Giảm tối đa: {`${item.max_discount_value/1000}K`}.</p>}

                            <div className="flex items-center justify-between">
                                {
                                    item.type == 'public'
                                    ?
                                    <div className="flex flex-col">
                                        <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest">Hết hạn</span>
                                        <span className="text-sm font-semibold text-zinc-300">{formatDate2(item.expiry_date)}</span>
                                    </div>
                                    :
                                    <div className="flex flex-col"></div>
                                }
                                
                                <div className="flex gap-2">
                                    {
                                        useVoucher.some(usedVoucher => usedVoucher.id == item.id)
                                        &&
                                        <button
                                            onClick={()=>cancelVoucher(item)} 
                                            className={`bg-white text-primary font-bold py-2 px-6 rounded-lg text-sm transition-colors shadow-lg shadow-red-900/20
                                            `}
                                            >
                                            Hủy chọn
                                        </button> 
                                    }
                                    
                                    <button
                                        onClick={()=>handleUseVoucher(item)} 
                                        disabled={!handleOnCanUse(priceBooking,item)}
                                        className={`bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg text-sm transition-colors shadow-lg shadow-red-900/20
                                        ${handleOnCanUse(priceBooking,item) ? '' : 'cursor-not-allowed'}`}>
                                        Dùng ngay
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>)
                : 
                !getAccessToken()
                ?
                <h1>Vui lòng đăng ký tài khoản để có thể sử dụng.</h1>
                :
                <h1>Hiện tại chưa có voucher phù hợp.</h1>
            }
        </div>
    </>
}

export default Voucher