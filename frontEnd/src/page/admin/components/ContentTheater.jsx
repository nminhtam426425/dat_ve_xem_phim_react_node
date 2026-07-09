import {ChevronRight, ScreenShare,Plus, ArrowLeft, Users, Pencil, Eye, Trash2} from 'lucide-react'
import { useEffect, useState } from 'react'
import { customeFetch, apiUserService } from '../../config'

// theater: dùng chứa index phòng chiếu đang được chọn
// chais:   dùng để render phòng chiếu
// theater...: dùng để in table các phòng chiếu đang quản lý
const ContentTheater = ({setDataItem,theaterOnBranch, setDataItemBeforeConfirm, setConfirm}) => {
    const [chairs, setChairs] = useState(null)
    const [theater, setTheater] = useState(null)
    let propsOfTable = {
        theaterOnBranch,
        theaterOnBranch,
        setDataItem,
        setChairs,
        setTheater,
        setConfirm,
        setDataItemBeforeConfirm
    }
    return <>
        <div className="p-6">
            <div>
                <nav className="flex items-center gap-2 text-sm text-secondary mb-4">
                    <span>Hệ thống</span>
                    <span className="material-symbols-outlined text-[12px]" data-icon="chevron_right">
                        <ChevronRight size={20}/>
                    </span>
                    <span className="cursor-pointer" onClick={()=>setTheater(null)}>Phòng chiếu</span>
                    {
                        theater!=null
                        && <>
                            <span className="material-symbols-outlined text-[12px]" data-icon="chevron_right">
                                <ChevronRight size={20}/>
                            </span>
                            <span className="text-primary font-semibold">{theaterOnBranch[theater]?.name}</span>
                        </>
                    }
                    
                </nav>
                <hr />
                {
                    theater!=null
                    ?
                    <div className="w-full flex justify-between">
                        <div>
                            <h1 className="text-headline-lg font-extrabold text-on-surface flex items-center my-4 mr-4">
                                <span className="cursor-pointer mr-2" onClick={()=>setTheater(null)}>
                                    <ArrowLeft size={24}/>
                                </span>
                                    {theaterOnBranch[theater]?.name} - 0{theaterOnBranch[theater]?.id}
                                <span className="bg-primary-container/10 text-primary text-xs px-3 py-1 rounded-full border border-primary/20 ml-4">
                                    Phòng chiếu đang hoạt động
                                </span>
                            </h1>

                            <div className="flex items-center gap-6 my-3 text-secondary">
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-body-md" data-icon="groups">
                                        <Users size={20}/>
                                    </span>
                                    <span className="text-body-md">Sức chứa: <strong>{chairs?.list?.length || 0} ghế</strong></span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-body-md" data-icon="aspect_ratio">
                                        <ScreenShare size={20}/>
                                    </span>
                                    <span className="text-body-md">Loại phòng chiếu: <strong>{theaterOnBranch[theater]?.TypeTheater?.type_name || ''}</strong></span>
                                </div>
                            </div>
                        </div>
                        {/* <div className="flex items-center">
                            <button 
                                className="px-6 py-3 border border-outline rounded-xl font-bold text-primary bg-surface hover:bg-surface-container-high transition-all"
                                >Sửa cấu hình
                            </button>
                        </div> */}
                    </div>
                    :
                    <div className="flex justify-between items-center mt-6 mb-8">
                        <div>
                            <h1 className="font-extrabold text-on-surface text-[22px]">Danh sách phòng chiếu</h1>
                            <p className="text-secondary mt-1">Danh sách và sơ đồ ghế các phòng chiếu trong hệ thống</p>
                        </div>

                        <button 
                            className="px-6 py-3 bg-primary text-on-primary rounded-xl font-bold shadow-lg shadow-primary/20 active:scale-95 transition-all flex items-center gap-2"
                            onClick={()=>setDataItem({})}
                            >
                                <span className="material-symbols-outlined text-[20px]" data-icon="add">
                                    <Plus size={20}/>
                                </span>Thêm phòng mới
                        </button>
                    </div>
                   
                }
               
            </div>
            { theater==null&&<Table {...propsOfTable}/>}
            
            {/* chi tiet phong chieu */}
            {
                theater!=null
                && 
                <div className="bg-surface-container-lowest rounded-3xl p-12 shadow-sm border border-outline-variant/20 relative overflow-hidden">
                    
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/5 rounded-full -ml-24 -mb-24 blur-3xl"></div>

                    <div className="flex flex-col items-center mb-24 ml-16">
                        <div className="w-2/3 h-12 screen-curve flex items-center justify-center ">
                            <span className="text-xs font-bold tracking-[0.5em] text-secondary mt-2">MÀN HÌNH</span>
                        </div>
                    </div>
                    <div className="seat-grid flex flex-col gap-3 items-center">
                        <div className="space-y-4" id="grid-container">
                            
                            <Theater list={chairs.list} count={chairs.count}/>

                        </div>
                    </div>
                
                    <div className="mt-20 pt-10 border-t border-outline-variant/30 flex flex-wrap justify-center gap-8">
                        <div className="p-4 bg-surface-container-low rounded-2xl flex gap-8 items-center border border-outline-variant/20">
                            <div className="flex items-center gap-3">
                                <div className="w-6 h-6 rounded-md bg-seat-standard"></div>
                                <span className="text-sm font-semibold text-secondary">Thường</span>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="w-6 h-6 rounded-md bg-seat-vip shadow-md shadow-amber-200"></div>
                                <span className="text-sm font-semibold text-secondary">VIP</span>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="w-12 h-6 rounded-md bg-seat-sweetbox shadow-md shadow-pink-200"></div>
                                <span className="text-sm font-semibold text-secondary">Ghế Đôi / Sweetbox</span>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    </>
}

// table danh sách các phòng chiếu
const Table = ({setChairs, theaterOnBranch, setDataItem, setTheater, setDataItemBeforeConfirm, setConfirm}) => {
    const handleGetChairOfTheater = async (idTheater, index) => {
        if(!idTheater) return ""
        try{
            const res = await customeFetch(apiUserService.baseURL+`/branches/chairs/${idTheater}`,'authen','GET')
            if(res.ok){
                const data = await res.json()
                setChairs(data) 
                setTheater(index)
            }
        }
        catch(err){
            console.log(err)
        }
    }
    const handleDelete = (item) => {
        setDataItemBeforeConfirm(item)
        setConfirm(true)
    }
    return <>
        <div className="bg-surface-container-lowest rounded-3xl shadow-sm border border-outline-variant/20 overflow-hidden mb-4">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-surface-container-low border-b border-outline-variant/30">
                        <th className="px-6 py-4 font-bold text-secondary text-sm uppercase tracking-wider">STT</th>
                        <th className="px-6 py-4 font-bold text-secondary text-sm uppercase tracking-wider">Tên phòng</th>
                        <th className="px-6 py-4 font-bold text-secondary text-sm uppercase tracking-wider">Mô tả</th>
                        <th className="px-6 py-4 font-bold text-secondary text-sm uppercase tracking-wider text-center">Hành động</th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-outline-variant/10">
                {
                    theaterOnBranch?.map( (item, index) => 
                        <tr className="hover:bg-surface-container/30 transition-colors" key={index}>
                            <td className="px-6 py-4 font-medium">0{(index+1)}</td>
                            <td className="px-6 py-4 font-bold text-on-surface">{item.name} - {item.TypeTheater.type_name}</td>
                            <td className="px-6 py-4 text-secondary text-sm">{item.TypeTheater.description}</td>
                            <td className="px-6 py-4 text-center">
                                <button 
                                    className="px-4 py-2 bg-primary/10 text-primary hover:bg-primary hover:text-on-primary rounded-lg font-bold text-sm transition-all active:scale-95" 
                                    onClick={()=>{setDataItem(item)}}>
                                        <span><Pencil size={20}/></span>
                                </button>

                                <button 
                                    className="ml-2 px-4 py-2 bg-primary/10 text-primary hover:bg-primary hover:text-on-primary rounded-lg font-bold text-sm transition-all active:scale-95" 
                                    onClick={()=>handleGetChairOfTheater(item?.id, index)}>
                                        <span><Eye size={20}/></span>
                                </button>

                                <button 
                                    className="ml-2 px-4 py-2 bg-primary/10 text-primary hover:bg-primary hover:text-on-primary rounded-lg font-bold text-sm transition-all active:scale-95" 
                                    onClick={()=>handleDelete(item)}>
                                        <span><Trash2 size={20}/></span>
                                </button>
                            </td>
                        </tr>
                    )
                }
                </tbody>
            </table>
        </div>
    </>
}

// Tạo mỗi hàng ghế 
const RowTheater = ({list}) => {
    let typeCssColorChair = {
        Standard: 'standard',
        VIP: 'vip',
        Sweetbox: 'sweetbox'
    }

    return <div className="flex items-center gap-8">
        <span className="w-6 text-center font-bold text-seat-sweetbox text-sm">{list[0]?.seat_number?.charAt(0)}</span>
        
        <div className="flex gap-2">
            {
                list?.map( (item, index) => <div key={index}
                    className={`h-8 rounded-lg bg-seat-${typeCssColorChair[item.type]} cursor-pointer hover:ring-2 ring-primary ring-offset-2 transition-all 
                        flex items-center justify-center text-white ${item.type == 'Sweetbox' ? 'w-[72px]' : 'w-8'}`}
                    title={item.seat_number}>{item.seat_number}
                </div>)
            }
        </div>
    </div>
}

// trả về số hàng ghế, vì nếu loại Sweetbox thì chỉ bằng 1 / 2 ghế VIP và Standard ở mỗi hàng
const calculatorNumberOfRow = (listChair, count) => {
    let reulst = 0
    let length = listChair?.length || 0
    for(let i = 0; i <  length;){
        reulst++
        if(listChair[i].type == 'Sweetbox')
            i+=(count/2)
        else 
            i+=count
    }
    return reulst
}

// Trả về mô phỏng phòng chiếu
const Theater = ({list, count}) => {
    let length = calculatorNumberOfRow(list, count)
    let objRender = []
    let index = 0
    for(let i = 0; i < length; i++){
        let typeRoom = list[index].type
        if(typeRoom == 'Sweetbox'){
            let nextIndex = index + (count/2) 
            objRender.push({
                listRender: list.slice(index, nextIndex)
            })
            index += count/2
        }
        else{
            objRender.push({
                listRender: list.slice(index, index + count)
            })
            index += count
        }
    }
    return <>
        {
            objRender.map( (item, index) => <RowTheater key={index} list={item.listRender}/>)
        }
    </>
}

export default ContentTheater