import {Search, Plus, ChevronDown, Pencil, Trash2, PlayCircle, Calendar, History
}
from 'lucide-react'
import {formatDate} from '../../validate.js' 
import { useMemo, useState } from 'react'
import Paging from './Paging.jsx'

const removeVietnameseTones = (str) => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") 
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D")
      .toLowerCase();
}

const changeStatus = (status) => {
    const temp = {
        showing: 'Đang chiếu',
        coming_soon: 'Sắp chiếu',
        ending: 'Kết thúc'
    }
    return temp[status]
}

// chỉ áp dụng cho mảng object
// datas: mảng cần duyệt 
// key: key của giá trị cần đếm
// value: giá trị cần đếm
const countByCondition = (datas, key, value) => {
    if (!datas) return 0
    
    return datas.filter(item => item[key] === value).length
};

const ContentMovieManager = ({datas, setDataItem, itemsPerPage, setCurrentPage, currentPage, setConfirm, categories, setDataItemBeforeConfirm}) => {
    const [selectedCategory, setSelectedCategory] = useState(0)
    const [statusSelected, setStatusSelected] = useState('all')
    const [searchKeyword, setSearchKeyword] = useState('')
    

    const filteredData  = useMemo(()=>{
        return datas.filter((movie) => {
            const matchCategory = Number(selectedCategory) === 0 || movie.Categories.some((c) => c.id === Number(selectedCategory))
    
            const matchStatus = statusSelected === 'all' || movie.status === statusSelected
    
            const keyword = removeVietnameseTones(searchKeyword.trim());
            const matchSearch = keyword === "" || removeVietnameseTones(movie.title).includes(keyword)
    
            return matchCategory && matchStatus && matchSearch
        })
       
    },[selectedCategory, statusSelected, searchKeyword, datas])

    const totalPages = Math.ceil(filteredData.length / itemsPerPage)

    const dataOfPage = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage
        const endIndex = startIndex + itemsPerPage
    
        return filteredData.slice(startIndex,endIndex)

    }, [filteredData,currentPage,itemsPerPage])


    const resetFilter = () => {
        setSearchKeyword("")
        setStatusSelected("all")
        setSelectedCategory(0)
    }

    const handleChangeCategory = (e) => {
        setCurrentPage(1)
        setSelectedCategory(Number(e.target.value))
    }

    const handleSearch = (e) => {
        setCurrentPage(1)
        setSearchKeyword(e.target.value)
    }

    const handleButtonStatus = (status) => {
        setCurrentPage(1)
        setStatusSelected(status)
    }

    const handleDelete = (item) => {
        setDataItemBeforeConfirm(item)
        setConfirm(true)
    }

    return <div className="p-gutter max-w-container-max mx-auto w-full">
         <section className=" grid grid-cols-1 md:grid-cols-4 gap-gutter mb-2">
            <div className="bg-white p-6 rounded-xl border border-outline-variant/20 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                    <span className="p-2 bg-primary-container/10 rounded-lg text-primary">
                        <span className="material-symbols-outlined" data-icon="movie">
                            <Trash2 size={20} />
                        </span>
                    </span>
                </div>
                <div className="text-2xl font-black text-on-surface">{countByCondition(datas, 'status', 'showing') + countByCondition(datas, 'status', 'coming_soon')}</div>
                <div className="text-secondary text-sm font-label-bold">Tổng số phim</div>
            </div>
            <div className="bg-white p-6 rounded-xl border border-outline-variant/20 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                    <span className="p-2 bg-green-100 rounded-lg text-green-700">
                    <span className="material-symbols-outlined" data-icon="play_circle">
                        <PlayCircle size={20} />
                    </span>
                    </span>
                </div>
                <div className="text-2xl font-black text-on-surface">{countByCondition(datas, 'status', 'showing')}</div>
                <div className="text-secondary text-sm font-label-bold">Đang công chiếu</div>
            </div>
            <div className="bg-white p-6 rounded-xl border border-outline-variant/20 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                    <span className="p-2 bg-amber-100 rounded-lg text-amber-700">
                        <span className="material-symbols-outlined" data-icon="schedule">
                            <Calendar size={20} />
                        </span>
                    </span>
                </div>
                <div className="text-2xl font-black text-on-surface">{countByCondition(datas, 'status', 'coming_soon')}</div>
                <div className="text-secondary text-sm font-label-bold">Dự kiến khởi chiếu</div>
            </div>
            <div className="bg-white p-6 rounded-xl border border-outline-variant/20 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                    <span className="p-2 bg-surface-container-high rounded-lg text-on-surface-variant">
                        <span className="material-symbols-outlined" data-icon="history">
                            <History size={20} />
                        </span>
                    </span>
                </div>
                <div className="text-2xl font-black text-on-surface">{datas.length}</div>
                <div className="text-secondary text-sm font-label-bold">Phim đã lưu trữ</div>
            </div>
        </section>

        <section className="mb-base flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl shadow-sm border border-outline-variant/20">
            <div className="flex flex-1 flex-wrap gap-4 items-center">
                
                <div className="relative min-w-[300px] flex-1">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary" data-icon="search">
                        <Search size={20} />
                    </span>
                    <input 
                        className="w-full pl-10 pr-4 py-2.5 bg-surface-container-low border border-outline-variant/50 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all text-body-md outline-none" 
                        placeholder="Tìm kiếm tên phim..." 
                        type="text"
                        onChange={handleSearch}/>
                </div>

                <div className="relative min-w-[180px]">
                    <select 
                        className="w-full appearance-none px-4 py-2.5 bg-surface-container-low border border-outline-variant/50 rounded-lg focus:ring-2 focus:ring-primary outline-none text-label-bold cursor-pointer pr-10"
                        onChange={handleChangeCategory}
                        value={selectedCategory}>
                        <option value={0}>Tất cả thể loại</option>
                        {
                            categories.map(item => <option key={item.id} value={item.id} >{item.name}</option>)
                        }
                    </select>
                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-secondary" data-icon="expand_more">
                        <ChevronDown size={20} />
                    </span>
                </div>

                <div className="flex bg-surface-container-low p-1 rounded-lg border border-outline-variant/30">
                    <button 
                        className={`px-4 py-1.5 rounded-md text-label-bold ${statusSelected==='all' ? 'bg-white shadow-sm text-primary': 'text-secondary hover:bg-white/50 transition-all'}`}
                        onClick={() => handleButtonStatus('all')}>
                            Tất cả
                    </button>
                    <button 
                        className={`px-4 py-1.5 rounded-md text-label-bold ${statusSelected==='showing' ? 'bg-white shadow-sm text-primary': 'text-secondary hover:bg-white/50 transition-all'}`}
                        onClick={() => handleButtonStatus('showing')}>
                            Đang chiếu
                    </button>
                    <button 
                        className={`px-4 py-1.5 rounded-md text-label-bold ${statusSelected==='coming_soon' ? 'bg-white shadow-sm text-primary': 'text-secondary hover:bg-white/50 transition-all'}`}
                        onClick={() => handleButtonStatus('coming_soon')}>
                            Sắp chiếu
                    </button>
                </div>
            </div>

            <button 
                className="flex items-center gap-2 bg-primary-container text-white px-6 py-3 rounded-lg font-label-bold text-label-bold shadow-lg shadow-primary-container/20 hover:scale-[1.02] active:scale-95 transition-all"
                onClick={() => setDataItem({})}>
                <span className="material-symbols-outlined" data-icon="add">
                    <Plus size={20} />
                </span>
                    Thêm phim mới
            </button>
        </section>

        <div className="bg-white rounded-xl shadow-md border border-outline-variant/20 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-surface-container-low">
                        <tr>
                            <th className="px-6 py-4 font-label-bold text-secondary-fixed-dim uppercase text-[11px] tracking-widest border-b border-outline-variant/30">Phim</th>
                            <th className="px-6 py-4 font-label-bold text-secondary-fixed-dim uppercase text-[11px] tracking-widest border-b border-outline-variant/30">Thể loại</th>
                            <th className="px-6 py-4 font-label-bold text-secondary-fixed-dim uppercase text-[11px] tracking-widest border-b border-outline-variant/30">Thời lượng</th>
                            <th className="px-6 py-4 font-label-bold text-secondary-fixed-dim uppercase text-[11px] tracking-widest border-b border-outline-variant/30 text-center">Trạng thái</th>
                            <th className="px-6 py-4 font-label-bold text-secondary-fixed-dim uppercase text-[11px] tracking-widest border-b border-outline-variant/30 text-right">Thao tác</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-outline-variant/20">
                        {
                            dataOfPage?.length > 0 ? (
                                dataOfPage?.map( (item, index) => 
                                <tr className="hover:bg-surface-container-lowest transition-colors group" key={index}>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-16 rounded-md overflow-hidden shadow-sm bg-surface-container">
                                                <img className="w-full h-full object-cover" src={item?.poster_url}/>
                                            </div>
                                            <div>
                                                <div className="font-label-bold text-on-surface text-base">{item.title}</div>
                                                <div className="text-secondary text-xs">Phát hành:{formatDate(item?.release_date)}</div>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-6 py-4">
                                        <span className="text-body-md text-on-surface-variant">{item?.Categories.map(item => item?.name).join(', ')}</span>
                                    </td>

                                    <td className="px-6 py-4">
                                        <span className="text-body-md text-on-surface-variant">{item?.duration} phút</span>
                                    </td>

                                    <td className="px-6 py-4 text-center">
                                        <span 
                                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider 
                                                ${item.status=='showing' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}
                                            >{changeStatus(item.status)}
                                        </span>
                                    </td>

                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button className="p-2 rounded-lg hover:bg-surface-container transition-all text-tertiary" 
                                                title="Sửa"
                                                onClick={()=>setDataItem(item)}>
                                                <span className="material-symbols-outlined text-[20px]" data-icon="edit">
                                                    <Pencil size={20} />
                                                </span>
                                            </button>
                                            <button 
                                                className="p-2 rounded-lg hover:bg-error-container hover:text-error transition-all text-tertiary" 
                                                title="Xóa"
                                                onClick={()=>handleDelete(item)}>
                                                <span className="material-symbols-outlined text-[20px]" data-icon="delete">
                                                    <Trash2 size={20} />
                                                </span>
                                            </button>
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

            {/*paging*/}
            {dataOfPage.length > 0 
            && <Paging currentPage={currentPage} setCurrentPage={setCurrentPage} totalPage={totalPages} resetFilter={resetFilter} itemsPerPage={itemsPerPage}/>}
        </div>
    </div>
}

export default ContentMovieManager