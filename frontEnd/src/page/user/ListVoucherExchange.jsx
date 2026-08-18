import {Header, ContentListVoucher, Footer} from "./components/index"
import ConfirmExchange from "./components/modal/ConfirmExchange.jsx"
import { useState, useEffect } from "react"
import { customeFetch, apiUserService } from "../config"

const  ListVoucherExchange = () => {
    const [voucherExchange, setVoucherExchange] = useState([])
    const [confirmExchange, setConfirmExchange] = useState(false)
    const [dataBeforeConfirm, setDataBeforeConfirm] = useState(null)
    useEffect(() => {
        const getDatas = async () => {
            try{
                const res = await customeFetch(apiUserService.baseURL+'/vouchers/user/exchange','authen','GET')
                if(res.ok){
                    const data = await res.json()
                    setVoucherExchange(data)
                }           
            }
            catch(err){
                console.log(err)
            }
        }
        getDatas()
    },[]) 

    return <>
        <Header/>
        <ContentListVoucher datas={voucherExchange} setDatas={setVoucherExchange} setConfirm={setConfirmExchange} setDataBeforeConfirm={setDataBeforeConfirm}/>
        <ConfirmExchange confirm={confirmExchange} setConfirm={setConfirmExchange} dataBeforeConfirm={dataBeforeConfirm} setDatas={setVoucherExchange}/>
        <Footer/>
    </>
}

export default ListVoucherExchange