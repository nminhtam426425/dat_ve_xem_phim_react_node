import { useEffect, useState, useMemo } from "react"
import {CircleCheck, CircleX, Search, Plus} from "lucide-react"
import { removeVietnameseTones, customeFetch,apiUserService } from "../../../config"
import Paging from "../../../admin/components/Paging"
import { useDebounce } from 'use-debounce'

const EarnPoint = ({confirm, setConfirm, setUserEarnPoint, setNewCustomer}) => {
    const [datas, setDatas] = useState([])
    const [searchKeyword, setSearchKeyword] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 3
    const [debouncedSearch] = useDebounce(searchKeyword, 500)

    useEffect(() => {
        const getDatasAccount = async () => {
            try{
                const res = await customeFetch(apiUserService.baseURL+'/users/all-staff','authen','GET')
                if(res.ok){
                    const data = await res.json()
                    setDatas(data.filter(item => item.role == "user" && item.is_activating == 1))
                }
            }
            catch(err){
                console.log(err)
            }
        }
        getDatasAccount()
    },[])

    const filteredData = useMemo(()=>{
        return datas.filter(item => {
            const keyword = removeVietnameseTones(debouncedSearch.trim())
            const matchSearch = keyword === "" || removeVietnameseTones(item.fullname).includes(keyword) 
                                               || removeVietnameseTones(item.email).includes(keyword)
    
            return matchSearch 
        }) 
    },[datas, debouncedSearch])

    const totalPages = Math.ceil(filteredData.length / itemsPerPage)

    const dataOfPage = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage
        const endIndex = startIndex + itemsPerPage
    
        return filteredData.slice(startIndex,endIndex)

    },[filteredData,currentPage,itemsPerPage])

    const resetFilter = () => {
        //setSearchKeyword("")
    }

    const handleSearch = (e) => {
        setCurrentPage(1)
        setSearchKeyword(e.target.value)
    }

    const handleChoseUser = (user) => {  
        if(!user) return
        setUserEarnPoint({
            id: user.id,
            fullname: user.fullname,
        })
        setConfirm(false)
    }

    return <>
        <div className="modal" style={{display: confirm ? 'flex' : 'none'}}>
            <div className="modal-content p-0">
                <div className="w-[300px] md:w-[700px] rounded-2xl bg-white p-6 shadow-xl transition-all dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
                    <div className="flex items-center justify-between gap-4">
                        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                            Danh sách người dùng 
                        </h3>
                        <button 
                            onClick={()=>setConfirm(false)}
                            className="text-sm leading-relaxed rounded-lg text-primary">
                            <CircleX size={20}/>
                        </button>
                    </div>

                    <div className="flex gap-2">
                        <div className="relative flex-1">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary" data-icon="search">
                                <Search size={20} />
                            </span>
                            <input 
                                className="w-full pl-10 pr-4 py-2.5 bg-surface-container-low border border-outline-variant/50 rounded-lg focus:ring-1 transition-all text-body-md outline-none" 
                                placeholder="Tìm kiếm theo tên, email..." 
                                type="text"
                                value={searchKeyword}
                                onChange={handleSearch}/>
                        </div>
                        <button 
                                className="bg-primary hover:bg-primary-container text-white px-6 py-3 rounded-lg font-label-bold flex items-center gap-2 transition-all active:scale-95 shadow-lg shadow-primary/20"
                                onClick={()=>setNewCustomer({})}>
                                <span className="material-symbols-outlined">
                                    <Plus size={20}/>
                                </span>Khách hàng mới
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-surface-container-low/50">
                                    <th className="px-6 py-4 font-label-bold text-secondary text-sm uppercase tracking-wider w-2/5">Người dùng</th>
                                    <th className="px-6 py-4 font-label-bold text-secondary text-sm uppercase tracking-wider w-2/5">Tên đăng nhập</th>
                                    <th className="px-6 py-4 font-label-bold text-secondary text-sm uppercase tracking-wider w-1/5 text-right">Thao tác</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-outline-variant/10">
                                {
                                    dataOfPage.length > 0 
                                    ? 
                                    (
                                        dataOfPage.map( (item, index) =>  
                                        <tr className="hover:bg-surface-container-lowest/50 transition-colors group" key={index}>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-10 w-10 rounded-full overflow-hidden border border-outline-variant/30">
                                                        <img alt="User" className="w-full h-full object-cover" src={item?.avatar == "" ? null : item?.avatar}/>
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-on-surface">{item.fullname}</div>
                                                        <div className="text-sm text-secondary">{item.email}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            
                                            <td className="px-2 py-4 text-on-surface-variant font-medium max-w-[220px] truncate">{item.username}adadadad</td>
                                           
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex justify-end gap-1 transition-opacity">
                                                    <button 
                                                        className={`p-1.5 rounded text-white transition-colors bg-green-400`}
                                                        onClick={()=>handleChoseUser(item)}>
                                                        <span className="material-symbols-outlined text-[12px] flex max-h-[20px] items-center gap-2">
                                                            <CircleCheck size={20} /> Tích điểm
                                                        </span>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>)
                                    )
                                    :
                                    (
                                        <tr>
                                            <td className="px-6 py-4" colSpan={3}>
                                                Không có dữ liệu
                                            </td>
                                        </tr>
                                    )
                                
                                }
                            </tbody>
                        </table>
                    </div>
                    {dataOfPage.length > 0 
                    && <Paging currentPage={currentPage} setCurrentPage={setCurrentPage} totalPage={totalPages} resetFilter={resetFilter} itemsPerPage={itemsPerPage}/>}
                </div>
            </div>
        </div>
    </>
}

export default EarnPoint