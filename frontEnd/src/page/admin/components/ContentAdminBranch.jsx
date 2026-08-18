import {TrendingUp, DollarSign,Ticket, User2, ChevronLeft, ChevronRight, TrendingDown} from "lucide-react"
import ChartAdminBranch from "./ChartAdminBranch"
import { getDaysRange, compareDates, formatDate, formatVND2 } from "../../validate"
import { useEffect, useState } from "react"

const getCss = (index) => {
    if(index == 0) 
        return "bg-primary"
    else if(index == 1)
        return "bg-tertiary"
    else return "bg-outline"
}

const ContentAdminBranch = ({datas, dayMark, setDayMark, typeMark, setTypeMark, weekMark, setWeekMark, percentUpRevenue}) => {
    
    const [valuesRevenue, setDataRevenue] = useState([])
    const [movieRevenue, setMovieRevenue] = useState([])

    useEffect(()=>{
        if(!dayMark) return 
        setWeekMark(getDaysRange(dayMark))
    },[dayMark])

    useEffect(()=>{
        if(!datas) return 
        setDataRevenue(datas.dataRevenue)
        let arrMovie = datas.movies.sort((a,b) => parseInt(b.total_revenue) - parseInt(a.total_revenue))
        arrMovie = arrMovie.slice(0,5)
        setMovieRevenue(arrMovie.filter(item => item.total_revenue !=0))
    },[datas])

    const backWeek = () => {
        setDayMark(pre => {
            let newDate = new Date(pre)
            let distance = typeMark == 'weeks' ? 7 : 30
            newDate.setDate(newDate.getDate() - distance)
            return newDate
        })
    }

    const nextWeek = () => {
        setDayMark(pre => {
            let newDate = new Date(pre)
            let distance = typeMark == 'weeks' ? 7 : 30
            newDate.setDate(newDate.getDate() + distance)
            return newDate
        })
    }

    const onChangeWeekToMonth = (type) => {
        setDayMark(new Date())
        setTypeMark(type)
    }

    const countByCondition = (array, key, value) => {
        if(!array) return ""
        return array.filter( item => item[key] == value).length
    }
    
    
    const countByDateCondition = (array, value) => {
        if(!array) return ""
        return array.filter( item => {
            let created = new Date(item.created_at)
            return created.getMonth() <= value
        }).length
    }

    const countMonthNow = (array) => {
        if(!array) return ""
        let monthNow = new Date()
        return array.length - countByDateCondition(array, monthNow.getMonth() - 1)
    }

    return <>
         <div className="p-8 space-y-8 max-w-container-max mx-auto w-full">
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/20 shadow-sm hover:shadow-md transition-shadow group">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-primary-container/10 rounded-lg text-primary-container group-hover:bg-primary-container group-hover:text-white transition-all">
                            <span className="material-symbols-outlined" data-icon="payments">
                                <DollarSign size={20}/>
                            </span>
                        </div>
                        
                        <span className={`flex items-center text-xs font-bold  px-2 py-1 rounded-full ${percentUpRevenue > 0 ? 'text-green-600 bg-green-50' : 'text-primary bg-primary/20'}`}>
                            <span className="material-symbols-outlined text-xs mr-1" data-icon="trending_up">
                                {percentUpRevenue > 0 ? <TrendingUp size={20}/> : <TrendingDown size={20}/>}
                            </span>{percentUpRevenue > 0 ? `+${percentUpRevenue}` : `${percentUpRevenue}`}%
                        </span>
                    </div>

                    <p className="text-secondary font-label-bold text-sm mb-1 uppercase tracking-wider">Doanh thu {typeMark == 'weeks' ? 'tuần' : 'tháng'}</p>
                    <h3 className="font-headline-md text-headline-md text-on-surface">{formatVND2(valuesRevenue.reduce((pre, cur) => pre += parseInt(cur),0))}</h3>
                </div>

                <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/20 shadow-sm hover:shadow-md transition-shadow group">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-primary-container/10 rounded-lg text-primary-container group-hover:bg-primary-container group-hover:text-white transition-all">
                            <span className="material-symbols-outlined" data-icon="payments">
                                <DollarSign size={20}/>
                            </span>
                        </div>
                    </div>

                    <p className="text-secondary font-label-bold text-sm mb-1 uppercase tracking-wider">Tổng doanh thu</p>
                    <h3 className="font-headline-md text-headline-md text-on-surface">{formatVND2(datas?.tickets?.reduce((pre, cur) => pre += parseInt(cur.price_at_booking),0))}</h3>
                </div>

                <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/20 shadow-sm hover:shadow-md transition-shadow group">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-secondary-container rounded-lg text-on-secondary-container group-hover:bg-on-secondary-container group-hover:text-white transition-all">
                            <span className="material-symbols-outlined" data-icon="confirmation_number">
                                <Ticket size={20}/>
                            </span>
                        </div>

                        {/* <span className="flex items-center text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                            <span className="material-symbols-outlined text-xs mr-1" data-icon="trending_up">
                                <TrendingUp size={20}/>
                            </span>+8.2%
                        </span> */}
                    </div>
                    <p className="text-secondary font-label-bold text-sm mb-1 uppercase tracking-wider">Số vé đã bán</p>
                    <h3 className="font-headline-md text-headline-md text-on-surface">{datas?.tickets?.length || 0}</h3>
                </div>

                {/* <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/20 shadow-sm hover:shadow-md transition-shadow group">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-tertiary-fixed rounded-lg text-on-tertiary-fixed group-hover:bg-on-tertiary-fixed group-hover:text-white transition-all">
                            <span className="material-symbols-outlined" data-icon="group">
                                <User2 size={20}/>
                            </span>
                        </div>
                        <span className="flex items-center text-xs font-bold text-green-400 bg-green-50 px-2 py-1 rounded-full">
                            <span className="material-symbols-outlined text-xs mr-1" data-icon="trending_up">
                                <TrendingUp size={20}/>
                            </span>+{Math.floor((countMonthNow(datas?.users?.filter(item => item.role == 'user'))/datas?.users?.length)*100)}%
                        </span>
                    </div>

                    <p className="text-secondary font-label-bold text-sm mb-1 uppercase tracking-wider">Khách hàng</p>
                    <h3 className="font-headline-md text-headline-md text-on-surface">{countByCondition(datas?.users, 'role', 'user')}</h3>
                </div> */}
            </section>

            <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant/20 shadow-sm">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h3 className="font-headline-md text-lg font-bold text-on-surface">Xu hướng doanh thu tuần</h3>
                            <p className="text-sm text-secondary">Từ ngày: {formatDate(weekMark?.start)} - {formatDate(weekMark?.end)}</p>
                        </div>
                        <div className="flex items-center gap-2">                           
                            <button
                                onClick={backWeek} 
                                className="bg-white text-xs font-bold py-1 px-1 rounded-lg">
                                <ChevronLeft size={18}/>
                            </button>
                            <button 
                                onClick={()=>onChangeWeekToMonth('weeks')}
                                className={`text-xs font-bold py-1.5 px-3 rounded-lg shadow-sm ${typeMark == 'weeks' ? 'bg-primary text-white ' : 'bg-surface-container text-secondary hover:bg-outline-variant/20 transition-all'}`}>
                                    Tuần
                            </button>
                            {/* <button 
                                 onClick={()=>onChangeWeekToMonth('months')}
                                className={`text-xs font-bold py-1.5 px-3 rounded-lg shadow-sm ${typeMark == 'months' ? 'bg-primary text-white ' : 'bg-surface-container text-secondary hover:bg-outline-variant/20 transition-all'}`}>
                                    Tháng
                            </button> */}
                            <button 
                                disabled={compareDates(dayMark)}
                                onClick={nextWeek} 
                                className={`bg-white text-xs font-bold py-1 px-1 rounded-lg ${compareDates(dayMark)? 'cursor-not-allowed' : ''}`}>
                                <ChevronRight size={18}/>
                            </button>
                        </div>
                    </div>

                    <ChartAdminBranch valuesRevenue={valuesRevenue} typeMark={typeMark}/>
                </div>

                <div className="bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant/20 shadow-sm">
                    <div className="flex flex-between">
                        <h3 className="font-headline-md text-lg font-bold text-on-surface mb-6">Phim doanh thu cao nhất</h3>
                        {/* <h3 className="ml-4 text-primary hover:underline cursor-pointer">Xem tất cả</h3> */}
                    </div>
                   
                    
                    <div className="space-y-6">
                        {
                            movieRevenue.map( (item, index) => {
                                let max = parseInt(movieRevenue[0].total_revenue)
                                let itemPercent = Math.ceil((parseInt(item.total_revenue) / max)*100)
                                let styleWidth = {
                                    width: `${itemPercent}%`
                                }
                                return <div className="relative pt-1" key={item.Showtime.movie_id}>
                                    <div className="flex mb-2 items-center justify-between ">
                                        <div>
                                            <span className={`text-xs font-bold inline-block py-1 px-2 rounded-full text-primary bg-secondary-container uppercase`}>
                                                {item.Showtime.Movie.title}
                                            </span>
                                        </div>
                                        <div className="text-right font-label-bold text-primary">{formatVND2(parseInt(item.total_revenue))}</div>
                                    </div>

                                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded-full bg-surface-container-high">
                                        <div className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${getCss(index)}`} style={styleWidth}></div>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                </div>
            </section>
        </div>
    </>
}

export default ContentAdminBranch