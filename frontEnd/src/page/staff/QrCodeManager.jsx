import Aside from './components/Aside'
import ContentQrCode from './components/ContentQrCode'
import Header from './components/Header'
import Modal from '../admin/components/modal/Modal'
import AsideMobile from './components/AsideMobile'
import { useEffect, useState } from 'react'
import { customeFetch, apiUserService } from '../config'

const Ticket = () => {
    const [dataMovie, setDataMovie] = useState(null)
    const [resultScan, setResultScan] = useState("")
    const [showAside, setShowAside] = useState(false)

    useEffect(()=>{
        if(resultScan == "") return 

        const checkTicket = async() => {
            try{
                const res = await customeFetch(apiUserService.baseURL+`/bookings/check/${resultScan}`,'authen','GET')
                if(res.ok){
                    const data = await res.json()
                    setDataMovie(data)
                }
            }
            catch(err){
                console.log(err)
            }
        }
        checkTicket()
    },[resultScan])

    return <div className="bg-background text-on-background min-h-screen flex">
        <Aside/>
        <AsideMobile setShowAside={setShowAside} showAside={showAside}/>
        <main className="flex-1 md:ml-64 min-h-screen relative flex flex-col bg-surface-container-lowest">
            <Header setShowAside={setShowAside}/>
            <ContentQrCode setResultScan={setResultScan}/>
        </main>
        <Modal styleModal="checkTicket" dataItem={dataMovie} setDataItem={setDataMovie}/>
    </div>
}

export default Ticket