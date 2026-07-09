import { formatVND2, formatDate } from "../../validate"

const getSeatNumbers = (arr) => {
    if(!arr) return ""
    return arr.map(item => item.seat_number).join(", ")
}

const formatInfoHistoryShowtime = (item) => {
    if(!item) return ""
    return `${item?.Showtime?.MovieTheater?.TypeTheater?.type_name} • ${item?.Showtime?.MovieTheater?.name} •Ghế: ${getSeatNumbers(item?.Tickets)} • Ngày giờ: ${item?.Showtime?.start_time}`
}

const History = ({historyTicket, setTicketData}) => {
    const dates = []
    const formatHistory = (date) => {
        let tmp = formatDate(date)
        if(dates.includes(tmp)) return 
        dates.push(tmp)
        return tmp
    }

    // kiểm tra xem vé đã đến giờ chiếu hay chưa
    // hiển thị: Sắp chiếu hoặc Đã chiếu
    // true: Đã chiếu
    const checkToday = (date) => {
        if(!date) return false
        let today = new Date()
        return (new Date(date) - today < 0) ? true : false
    }

    return <>
        <div className="space-y-4">
            <div className="space-y-3">
                {
                    historyTicket.map( item => <>
                        <div className="text-white">{formatHistory(item?.Showtime?.start_time)}</div>
                        <div
                            key={item?.id} 
                            className="flex items-center p-4 rounded-xl bg-zinc-900 border border-outline-variant/10 hover:border-primary/50 transition-all cursor-pointer">
                            <div className="w-16 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-zinc-800">
                                <img className="w-full h-full object-cover" src={item?.Showtime?.Movie?.poster_url == "" ? null : item?.Showtime?.Movie?.poster_url}/>
                            </div>

                            <div className="ml-6 flex-1">
                                <h4 className="font-label-bold text-white">{item?.Showtime?.Movie?.title}</h4>
                                <p className="text-[13px] text-white/70">{formatInfoHistoryShowtime(item)}</p>
                                <span 
                                    className={`mt-1 inline-block px-2 py-0.5 bg-green-900/30 rounded text-[11px] font-bold ${checkToday(item?.Showtime?.start_time) ? 'text-primary' : 'text-green-400'}`}>
                                        {checkToday(item?.Showtime?.start_time) ? 'ĐÃ CHIẾU' : 'SẮP CHIẾU'}
                                    </span>
                            </div>

                            <div className="text-right">
                                <p className="font-label-bold text-white">{formatVND2(item?.price_at_booking)}</p>
                                <button 
                                    onClick={() => setTicketData(item)}
                                    className="text-primary text-[14px] font-label-bold hover:underline">
                                        Chi tiết
                                    </button>
                            </div>
                        </div>
                    </>)
                }
            </div>
        </div>
    </>
}

export default History