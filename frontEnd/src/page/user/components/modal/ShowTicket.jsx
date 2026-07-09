import { branch  } from "../../../config"
import { formatVND2 } from "../../../validate"

const ShowTicket = ({ticketData, setTicketData}) => {
    let qrUrl = ticketData ? `https://api.qrserver.com/v1/create-qr-code/?data=${ticketData?.id}&size=150x150` : null
    
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
                            {/* nếu rãnh tạo 1 api cho lấy tên chi nhánh dựa vào id_showtime */}
                            <h2 style={{ fontSize: '14px', textTransform: 'uppercase' }}>(Chi nhánh: Hồ Chí Minh)</h2>
                        </div>

                        {/* Thông tin phim */}
                        <div style={{ padding: '8px 0', fontSize: '16px', lineHeight: '1.6' }}>
                            <div><b>Phim:</b> {ticketData?.Showtime?.Movie?.title}</div>
                            <div><b>Suất chiếu:</b> {ticketData?.Showtime?.start_time}</div>
                            <div><b>Phòng chiếu:</b> {ticketData?.Showtime?.MovieTheater?.name}</div>
                            <div><b>Ghế:</b>{getSeatNumbers(ticketData?.Tickets)}</div>
                            <div><b>Tổng tiền:</b> {formatVND2(ticketData?.price_at_booking)}</div>
                        </div>

                        {/* Vùng QR Code */} 
                        <div style={{ borderTop: '2px dashed #000', paddingTop: '15px', marginTop: '10px' }}>
                            <img 
                                src={qrUrl} 
                                alt="Ticket QR Code" 
                                crossOrigin="anonymous" 
                                style={{
                                display:'block',
                                margin: '0 auto',
                                height: '130px',
                                width: '130px'
                                }}
                            />
                        </div>
                    </div>
            </div>
        </div>
    </>
}

export default ShowTicket