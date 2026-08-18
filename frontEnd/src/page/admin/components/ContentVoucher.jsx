import { useState, useMemo } from "react"
import {CircleCheck, Ticket, Plus, History, Percent, Pencil, Trash2, CreditCard, ChevronDown} from "lucide-react"
import { formatVND2, formatDate } from "../../validate"
import Paging from "./Paging"

const ContentVoucher = ({setDataItem, datas, setConfirm, setDataItemBeforeConfirm}) => {  
    const itemsPerPage = 5
    
    const [currentPage, setCurrentPage] = useState(1)
    const [typeVoucher, setTypeVoucher] = useState('all')
    const [freeVoucher, setFreeVoucher] = useState(-1)
    const filteredData  = useMemo(()=>{
        return datas.filter((voucher) => {
            let isMatchType = voucher.discount_type == typeVoucher || typeVoucher == 'all'
            // vì dựa vào point_cost chưa đủ để render nên mới cần 3 điều kiện nếu muốn render đúng render dổi thưởng hoặc miễn phí
            let isRewardPoints = (voucher.point_cost == 0 && (freeVoucher == 0 || freeVoucher == 2)) || (voucher.point_cost != 0  && freeVoucher == 1) || freeVoucher == -1

            // hết hạn: nếu là dùng chung thì dựa vào expired date (point_cost == 0 và today - expired > 0 freeVoucher - trạng thái chọn bằng 0 hoặc 2), nếu > 0 thì đổi thưởng không hết hạn
            let isExpired = false

            if (voucher.point_cost === 0) {
                if (freeVoucher == 2) 
                    // lấy voucher đã hết hạn
                    isExpired = new Date() > new Date(voucher.expiry_date)
                else if (freeVoucher == 0) 
                    // lấy voucher còn hạn
                    isExpired = new Date() < new Date(voucher.expiry_date)
                else 
                    isExpired = true
            } 
            else 
                isExpired = true
            
            return isMatchType && isExpired && isRewardPoints
        })
       
    },[datas, typeVoucher, freeVoucher])

    const totalPages = Math.ceil(filteredData.length / itemsPerPage)

    const dataOfPage = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage
        const endIndex = startIndex + itemsPerPage
    
        return filteredData.slice(startIndex,endIndex)

    }, [filteredData,currentPage,itemsPerPage])

    const changeTypeVoucher = (type) => {
        setTypeVoucher(type)
        setCurrentPage(1)
    }

    const handDelete = (item) => {
        setDataItemBeforeConfirm(item)
        setConfirm(true)
    }

    const changeSelect = (e) => {
        const value = e.target.value
        setFreeVoucher(value)
    }

    const resetFilter = () => {
        setTypeVoucher('all')
        setFreeVoucher(-1)
    }
    if(freeVoucher == 2){
        console.log(dataOfPage)
    }

    return <>
        <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                <div>
                    <h2 className="text-headline-lg font-black text-on-surface tracking-tight">Quản lý Voucher</h2>
                    <p className="text-secondary mt-1">Quản lý các chương trình khuyến mãi và mã giảm giá toàn hệ thống.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="glass-card p-6 rounded-xl flex items-center gap-5 group">
                    <div className="w-14 h-14 rounded-2xl bg-secondary-container/30 flex items-center justify-center text-secondary group-hover:bg-secondary-container transition-colors">
                        <span className="material-symbols-outlined text-3xl">
                            <Ticket size={20}/>
                        </span>
                    </div>

                    <div>
                        <p className="text-secondary text-sm font-medium">Tổng Voucher</p>
                        <p className="text-3xl font-black text-on-surface">{datas?.length || 0}</p>
                    </div>
                </div>

                <div className="glass-card p-6 rounded-xl border-l-4 border-l-primary flex items-center gap-5 group">
                    <div className="w-14 h-14 rounded-2xl bg-primary-container/10 flex items-center justify-center text-primary group-hover:bg-primary-container/20 transition-colors">
                        <span className="material-symbols-outlined text-3xl">
                            <CircleCheck size={20}/>
                        </span>
                    </div>

                    <div>
                        <p className="text-secondary text-sm font-medium">Còn hạn</p>
                        <p className="text-3xl font-black text-on-surface">{datas?.filter(item => (new Date() - new Date(item.expiry_date)) < 0 || item.point_cost > 0).length || 0}</p>
                    </div>
                </div>

                <div className="glass-card p-6 rounded-xl flex items-center gap-5 group">
                    <div className="w-14 h-14 rounded-2xl bg-surface-container-highest flex items-center justify-center text-secondary group-hover:bg-surface-variant transition-colors">
                        <span className="material-symbols-outlined text-3xl">
                            <History size={20}/>
                        </span>
                    </div>

                    <div>
                        <p className="text-secondary text-sm font-medium">Đã Hết Hạn</p>
                        <p className="text-3xl font-black text-on-surface">{datas?.filter(item => (new Date() - new Date(item.expiry_date)) > 0 && item.point_cost == 0).length || 0}</p>
                    </div>
                </div>
            </div>

            <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant overflow-hidden shadow-sm">
                <div className="p-6 border-b border-outline-variant flex items-center gap-2 justify-between">
                    <div className="flex">
                        <div className="flex gap-2">
                            <button 
                                onClick={()=>changeTypeVoucher('all')}
                                className={`px-4 py-2 rounded-full text-sm ${typeVoucher == 'all' ? 'bg-primary text-on-primary font-bold' : 'hover:bg-surface-container text-secondary font-medium'}`}>
                                    Tất cả
                            </button>

                            <button 
                                onClick={()=>changeTypeVoucher('fixed_amount')}
                                className={`px-4 py-2 rounded-full text-sm ${typeVoucher == 'fixed_amount' ? 'bg-primary text-on-primary font-bold' : 'hover:bg-surface-container text-secondary font-medium'}`}>
                                    Cố định (đ)
                            </button>

                            <button 
                                onClick={()=>changeTypeVoucher('percentage')}
                                className={`px-4 py-2 rounded-full text-sm ${typeVoucher == 'percentage' ? 'bg-primary text-on-primary font-bold' : 'hover:bg-surface-container text-secondary font-medium'}`}>
                                    Phần trăm (%)
                            </button>
                        </div>

                        <div className="relative min-w-[180px]">
                            <select 
                                value={freeVoucher}
                                onChange={changeSelect}
                                className="w-full appearance-none px-4 py-2.5 bg-surface-container-low border border-outline-variant/50 rounded-lg focus:ring-2 focus:ring-primary outline-none text-label-bold cursor-pointer pr-10"
                                >
                                <option value={-1}>Tất cả thể loại</option>
                                <option value={0}>Dùng chung</option>
                                <option value={1}>Đổi thưởng</option>
                                <option value={2}>Hết hạn</option>
                            </select>
                            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-secondary" data-icon="expand_more">
                                <ChevronDown size={20} />
                            </span>
                        </div>
                    </div>

                    <button 
                        className="bg-primary hover:bg-primary-container text-white px-6 py-3 rounded-lg font-label-bold flex items-center gap-2 transition-all active:scale-95 shadow-lg shadow-primary/20"
                        onClick={()=>setDataItem({})}>
                        <span className="material-symbols-outlined">
                            <Plus size={20}/>
                        </span>Tạo Voucher mới
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-surface-container-low text-secondary text-xs uppercase tracking-wider font-bold">
                            <tr>
                                <th className="px-6 py-4">Mã Voucher</th>
                                <th className="px-6 py-4">Loại Giảm Giá</th>
                                <th className="px-6 py-4">Giá Trị</th>
                                <th className="px-6 py-4">Đơn Hàng Tối Thiểu</th>
                                {
                                    (freeVoucher==0 || freeVoucher == 2)
                                    && (<th className="px-6 py-4">Ngày Hết Hạn</th>)
                                }
                                <th className="px-6 py-4">Đã dùng</th>
                                <th className="px-6 py-4 text-right">Thao Tác</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-outline-variant">
                            {
                                dataOfPage.length > 0 
                                ?
                                dataOfPage?.map( item => {
                                    let usage = Math.ceil((item?.remain_usage/item?.usage_limit)*100)
                                    return <tr key={item.id} className="hover:bg-surface-container-low/50 transition-colors group">
                                            <td className="px-6 py-5 font-bold text-on-surface">{item?.code}</td>
                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-2">
                                                    <span className={`w-8 h-8 rounded-lg flex items-center justify-center ${item.discount_type == 'percentage' ? 'bg-blue-100 text-blue-600' : ' bg-orange-100 text-orange-600'}`}>
                                                    <span className="material-symbols-outlined text-lg">
                                                        {item.discount_type == 'percentage' ? <Percent size={20}/> : <CreditCard size={20}/>}
                                                    </span>
                                                    </span>
                                                    <span className="text-sm">{item.discount_type == 'percentage' ? 'Phần trăm' : 'Cố định'}</span>
                                                </div>
                                            </td>
                                            <td className={`px-6 py-5 font-bold ${item.usage === 100 ? 'text-secondary line-through' : 'text-primary'}`}>
                                                {item.discount_type == 'percentage' ? item.discount + '%' : formatVND2(item.discount)}
                                            </td>
                                            <td className="px-6 py-5 text-secondary">{formatVND2(item?.min_order_value)}</td>
                                            
                                            {
                                               (freeVoucher==0 || freeVoucher == 2)
                                                &&(<td className="px-6 py-5 text-secondary">{formatDate(item?.expiry_date)}</td>)
                                            }
                                            
                                            <td className="px-6 py-5">
                                                <span 
                                                className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-tight ${usage === 100 ? 'bg-surface-container-highest text-secondary' : 'bg-green-100 text-green-700'}`}>
                                                    {item?.remain_usage == 0 ? 0 : usage}%
                                                </span>
                                            </td>
                                            <td className="px-6 py-5 text-right">
                                                <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button 
                                                        className="p-2 hover:bg-surface-container rounded-lg text-secondary"
                                                        onClick={()=>setDataItem(item)}>
                                                        <span className="material-symbols-outlined">
                                                            <Pencil size={20}/>
                                                        </span>
                                                    </button>
                                                    <button 
                                                        className="p-2 hover:bg-error-container rounded-lg text-error"
                                                        onClick={()=>handDelete(item)}>
                                                        <span className="material-symbols-outlined">
                                                            <Trash2 size={20}/>
                                                        </span>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    }
                                   
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

export default ContentVoucher