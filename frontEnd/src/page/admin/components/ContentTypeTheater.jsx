import {Plus, Pencil, Trash2, Search} from "lucide-react"
import { useMemo, useState } from "react"
import Paging from "./Paging"
import { removeVietnameseTones } from "../../config"

const ContentTypeTheater = ({datas, setDataItem, setDataItemBeforeConfirm, setConfirm}) => {
    const itemsPerPage = 5
    const [currentPage, setCurrentPage] = useState(1)
    const [searchKeyword, setSearchKeyword] = useState('')
    const totalPages = Math.ceil(datas.length / itemsPerPage)

    const filteredData  = useMemo(()=>{
        return datas.filter((item) => {
            const keyword = removeVietnameseTones(searchKeyword.trim())
            const matchSearch = keyword === "" || removeVietnameseTones(item.type_name).includes(keyword)
    
            return matchSearch
        })
       
    },[searchKeyword, datas])

    const dataOfPage = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage
        const endIndex = startIndex + itemsPerPage
    
        return filteredData.slice(startIndex,endIndex)

    }, [filteredData,currentPage,itemsPerPage])

    const handleDelete = (item) => {
        setDataItemBeforeConfirm(item)
        setConfirm(true)
    }

    const handleSearch = (e) => {
        setCurrentPage(1)
        setSearchKeyword(e.target.value)
    }

    const resetFilter = () => {
        setSearchKeyword("")
    }

    return <>
        <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                <div>
                    <h2 className="text-headline-lg font-black text-on-surface tracking-tight">Loại phòng chiếu</h2>
                </div>

                <button 
                    className="bg-primary hover:bg-primary-container text-white px-6 py-3 rounded-lg font-label-bold flex items-center gap-2 transition-all active:scale-95 shadow-lg shadow-primary/20"
                    onClick={()=>setDataItem({})}>
                    <span className="material-symbols-outlined">
                        <Plus size={20}/>
                    </span>Loại phòng chiếu mới
                </button>
            </div>

            <section className="mb-base flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl shadow-sm border border-outline-variant/20">
                <div className="flex flex-1 flex-wrap gap-4 items-center">
                    <div className="relative min-w-[300px]">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary" data-icon="search">
                            <Search size={20} />
                        </span>
                        <input 
                            className="w-full pl-10 pr-4 py-2.5 bg-surface-container-low border border-outline-variant/50 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all text-body-md outline-none" 
                            placeholder="Tìm kiếm thể loại..." 
                            type="text"
                            value={searchKeyword}
                            onChange={handleSearch}/>
                    </div>
                </div>
            </section>

            <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-surface-container-low text-secondary text-xs uppercase tracking-wider font-bold">
                            <tr>
                                <th className="px-6 py-4">STT</th>
                                <th className="px-6 py-4">Tên thể loại</th>
                                <th className="px-6 py-4">Mô tả loại phòng</th>
                                <th className="px-6 py-4">Thao tác</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-outline-variant">
                            {
                                dataOfPage.length > 0 
                                ?
                                dataOfPage?.map( (item, index) => 
                                    <tr key={item.id} className="hover:bg-surface-container-low/50 transition-colors group">
                                        <td className="px-6 py-5 font-bold text-on-surface">{index+1}</td>
                                        <td className="px-6 py-5 font-bold text-on-surface">{item?.type_name}</td>
                                        <td className="px-6 py-5 font-bold text-on-surface">{item?.description}</td>
                                        <td className="px-6 py-5 text-right">
                                            <div className="flex justify-start gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button 
                                                    className="p-2 hover:bg-surface-container rounded-lg text-secondary"
                                                    onClick={()=>setDataItem(item)}>
                                                    <span className="material-symbols-outlined">
                                                        <Pencil size={20}/>
                                                    </span>
                                                </button>
                                                <button 
                                                    className="p-2 hover:bg-error-container rounded-lg text-error"
                                                    onClick={()=>handleDelete(item)}>
                                                    <span className="material-symbols-outlined">
                                                        <Trash2 size={20}/>
                                                    </span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                                : 
                                <tr>
                                    <td className="px-6 py-4" colSpan={7}>
                                        Không có dữ liệu
                                    </td>
                                </tr>
                            }
                        </tbody>
                    </table>
                </div>
               
                {dataOfPage.length > 0 
                && <Paging currentPage={currentPage} setCurrentPage={setCurrentPage} totalPage={totalPages} resetFilter={resetFilter} itemsPerPage={itemsPerPage}/>}
            </div>
        </div>
    </>
}

export default ContentTypeTheater