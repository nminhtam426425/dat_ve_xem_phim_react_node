import Aside from './components/Aside'
import ContentAccountManager from './components/ContentAccountManager'
import Header from './components/Header'
import Modal from './components//modal/Modal'
import ConfirmLockAccount from './components/modal/ConfirmLockAccount'
import { useEffect, useState } from 'react'
import { apiUserService, customeFetch } from '../config'

const MovieManager = () => {
    const [dataAccountNew, setDataAccountNew] = useState(null)
    const [datas, setDatas] = useState([])
    const itemsPerPage = 5 
    const [currentPage, setCurrentPage] = useState(1)
    const [typeLockOrUnlock, setTypeLockOrUnlock] = useState('')
    const [dataItemBeforeConfirm,setDataItemBeforeConfirm] = useState(null)
    

    useEffect(()=>{
        const getDatas = async () => {
            try{
                const res = await customeFetch(apiUserService.baseURL+'/users/all','authen','GET')
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
    },[])

    let propsOfContent = {
        datas,
        dataAccountNew,
        itemsPerPage,
        currentPage,
        setCurrentPage,
        setDataItem: setDataAccountNew,
        setDatas,
        setConfirm: setTypeLockOrUnlock,
        setDataItemBeforeConfirm

    }

    let propsOfConfirmLock = {
        confirm: typeLockOrUnlock,
        setConfirm: setTypeLockOrUnlock,
        setDatas,
        type: typeLockOrUnlock,
        dataItemBeforeConfirm,
        setDataItemBeforeConfirm
    }

    return <div className="bg-background text-on-background min-h-screen flex">
        <Aside/>
        <main className="ml-64 flex-1 flex flex-col min-h-screen bg-surface-container-lowest">
            <Header/>
            <ContentAccountManager {...propsOfContent}/>
        </main>
        <Modal styleModal="addStaff" dataItem={dataAccountNew} setDataItem={setDataAccountNew} setDatas={setDatas}/>
        <ConfirmLockAccount {...propsOfConfirmLock}/>
    </div>
}

export default MovieManager