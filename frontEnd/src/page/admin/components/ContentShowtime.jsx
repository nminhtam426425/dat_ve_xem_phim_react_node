import {Plus, Trash2, Pencil} from 'lucide-react'
import DateSelector from './DateSelector'
import { toast } from 'sonner'

const times = [
    {time: '00:00'},{time: '01:00'}, {time: '02:00'},{time: '03:00'},
    {time: '04:00'},{time: '05:00'}, {time: '06:00'},{time: '07:00'},
    {time: '08:00'},{time: '09:00'},{time: '10:00'},{time: '11:00'},
    {time: '12:00'},{time: '13:00'},{time: '14:00'},{time: '15:00'},
    {time: '16:00'},{time: '17:00'},{time: '18:00'},{time: '19:00'},
    {time: '20:00'},{time: '21:00'}, {time: '22:00'},{time: '23:00'},
  
]

const calcultorWidthOrLeft = (start, end) => {
    let temp = ((start - end)/(1000*60*60)/24)*100
    return temp.toFixed(2)
}

const RenderBorderRight = () => {
    let temp = []
    for(let i = 0; i < 24; i++)
        temp.push({id: i})

    return <div className="absolute inset-0 grid pointer-events-none opacity-20 grid-cols-24">
        {
            temp.map( (item) => <div key={item.id} className="border-r border-b border-outline"></div>)
        }
    </div>
}

const typeTheater = (id) => {
    let temp = {
        1: 'bg-secondary-container text-secondary',
        2: 'bg-primary/10 text-primary',
        3: 'bg-secondary-container text-secondary',
        4: 'bg-yellow-100 text-yellow-700',
        5: 'bg-primary/10 text-primary'
    }
    return temp[id]
}

const formatHourMinute = (time) => {
    return time < 10 ? '0'+time : time
}

