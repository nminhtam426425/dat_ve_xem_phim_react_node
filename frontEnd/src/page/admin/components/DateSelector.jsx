import React, { useEffect, useState } from 'react';
import {ChevronLeft, ChevronRight} from 'lucide-react'
const DateSelector = ({ setOnDateSelect, }) => {
    const getNextSevenDays = (dateMark=1) => {
        const days = []
        const daysOfWeek = ['CNhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7']

        for (let i = 0; i < 7; i++) {
            let current = new Date() 
            if(dateMark != 1){
                current.setDate(current.getDate() + dateMark)
            }
            current.setDate(current.getDate() + i)

            days.push({
                fullDate: current, 
                dayLabel: daysOfWeek[current.getDay()], 
                dateNumber: current.getDate()+'-'+(current.getMonth()+1), 
                id: current.toISOString().split('T')[0] 
            })
        }
        return days
    }

    const [daysList, setDayList] = useState(getNextSevenDays())
    const [selectedId, setSelectedId] = useState(daysList[0].id)
    const [dateMark, setDataMark] = useState(0)

    const handleSelect = (day) => {
        setSelectedId(day.id)
        setOnDateSelect(day.id)
    }

    useEffect(()=>{
        let temp = getNextSevenDays(dateMark)
        setDayList(temp)
        setSelectedId(temp[0].id)
        setOnDateSelect(temp[0].id)
    },[dateMark])

    return (
        <div className="flex items-center gap-2 overflow-x-auto pb-2 hide-scrollbar w-full xl:w-auto">
            <ChevronLeft size={20} className='cursor-pointer' onClick={()=>setDataMark(pre => pre - 7)}/>
            {daysList.map((day) => {
                const isActive = day.id === selectedId

                return (
                    <button
                        key={day.id}
                        onClick={() => handleSelect(day)}
                        className={`min-w-[80px] p-3 rounded-xl flex flex-col items-center gap-1 transition-colors ${
                            isActive
                                ? 'border-2 border-primary bg-primary/5'
                                : 'border border-outline-variant/50 hover:border-primary'
                        }`}
                    >
                        <span
                            className={`text-xs font-bold uppercase ${
                                isActive ? 'text-primary' : 'text-secondary'
                            }`}
                        >
                            {day.dayLabel}
                        </span>
                        <span
                            className={`text-xl font-black ${
                                isActive ? 'text-primary' : ''
                            }`}
                        >
                            {day.dateNumber}
                        </span>
                    </button>
                );
            })}
             <ChevronRight size={20} className='cursor-pointer' onClick={()=>setDataMark(pre => pre + 7)}/>
        </div>
    )
}

export default DateSelector