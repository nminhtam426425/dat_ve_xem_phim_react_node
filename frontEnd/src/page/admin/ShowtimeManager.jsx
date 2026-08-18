import Aside from './components/Aside'
import ContentShowtime from './components/ContentShowtime'
import Header from './components/Header'
import Modal from './components//modal/Modal'
import ConfirmBoxShowtime from './components/modal/ConfirmBoxForShowtime'
import ContentDetailTicket from './components/ContentDetailTicket'
import { useState, useEffect } from 'react'
import { customeFetch, apiUserService } from '../config'

const ShowtimeManager = () => { 
    const [dataShowtime, setDataShowtime] = useState(null)
    const [datas, setDatas] = useState([])
    const [onDateSelect, setOnDateSelect] = useState(new Date().toISOString().split('T')[0])
    // đánh dấu trong DateSelector
    const [onDateSelectFirst, setOnDateSelectFirst] = useState(new Date().toISOString().split('T')[0])
    const [confirm, setConfirm] = useState(false)
    const [dataItemBeforeConfirm, setDataItemBeforeConfirm] = useState(null)
    const [dataDetail, setDataDetail] = useState(null)
    // hiển thị chi tiết các vé đặt của suất chiếu
    const [showtime, setShowtime] = useState(null)

    useEffect(()=>{
        const getDatas = async () => {
            try{
                const res = await customeFetch(apiUserService.baseURL+`/showtimes/date/${onDateSelect}`,'authen','GET')
                if(res.ok){
                    let data = await res.json()
                    data = data.sort((a,b) => a.room_id - b.room_id)
                    setDatas(data)
                }
            }
            catch(err){
                console.log(err)
            }
        }
        getDatas()

    },[onDateSelect, setDatas])

    useEffect(()=>{
        const getDatas = async () => {
            try{
                const res = await customeFetch(apiUserService.baseURL+`/showtimes/seats/${showtime.id}`,'authen','GET')
                if(res.ok){
                    const data = await res.json()
                    setDataDetail(data)
                }
            }
            catch(err){
                console.log(err)
            }
        }
        if(showtime == null) return
        getDatas()

    },[showtime])

    let propsOfContent = {
        datas,
        onDateSelect,
        onDateSelectFirst,
        setOnDateSelect,
        setOnDateSelectFirst,
        setDatas,
        setDataItem: setDataShowtime,
        setConfirm,
        setDataItemBeforeConfirm,
        setShowtime
    }

    let propsOfConfirmBox = {
        confirm, 
        setConfirm, 
        dataItemBeforeConfirm, 
        setDataItemBeforeConfirm, 
        setDatas, 
        type:'showtimes'
    }

    return <div className="bg-background text-on-background min-h-screen flex">
        <Aside/>
        <main className="ml-64 flex-1 flex flex-col min-h-screen bg-surface-container-lowest">
            <Header/>
            {
                showtime == null
                ?
                <ContentShowtime {...propsOfContent} />
                :
                <ContentDetailTicket listChair={dataDetail} showtime={showtime} setShowtime={setShowtime}/>
            }
            
        </main>
        <Modal styleModal="showtime" dataItem={dataShowtime} setDataItem={setDataShowtime} setDatas={setDatas} onDateSelect={onDateSelect}/> 
        <ConfirmBoxShowtime {...propsOfConfirmBox}/>
    </div>
}

export default ShowtimeManager