import {ListFilter,Plus,Pencil,Trash2,Lock,LockOpen, Search} from "lucide-react"
import { formatDate, formatPhone, uppercaseFirstLetter } from "../../validate.js"
import { useMemo, useState } from "react"
import Paging from "./Paging.jsx"
import { removeVietnameseTones } from "../../config.js"

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

// đếm các phần tử theo tháng trước tính từ tháng này
// giả sử: admin đăng nhập tháng 6, sẽ đếm các phần tử tháng 5 để tính toán số lượng % tăng trưởng
const countMonthNow = (array) => {
    if(!array) return ""
    let monthNow = new Date()
    return array.length - countByDateCondition(array, monthNow.getMonth() - 1)
}

const ContentAccountManager = ({datas, setDataItem, itemsPerPage, currentPage, setCurrentPage, setConfirm, setDataItemBeforeConfirm}) => {
    const [roleForRender, setRoleForRender] = useState('staff')
    const [searchKeyword, setSearchKeyword] = useState('')
    const [isActivate, setIsActivate] = useState(1)

    const filteredData = useMemo(()=>{
        return datas.filter(item => {
            let matchRole = item.role == roleForRender
            const keyword = removeVietnameseTones(searchKeyword.trim())
            const matchSearch = keyword === "" || removeVietnameseTones(item.fullname).includes(keyword) 
                                               || removeVietnameseTones(item.email).includes(keyword)
            const matchActivate = item.is_activating == isActivate
    
            return matchRole && matchSearch && matchActivate
        }) 
    },[datas, roleForRender, searchKeyword, isActivate])

    const totalPages = Math.ceil(filteredData.length / itemsPerPage)

    const dataOfPage = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage
        const endIndex = startIndex + itemsPerPage
    
        return filteredData.slice(startIndex,endIndex)

    },[filteredData,currentPage,itemsPerPage])

    const resetFilter = () => {
        setSearchKeyword("")
    }

    const handleSearch = (e) => {
        setCurrentPage(1)
        setSearchKeyword(e.target.value)
    }

    const handleChosenActivate = (e) => {
        setCurrentPage(1)
        setIsActivate(pre => pre == 1 ? 0 : 1)
    }

    const lockAccount = (item) => {
        setDataItemBeforeConfirm(item)
        setConfirm('lock')
    }

    const unLockAccount = (item) => {
        setDataItemBeforeConfirm(item)
        setConfirm('unlock')
    }

    return <div className="p-gutter mx-auto space-y-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/20 shadow-sm flex flex-col gap-2">
                <span className="text-secondary font-label-bold text-label-sm">Tổng tài khoản</span>
                <div className="flex items-end gap-2">
                    <span className="text-3xl font-bold text-on-surface">{datas.length}</span>
                    <span className="text-primary text-xs font-bold pb-1">+{Math.floor((countMonthNow(datas)/datas.length)*100)}%</span>
                </div>
            </div>

            <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/20 shadow-sm flex flex-col gap-2">
                <span className="text-secondary font-label-bold text-label-sm">Nhân viên</span>
                <div className="flex items-end gap-2">
                    <span className="text-3xl font-bold text-on-surface">{countByCondition(datas, 'role', 'staff')}</span>
                    <span className="text-primary text-xs font-bold pb-1">Ổn định</span>
                </div>
            </div>

            <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/20 shadow-sm flex flex-col gap-2">
                <span className="text-secondary font-label-bold text-label-sm">Khách hàng mới (Tháng)</span>
                <div className="flex items-end gap-2">
                    <span className="text-3xl font-bold text-on-surface">{countByCondition(datas, 'role', 'user')}</span>
                    <span className="text-primary text-xs font-bold pb-1">+{Math.floor((countMonthNow(datas.filter(item => item.role == 'user'))/datas.length)*100)}%</span>
                </div>
            </div>

            <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/20 shadow-sm flex flex-col gap-2">
                <span className="text-secondary font-label-bold text-label-sm">Tài khoản Active</span>
                <div className="flex items-end gap-2">
                    <span className="text-3xl font-bold text-on-surface">{countByCondition(datas, 'is_activating', 1)}</span>
                    <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider mb-1">High</span>
                </div>
            </div>
        </div>

        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/30 shadow-md overflow-hidden w-full">
            <div className="p-6 border-b border-outline-variant/20 flex justify-between items-center bg-surface-container-low/30">
                <div className="flex items-center gap-4">
                    <button 
                        className="bg-primary text-white px-6 py-2.5 rounded-xl font-label-bold text-sm flex items-center gap-2 hover:opacity-90 active:scale-95 transition-all shadow-lg shadow-primary/20"
                        onClick={()=>setDataItem({})}>
                        <span className="material-symbols-outlined text-sm">
                            <Plus size={20}/>
                        </span>Thêm tài khoản nhân viên
                    </button>

                    <div className="flex border border-outline-variant/50 rounded-lg overflow-hidden">
                        <button 
                            className={`px-4 py-2 text-sm ${roleForRender == 'staff' ? 'text-primary bg-surface-container-high font-bold' : ' hover:bg-surface-container-low text-secondary font-label-bold text-sm border-l border-outline-variant/50'}`}
                            onClick={() => setRoleForRender('staff')}>
                            Nhân viên
                            </button>
                        <button 
                            className={`px-4 py-2 text-sm ${roleForRender == 'user' ? 'text-primary bg-surface-container-high font-bold' : ' hover:bg-surface-container-low text-secondary font-label-bold text-sm border-l border-outline-variant/50'}`}
                            onClick={() => setRoleForRender('user')}>
                            Khách hàng
                        </button>
                    </div>

                    <div className="relative min-w-[300px] ml-4">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary" data-icon="search">
                            <Search size={20} />
                        </span>
                        <input 
                            className="w-full pl-10 pr-4 py-2.5 bg-surface-container-low border border-outline-variant/50 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all text-body-md outline-none" 
                            placeholder="Tìm kiếm theo tên, email..." 
                            type="text"
                            value={searchKeyword}
                            onChange={handleSearch}/>
                    </div>
                </div>

                <button className="p-2 text-secondary hover:bg-surface-container border border-outline-variant/30 rounded-lg transition-all">
                    <span className="material-symbols-outlined">
                        <ListFilter size={20}/>
                    </span>
                </button>

              
            </div>
            <div className="px-6 py-2">
                <input 
                    type="checkbox" 
                    id="is_activating"
                    value={isActivate}
                    onChange={handleChosenActivate}/>
                <label htmlFor="is_activating">Tài khoản dã ngừng kích hoạt</label>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-surface-container-low/50">
                            <th className="px-6 py-4 font-label-bold text-secondary text-sm uppercase tracking-wider">Người dùng</th>
                            <th className="px-6 py-4 font-label-bold text-secondary text-sm uppercase tracking-wider">Số điện thoại</th>
                            <th className="px-6 py-4 font-label-bold text-secondary text-sm uppercase tracking-wider">Vai trò</th>
                            <th className="px-6 py-4 font-label-bold text-secondary text-sm uppercase tracking-wider">Ngày tham gia</th>
                            <th className="px-6 py-4 font-label-bold text-secondary text-sm uppercase tracking-wider text-right">Thao tác</th>
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
                                    
                                    <td className="px-6 py-4 text-on-surface-variant font-medium">{formatPhone(item.phone)}</td>
                                    
                                    <td className="px-6 py-4">
                                        {
                                            item.role == 'staff' 
                                            ?
                                            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase">{uppercaseFirstLetter(item.role)}</span>
                                            : 
                                            <span className="px-3 py-1 bg-outline-variant/20 text-on-surface-variant rounded-full text-xs font-bold uppercase">{uppercaseFirstLetter(item.role)}</span>
                                        }
                                        
                                    </td>
                                    
                                    <td className="px-6 py-4 text-on-surface-variant text-sm">{formatDate(item.created_at)}</td>
                                    
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            { item.is_activating 
                                            ? 
                                            <button
                                                onClick={()=>lockAccount(item)}
                                                className={`p-1.5 rounded text-secondary ${item.is_activating ? 'hover:bg-error-container' : 'text-primary hover:bg-yellow-100'} transition-colors`}>
                                                <span className="material-symbols-outlined text-[20px]" title= "Khoá tài khoản">
                                                    <Lock size={20}/>
                                                </span>
                                            </button>
                                            : 
                                            <button 
                                            onClick={()=>unLockAccount(item)}
                                                className={`p-1.5 rounded text-secondary ${item.is_activating ? 'hover:bg-error-container' : 'text-primary hover:bg-yellow-100'} transition-colors`}>
                                                <span className="material-symbols-outlined text-[20px]" title="Mở tài khoản">
                                                    <LockOpen size={20}/> 
                                                </span>
                                            </button>
                                            }
                                           
                                            <button className="p-1.5 rounded text-secondary hover:text-primary transition-colors hover:bg-yellow-100">
                                                <span className="material-symbols-outlined text-[20px]">
                                                <Pencil size={20}/></span>
                                            </button>
                                            {/* <button className="p-1.5 rounded text-secondary hover:text-error transition-colors hover:bg-error-container">
                                                <span className="material-symbols-outlined text-[20px]">
                                                <Trash2 size={20}/></span>
                                            </button> */}
                                        </div>
                                    </td>
                                </tr>)
                            )
                            :
                            (
                                <tr>
                                    <td className="px-6 py-4" colSpan={4}>
                                        Không có dữ liệu
                                    </td>
                                </tr>
                            )
                        
                        }
                    </tbody>
                </table>
            </div>

            {/* paging */}
            {dataOfPage.length > 0 
            && <Paging currentPage={currentPage} setCurrentPage={setCurrentPage} totalPage={totalPages} resetFilter={resetFilter} itemsPerPage={itemsPerPage}/>}
        </div>
    
    </div>
}

export default ContentAccountManager