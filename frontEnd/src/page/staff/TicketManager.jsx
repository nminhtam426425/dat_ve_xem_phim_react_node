import Aside from './components/Aside'
import ContentTicket from './components/ContentTicket'
import Header from './components/Header'
import AsideMobile from './components/AsideMobile'
import EarnPoint from './components/modal/EarnPoint'
import { useEffect, useState } from 'react'
import { customeFetch,apiUserService } from '../config'

const TicketManager = () => {
    const [datas, setDatas] = useState([])
    const [categories, setCategories] = useState([])
    const [userEarnPoint, setUserEarnPoint] = useState(null)
    const [earnPoint, setEarnPoint] = useState(false)
    const [showAside, setShowAside] = useState(false)

    useEffect(()=>{
        const getDatas = async () => {
            try {
                const [res1, res2] = await Promise.all([
                    customeFetch(`${apiUserService.baseURL}/showtimes/staff`, 'authen', 'GET'),
                    customeFetch(`${apiUserService.baseURL}/categories/all`, 'non-authen', 'GET')
                ])
        
                if (res1.ok && res2.ok) {
                    const [data1, data2] = await Promise.all([res1.json(), res2.json()])
        
                    for(let i of data1){
                        if (i.Showtimes) 
                            i.Showtimes.sort((a, b) => new Date(a.start_time) - new Date(b.start_time))
                    }
                    
                    setDatas(data1)
                    setCategories(data2)
                }
            } catch (err) {
                console.error("Lỗi khi fetch data:", err)
            }
        }
        getDatas()
    },[])

    let propsOfContent = {
        datas,
        categories,
        earnPoint,
        userEarnPoint,
        setDatas,
        setEarnPoint,
        setUserEarnPoint
    }

    return <div className="bg-background text-on-background min-h-screen flex">
        <Aside/>
        <AsideMobile setShowAside={setShowAside} showAside={showAside}/>
        <main className="md:ml-64 flex-1 flex flex-col min-h-screen bg-surface-container-lowest">
            <Header setShowAside={setShowAside}/>
            <ContentTicket {...propsOfContent}/>
        </main>
        <EarnPoint confirm={earnPoint} setConfirm={setEarnPoint} setUserEarnPoint={setUserEarnPoint}/>
    </div>
}

export default TicketManager