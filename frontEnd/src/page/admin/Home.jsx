import Aside from './components/Aside'
import Header from './components/Header'
import ContentAdminBranch from './components/ContentAdminBranch'
import { useEffect, useState } from 'react'
import { apiUserService, customeFetch } from '../config'
import { formatDate2,formatDateHour } from '../validate'

const Home = () => {
    const [dayMark, setDayMark] = useState(new Date())
    // dữ liệu gửi backend
    const [typeMark, setTypeMark] = useState('weeks')
    const [weekMark ,setWeekMark] = useState(null)
    const [datas, setDatas] = useState(null)
    const [percentUpRevenue, setPercentUpRevenue] = useState(0)

    useEffect(()=>{
        const getDatas = async () => {
            if(!weekMark) return 
            try{
                let dataForApi = {
                    startMark: formatDate2(weekMark.start),
                    endMark: formatDateHour(weekMark.end)
                }
                const res = await customeFetch(apiUserService.baseURL+'/bookings/revenue-weeks','authen','POST',JSON.stringify(dataForApi))
                if(res.ok){
                    const data = await res.json()
                    let totalWeek = data.dataRevenue.reduce((pre, cur)=>pre+=cur,0)
                    let percent = data.totalRevueWeekbefore == 0 ? 100 : ((totalWeek - data.totalRevueWeekbefore)/data.totalRevueWeekbefore)*100
                    setPercentUpRevenue(percent.toFixed(0))
                    setDatas(data)
                }
            }
            catch(err){
                console.log(err)
            }
        }
        getDatas()
    },[weekMark])

    let propsOfContent = {
        dayMark,
        setDayMark,
        datas,
        typeMark,
        setTypeMark,
        weekMark,
        setWeekMark,
        percentUpRevenue
    }

    return <div className="bg-background text-on-background min-h-screen flex">
        <Aside/>
        <main className="ml-64 flex-1 flex flex-col min-h-screen bg-surface-container-lowest">
            <Header/>
            <ContentAdminBranch {...propsOfContent}/>
        </main>
    </div>
}

export default Home