import {Header, ContentListVoucher, Footer} from "./components/index"
import { useState, useEffect } from "react"
import { customeFetch, apiUserService } from "../config"

const  ListVoucherExchange = () => {
    const [voucherExchange, setVoucherExchange] = useState([])
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
        <ContentListVoucher datas={voucherExchange} setDatas={setVoucherExchange}/>
        <Footer/>
    </>
}

export default ListVoucherExchange