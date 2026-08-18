import Aside from './components/Aside'
import ContentTheater from './components/ContentTheater'
import ConfirmBox from './components/modal/ConfirmBox'
import Header from './components/Header'
import Modal from './components/modal/Modal'
import { useState, useEffect } from 'react'
import { customeFetch, apiUserService } from '../config'


const ShowtimeManager = () => { 
    const [dataTypeTheater, setDataTypeTheater] = useState(null)
    const [dataItemBeforeConfirm, setDataItemBeforeConfirm] = useState(null)
    const [confirm, setConfirm] = useState(null)
    const [theaterOnBranch, setTheaterOnBranch] = useState([])

    useEffect( () => {
        const getTheaterOnBranch = async () => {
            try{
                const res = await customeFetch(apiUserService.baseURL+'/branches/theaters','authen','GET')
                if(res.ok){
                    const data = await res.json()
                    console.log(data)
                    setTheaterOnBranch(data)
                }
            }
            catch(err){
                console.log(err)
            }
        }
        getTheaterOnBranch()
    },[])

    let propsOfContentTheater = {
        datas: theaterOnBranch,
        theaterOnBranch,
        setDatas: setTheaterOnBranch,
        setDataItem: setDataTypeTheater,
        setDataItemBeforeConfirm,
        setConfirm
    }

    let propsOfConfirm = {
        confirm,
        dataItemBeforeConfirm,
        type: 'branches/theaters',
        setDatas: setTheaterOnBranch,
        setConfirm,
        setDataItemBeforeConfirm
    }
    
    return <div className="bg-background text-on-background min-h-screen flex">
        <Aside/>
        <main className="ml-64 flex-1 flex flex-col min-h-screen bg-surface-container-lowest">
            <Header/>
            <ContentTheater {...propsOfContentTheater}/>
        </main>
        <Modal styleModal="typeTheater" dataItem={dataTypeTheater} setDataItem={setDataTypeTheater} setDatas={setTheaterOnBranch}/>
        <ConfirmBox {...propsOfConfirm}/>
    </div>
}

export default ShowtimeManager