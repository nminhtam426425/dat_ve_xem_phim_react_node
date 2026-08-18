import { useEffect, useState } from "react"
import { branch  } from "../../../config"
import { formatVND2 } from "../../../validate"

const ShowTicket = ({ticketData, setTicketData}) => {
    let qrUrl = ticketData ? `https://api.qrserver.com/v1/create-qr-code/?data=${ticketData?.id}&size=150x150` : null
    const [isQrLoading, setIsQrLoading] = useState(false)
   
    useEffect(() => {
        if (qrUrl) {
            setIsQrLoading(true)
        }
    }, [qrUrl])
    
    const getSeatNumbers = (arr) => {
        if(!arr) return ""
        return arr.map(item => item.seat_number).join(", ")
    }

    return <>
         <div className="modal" style={{display: ticketData ? 'flex' : 'none'}}>
            <div className="modal-content w-[300px] md:w-[500px] p-8">
                <span className="close" onClick={()=>setTicketData(null)}>&times;</span>
                    <div 
                        style={{
                            backgroundColor: '#fff',
                            color: '#000',
                            fontFamily: 'Arial, sans-serif',
                            margin: '0 auto',
                            padding: '0 10px'
                        }}
                    >
                        {/* Header Vé */}
                        <div style={{borderBottom: '2px dashed #000', textAlign:'center', paddingBottom: 10 }}>
                            <h2 style={{ fontSize: '18px', textTransform: 'uppercase' }}>{branch}</h2>
                        </div>

                        {/* Thông tin phim */}
                        <div style={{ padding: '8px 0', fontSize: '16px', lineHeight: '1.6' }}>
                            <div><b>Phim:</b> {ticketData?.Showtime?.Movie?.title}</div>
                            <div><b>Suất chiếu:</b> <span className="bg-primary rounded text-white p-2">{ticketData?.Showtime?.start_time}</span></div>
                            <div><b>Phòng chiếu:</b> {ticketData?.Showtime?.MovieTheater?.name}</div>
                            <div><b>Ghế:</b><span className="bg-primary rounded text-white p-2">{getSeatNumbers(ticketData?.Tickets)}</span></div>
                            <div><b>Tổng tiền:</b> {formatVND2(ticketData?.price_at_booking)}</div>
                        </div>

                        {/* Vùng QR Code */} 
                        {qrUrl ? (
                            <div style={{ borderTop: '2px dashed #000', paddingTop: '15px', marginTop: '10px' }}>
                                {isQrLoading && (
                                <div style={{ textAlign: 'center', padding: '20px 0', color: '#666' }}>
                                    Vui lòng chờ...
                                </div>
                                )}
                                <img 
                                    src={qrUrl} 
                                    alt="Ticket QR Code" 
                                    crossOrigin="anonymous" 
                                    loading="lazy"
                                    onLoad={() => setIsQrLoading(false)} 
                                    onError={() => setIsQrLoading(false)} // Ngừa trường hợp lỗi API để không bị kẹt spinner
                                    style={{
                                        display: isQrLoading ? 'none' : 'block',
                                        margin: '0 auto',
                                        height: '130px',
                                        width: '130px'
                                    }}
                                />
                            </div>
                            ) : (
                                <div>Không có mã QR</div>
                            )}
                    </div>
            </div>
        </div>
    </>
}

export default ShowTicket