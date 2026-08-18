import { useEffect, useState } from "react"
import { customeFetch, apiUserService } from "../../config"

// setConfirm -> dùng để tạo thanh thông báo
const TimerAlram = ({showtime, chairChosen, setChairChosen, socketId, setMsg, setConfirm, setUseVoucher}) => {
    const initialMinutes = showtime?.limited_number_of_minutes || 5
    const [totalSeconds, setTotalSeconds] = useState(initialMinutes*60)
    useEffect(() => {
        if (!chairChosen  ) return 

        if (chairChosen.length == 0 ) {
            setTotalSeconds(showtime?.limited_number_of_minutes*60)
            setUseVoucher([])
            return
        }

        if (totalSeconds <= 0) {
            console.log("BÙM")
            return
        }

        const timer = setInterval(() => {
            setTotalSeconds(prev => prev - 1)
        }, 1000)

        return () => clearInterval(timer)
    }, [chairChosen])

    useEffect(()=>{
        if(totalSeconds != 0) return
        const deleteTicket = async () => {
            try{
                let dataForApi = {
                    showtime_id: showtime?.id,
                    seats_id: chairChosen.map(item => item.seat_number),
                    socket_id: socketId
                }
                const res = await customeFetch(
                    apiUserService.baseURL+'/bookings/delete-my-ticket',
                    'authen',
                    'POST',
                    JSON.stringify(dataForApi)
                )
                if(res.ok){
                    setChairChosen([])
                    setTotalSeconds(showtime?.limited_number_of_minutes*60)
                    setMsg('Vé của bạn đã hết thời gian giữ chỗ !')
                    setConfirm(true)
                }
            }
            catch(err){
                console.log(err)
            }
        }
        deleteTicket()
    },[totalSeconds])

    const minute = Math.floor(totalSeconds / 60);
    const second = totalSeconds % 60;

    const formatSecond = (sec) => {
        return sec < 10 ? `0${sec}` : sec;
    }

    return (
        <span className="text-white font-bold">
            {minute < 10 ? `0${minute}` : minute}:{formatSecond(second)}
        </span>
    );
}

export default TimerAlram