import Aside from './components/Aside'
import Header from './components/Header'
import ContentVoucher from './components/ContentVoucher'
import Modal from './components/modal/Modal'
import ConfirmBox from './components/modal/ConfirmBox'
import { useEffect, useState } from 'react'
import { customeFetch, apiUserService } from '../config'

const VoucherManager = () => {
    const [voucher, setVoucher] = useState(null)
    const [datas, setDatas] = useState([])
    const [dataItemBeforeConfirm, setDataItemBeforeConfirm] = useState(null)
    const [confirm, setConfirm] = useState(null)

    useEffect(()=>{
        const getDatas = async () => {
            try{
                const res = await customeFetch(apiUserService.baseURL+'/vouchers/all','authen','GET')
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
        setDatas,
        setDataItem: setVoucher,
        setConfirm,
        setDataItemBeforeConfirm
    }

    let propsOfConfirm = {
        confirm,
        dataItemBeforeConfirm,
        type: 'vouchers',
        setDatas,
        setConfirm,
        setDataItemBeforeConfirm
    }

    return <div className="bg-background text-on-background min-h-screen flex">
        <Aside/>
        <main className="ml-64 flex-1 flex flex-col min-h-screen bg-surface-container-lowest">
            <Header/>
            <ContentVoucher {...propsOfContent}/>
        </main>
        <Modal styleModal="voucher" dataItem={voucher} setDataItem={setVoucher} setDatas={setDatas}/>
        <ConfirmBox {...propsOfConfirm}/>
    </div>
}

export default VoucherManager