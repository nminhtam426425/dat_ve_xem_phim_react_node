import { useState, useRef, useEffect } from "react"
import {Header, ContentHistory, Footer} from "./components/index"
import ConfirmAvatar from "./components/modal/ConfirmAvatar"
import ShowTicket from "./components/modal/ShowTicket"
import { useLoading } from "../../LoadingContext"
import { customeFetch, apiUserService } from "../config"
import FormChangeChangePass from "./components/modal/FormChangePass"

const  HistoryUser = () => {
    const {userInfo, setUserInfo} = useLoading()
    const [showFormChangePass, setShowFormChangePass] = useState(null)
    const [ticketData, setTicketData] = useState(null)
    const [historyTicket, setHistoryTicket] = useState([])
    const [confirm, setConfirm] = useState(false)
    const [avatar, setAvatar] = useState({
        file: null,
        url: userInfo?.avatar || ""
    })
    const imageInput = useRef(null)

    const choseImgFormClient = () => {
        imageInput.current.click()
    }

    useEffect(() => {
        const getHistory = async () => {
            try{
                const res = await customeFetch(apiUserService.baseURL+'/bookings/history','authen','GET')
                if(res.ok){
                    const data = await res.json()
                    console.log(data.sort((a,b) => b.Showtime.start_time - a.Showtime.start_time))
                    setHistoryTicket(data.sort((a,b) => new Date(b.Showtime.start_time) - new Date(a.Showtime.start_time)))
                }
            }
            catch(err){
                console.log(err)
            }
        } 
        getHistory()
    },[])

    let propsOFContet = {
        userInfo,
        avatar,
        imageInput,
        setUserInfo,
        historyTicket,
        showFormChangePass,
        setAvatar,
        setConfirm,
        choseImgFormClient,
        setTicketData,
        setShowFormChangePass
    }

    let propsOfConfirm = {
        confirm,
        setConfirm,
        imageInput
    }
   
    return <>
        <Header/>
        <ContentHistory {...propsOFContet}/>
        <ConfirmAvatar {...propsOfConfirm}/>
        <ShowTicket ticketData={ticketData} setTicketData={setTicketData}/>
        <FormChangeChangePass dataItem={showFormChangePass} setDataItem={setShowFormChangePass}/>
        <Footer/>
    </>
}

export default HistoryUser