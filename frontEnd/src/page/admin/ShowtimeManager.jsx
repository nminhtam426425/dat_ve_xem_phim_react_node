import Aside from './components/Aside'
import ContentShowtime from './components/ContentShowtime'
import Header from './components/Header'
import Modal from './components//modal/Modal'
import ConfirmBoxShowtime from './components/modal/ConfirmBoxForShowtime'
import { useState, useEffect } from 'react'
import { customeFetch, apiUserService } from '../config'

const ShowtimeManager = () => { 
    const [dataShowtime, setDataShowtime] = useState(null)
    const [datas, setDatas] = useState([])
    const [onDateSelect, setOnDateSelect] = useState(new Date().toISOString().split('T')[0])
    const [confirm, setConfirm] = useState(false)
    const [dataItemBeforeConfirm, setDataItemBeforeConfirm] = useState(null)

    useEffect(()=>{
        const getDatas = async () => {
            try{
                const res = await customeFetch(apiUserService.baseURL+`/showtimes/date/${onDateSelect}`,'authen','GET')
                if(res.ok){
                    const data = await res.json()
                    setDatas(data)
                }
            }
            catch(err){
                console.log(err)
            }
        }
        getDatas()

    },[onDateSelect, setDatas])

    let propsOfContent = {
        datas,
        onDateSelect,
        setOnDateSelect,
        setDatas,
        setDataItem: setDataShowtime,
        setConfirm,
        setDataItemBeforeConfirm
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
            <ContentShowtime {...propsOfContent} />
        </main>
        <Modal styleModal="showtime" dataItem={dataShowtime} setDataItem={setDataShowtime} setDatas={setDatas} onDateSelect={onDateSelect}/> 
        <ConfirmBoxShowtime {...propsOfConfirmBox}/>
    </div>
}

export default ShowtimeManager