const ContentShowtime = ({setDataItem, datas, onDateSelect, setOnDateSelect, setConfirm, setDataItemBeforeConfirm}) => {
    const gridStyle = { gridTemplateColumns: `180px repeat(${times.length}, minmax(0, 90px))`}

    const handleDelete = (showtime, item, index) => {
        if(showtime.sold > 0){
            toast.error('Không thể xóa suất chiếu đã có vé được bán ra!')
            return 
        }
        setDataItemBeforeConfirm({
            id: item.showtimes[index].id,
            room_id: item.room_id
        })
        setConfirm(true)
    }

    const handleUpdate = (showtime) => {
        if(showtime.sold > 0 ){
            toast.error('Không thể cập nhật suất chiếu đã có vé được bán ra!')
            return 
        }
        setDataItem(showtime)
    }

    return <div className="max-w-container-max mx-auto w-full p-6">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
            <div>
                <h1 className="font-headline-lg text-headline-lg text-on-surface mb-2">Quản lý lịch chiếu</h1>
            </div>
        </header>

        <section className="bg-white rounded-2xl shadow-sm border border-outline-variant/30 p-6 mb-8">
            <div className="flex flex-col xl:flex-row items-center gap-6">
                <DateSelector setOnDateSelect={setOnDateSelect}/>

                <div className="h-10 w-px bg-outline-variant/30 hidden xl:block"></div>

                <div className="flex flex-wrap gap-4 w-full xl:flex-1">
                    <div className="flex-1 min-w-[200px]">
                        {/* <label className="block text-xs font-bold text-secondary uppercase mb-2 ml-1">Phim đang chiếu</label>
                        <div className="relative">
                            <select className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-4 py-2.5 appearance-none focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all">
                                <option>Tất cả phim</option>
                                <option>Oppenheimer</option>
                                <option>Barbie</option>
                                <option>Dune: Part Two</option>
                            </select>
                            <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-secondary">
                                <ChevronDown size={20} />
                            </span>
                        </div> */}
                    </div>

                    <button 
                        className="p-3 bg-primary-container text-on-primary px-4 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-primary-container/30 active:scale-95 transition-transform"
                        onClick={()=>{setDataItem({})}}>
                        <span className="material-symbols-outlined">
                            <Plus size={20} />
                        </span>Suất chiếu mới
                    </button>
                </div>
            </div>
        </section>

        <div className="w-[1200px] overflow-x-auto rounded-2xl border border-outline-variant/30 bg-white shadow-lg">
            <div className="w-max">
                <div className="grid w-full bg-surface-container-low border-b border-outline-variant/30" style={gridStyle}>
                    <div className="w-full p-4 border-r border-outline-variant/30 flex items-center justify-center font-bold text-secondary uppercase text-xs tracking-tighter">
                        Phòng / Giờ
                    </div>
                    {
                        times.map((item, index) => 
                            <div key={index} className="p-3 text-center text-xs font-bold text-secondary border-r border-outline-variant/30">
                                {item.time}
                            </div>
                        )
                    }
                </div>

                {
                    datas?.map( (item, index) => 
                        <div className="grid w-max h-32 border-b border-outline-variant/10 group" style={gridStyle} key={index}>
                            <div className="p-4 border-r border-outline-variant/30 bg-surface-container-low flex flex-col justify-center items-center sticky left-0 z-20 shadow-[4px_0_24px_rgba(0,0,0,0.05)]">
                                <span className="font-bold text-on-surface">{item.name}</span>
                                <span className={`text-[10px] ${typeTheater(item.type_id)} px-2 py-0.5 rounded-full w-fit mt-1 font-bold`}>{item.type}</span>
                            </div>
                            <div className="relative col-span-24 group-hover:bg-surface-container-low/30 transition-colors">
                            <RenderBorderRight />
                            {
                                item?.showtimes?.map( (showtime, index) => {
                                    let start = new Date(showtime.startTime)
                                    let end = new Date(showtime.endTime)
                                    let temp = new Date(onDateSelect)
                                    let mark = new Date(temp.getFullYear(), temp.getMonth(), temp.getDate(), 0, 0 ,0)
                                    let leftShow = calcultorWidthOrLeft(start, mark)
                                    let widthShow = calcultorWidthOrLeft(end, start)
                                    let tempStyle = {
                                        left: `${leftShow}%`,
                                        width: `${widthShow}%`
                                    }
                                    let percentSold = (showtime?.sold/item.total)*100 
                                    let percentStyle = {
                                        width: `${percentSold}%`,
                                    } 
                                    return (
                                        <div 
                                            key={index} 
                                            className={`absolute top-3 bottom-3 rounded-xl shadow-md border-l-4 p-3 flex flex-col justify-between hover:scale-[1.02] hover:shadow-lg transition-all cursor-pointer z-10 ${percentSold > 70 ? 'bg-primary text-white border-white/30' : 'bg-white border-slate-700'}`}
                                            style={tempStyle}>
                                            <div>
                                                <div className="flex flex-col gap-0.5">
                                                    <span className="font-bold text-[11px] leading-tight">{showtime.name}</span>
                                                    <span className="text-[9px] font-bold opacity-80 shrink-0">
                                                        {`${formatHourMinute(start.getHours())}:${formatHourMinute(start.getMinutes())} - ${formatHourMinute(end.getHours())}:${formatHourMinute(end.getMinutes())}`}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="flex justify-between">
                                                <span className="text-[10px]">{showtime.sold || 0}/{item.total || 0}</span>
                                                <div className="flex ">
                                                    <div className="flex justify-end">
                                                        <button
                                                            className="p-1 rounded-lg hover:bg-surface-container transition-all text-tertiary"
                                                            onClick={()=>handleUpdate(showtime, item)}>
                                                            <span className="text-yellow-700"><Pencil size={12}/></span>
                                                        </button>
                                                        <button
                                                            className="p-1 rounded-lg hover:bg-error-container hover:text-error transition-all text-tertiary"
                                                            onClick={()=>handleDelete(showtime, item, index)}>
                                                            <span className="text-primary"><Trash2 size={12}/></span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                           
                                            <div className={`h-1 rounded-full overflow-hidden${percentSold > 70 ? 'bg-white/20' : 'bg-surface-container'}`}>
                                                <div 
                                                    className={`h-full ${percentSold > 70 ? 'bg-white' : 'bg-primary'}`} 
                                                    style={percentStyle}>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                        }
                            </div>
                        </div>
                    )
                }
               
            </div>
        </div> 
    </div>
   
}

export default ContentShowtime