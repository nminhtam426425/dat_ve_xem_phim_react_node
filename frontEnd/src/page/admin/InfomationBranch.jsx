import { useEffect, useState } from "react"
import { customeFetch, apiUserService } from "../config"
import Header from "./components/Header"
import Aside from "./components/Aside"
import ContetnAboutUs from "./components/ContentAboutUs"
import Modal from "./components/modal/Modal"

const AboutUs = () =>{
    const [datas, setDatas] = useState([])
    const [showForm, setShowForm] = useState(null)

    useEffect(()=>{
        const getDatas = async () => {
            try{
                const res = await customeFetch(apiUserService.baseURL+'/branches','non-authen','GET')
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

    return <div className="bg-background text-on-background min-h-screen flex">
        <Aside/>
        <main className="ml-64 flex-1 flex flex-col min-h-screen bg-surface-container-lowest">
            <Header/>
            <ContetnAboutUs datas={datas} setDataItem={setShowForm}/>
        </main>
        <Modal styleModal="updateInfoBranch" dataItem={showForm} setDatas={setDatas} setDataItem={setShowForm}/>
    </div>
}

export default AboutUs