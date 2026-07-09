import { useEffect, useState } from "react"
import {Header, Footer, ContetnAboutUs } from "./components/index"
import { customeFetch, apiUserService } from "../config"

const AboutUs = () =>{
    const [datas, setDatas] = useState(null)

    useEffect(()=>{
        const getDatas = async () => {
            try{
                const res = await customeFetch(apiUserService.baseURL+'/branches','non-authen','GET')
                if(res.ok){
                    const data = await res.json()
                    setDatas(data[0])
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
        <ContetnAboutUs datas={datas}/>
        <Footer/>
    </>
}

export default AboutUs