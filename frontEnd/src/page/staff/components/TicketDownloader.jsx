import React, { useRef } from 'react'
import html2pdf from 'html2pdf.js'
import { branch, customeFetch, apiUserService } from '../../config'
import { formatVND2, calculatorPrice } from '../../validate'
import { Printer } from 'lucide-react'
import { toast } from 'sonner'


const TicketDownloader = ({ ticketData, chairChosen, nameTheater, setShowtimeChose, setChairChosen, userEarnPoint, setUserEarnPoint }) => {
  const ticketRef = useRef()

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${ticketData?.bookingId || "not-qr-code"}`

  const handleDownloadPDF = async () => {
    const element = ticketRef.current
    
    const options = {
      margin:       0,
      filename:     `ve-xem-phim-${ticketData?.movie?.title || "CINESTU"}.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { 
        scale: 2, // Tăng chất lượng ảnh khi chụp HTML để QR và chữ không bị vỡ
        useCORS: true 
      },
      jsPDF:        { 
        unit: 'in', 
        format: [3.15, 6.0], //rộng 3.15 inches (~80mm), dài 6 inches
        orientation: 'portrait' 
      }
    }
   
    await html2pdf().set(options).from(element).save()
    let dataForApi = {
      showtime_id: ticketData?.showtime?.id,
      price_at_booking: calculatorPrice(chairChosen, ticketData?.showtime?.price),
      role: 'staff',
      userEarnPoint: userEarnPoint || null
    }
    await handleUpdateToDB(dataForApi)
    setChairChosen([])
    setShowtimeChose(null)
    setUserEarnPoint(null)
  }

  const handleUpdateToDB = async (dataForApi) => {
    try{
      const res =  await customeFetch(apiUserService.baseURL+'/bookings/payment','authen','POST',JSON.stringify(dataForApi))
      if(res.ok)
        toast.success(`Đã bán vé ${chairChosen.length} phim ${ticketData?.movie?.title}`)
      else{
        const err = await res.json()
        toast.error(err.message)
      }
    }
    catch(err){
      console.log(err)
    }
  }

  return (
    <div className="w-full bg-primary-container text-on-primary font-bold rounded-xl shadow-lg shadow-primary-container/30 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all">
      <div style={{ display: 'none' }}> 
        <div 
          ref={ticketRef} 
          style={{
            width: '300px', 
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
            <h2 style={{ fontSize: '10px', textTransform: 'uppercase' }}>(Chi nhánh: Hồ Chí Minh)</h2>
          </div>

          {/* Thông tin phim */}
          <div style={{ padding: '12px 0', fontSize: '14px', lineHeight: '1.6' }}>
            <div><b>Phim:</b> {ticketData?.movie?.title}</div>
            <div><b>Suất chiếu:</b> {ticketData?.showtime?.start_time}</div>
            <div><b>Phòng chiếu:</b> {nameTheater}</div>
            <div><b>Ghế:</b> {chairChosen.map(item => item.seat_number).join(', ')}</div>
            <div><b>Tổng tiền:</b> {formatVND2(calculatorPrice(chairChosen, ticketData?.showtime?.price))}</div>
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

      <button 
          className={`px-2 py-4 flex items-center justify-center gap-2 ${chairChosen.length == 0 ? 'cursor-not-allowed' : ''}`}
          disabled={chairChosen.length == 0 ? true : false}
          onClick={handleDownloadPDF}>
          <span className="material-symbols-outlined">
            <Printer size={20} />
         </span>Tải Vé (PDF)
      </button>
    </div>
  )
}

export default TicketDownloader