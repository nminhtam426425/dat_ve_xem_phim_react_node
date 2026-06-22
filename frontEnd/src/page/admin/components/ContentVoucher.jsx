import {CircleCheck, Ticket, Plus, History, ListFilterPlus, Percent, Pencil, Trash2, CreditCard} from "lucide-react"
import { formatVND2, formatDate } from "../../validate"
import Paging from "./Paging"

const ContentVoucher = ({setDataItem, datas, setConfirm, setDataItemBeforeConfirm}) => {  
    const handDelete = (item) => {
        setDataItemBeforeConfirm(item)
        setConfirm(true)
    }
    return <>
        <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                <div>
                    <h2 className="text-headline-lg font-black text-on-surface tracking-tight">Quản lý Voucher</h2>
                    <p className="text-secondary mt-1">Quản lý các chương trình khuyến mãi và mã giảm giá toàn hệ thống.</p>
                </div>

                <button 
                    className="bg-primary hover:bg-primary-container text-white px-6 py-3 rounded-lg font-label-bold flex items-center gap-2 transition-all active:scale-95 shadow-lg shadow-primary/20"
                    onClick={()=>setDataItem({})}>
                    <span className="material-symbols-outlined">
                        <Plus size={20}/>
                    </span>Tạo Voucher mới
                </button>
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
                        <p className="text-3xl font-black text-on-surface">{datas?.filter(item => (new Date() - new Date(item.expiry_date)) < 0).length || 0}</p>
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
                        <p className="text-3xl font-black text-on-surface">{datas?.filter(item => (new Date() - new Date(item.expiry_date)) > 0).length || 0}</p>
                    </div>
                </div>
            </div>

            <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant overflow-hidden shadow-sm">
                <div className="p-6 border-b border-outline-variant flex items-center justify-between">
                    <div className="flex gap-2">
                        <button className="px-4 py-2 rounded-full bg-primary text-on-primary text-sm font-bold">Tất cả</button>
                        <button className="px-4 py-2 rounded-full hover:bg-surface-container text-secondary text-sm font-medium">Cố định (đ)</button>
                        <button className="px-4 py-2 rounded-full hover:bg-surface-container text-secondary text-sm font-medium">Phần trăm (%)</button>
                    </div>

                    {/* <button className="text-secondary flex items-center gap-2 hover:text-on-surface transition-colors">
                        <span className="material-symbols-outlined text-xl">
                            <ListFilterPlus size={20}/>
                        </span>
                        <span className="text-sm font-medium">Lọc danh sách</span>
                    </button> */}
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-surface-container-low text-secondary text-xs uppercase tracking-wider font-bold">
                            <tr>
                                <th className="px-6 py-4">Mã Voucher</th>
                                <th className="px-6 py-4">Loại Giảm Giá</th>
                                <th className="px-6 py-4">Giá Trị</th>
                                <th className="px-6 py-4">Đơn Hàng Tối Thiểu</th>
                                <th className="px-6 py-4">Ngày Hết Hạn</th>
                                <th className="px-6 py-4">Đã dùng</th>
                                <th className="px-6 py-4 text-right">Thao Tác</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-outline-variant">
                            {
                                datas?.map( item => 
                                    <tr key={item.id} className="hover:bg-surface-container-low/50 transition-colors group">
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
                                        <td className="px-6 py-5 text-secondary">{formatDate(item?.expiry_date)}</td>
                                        <td className="px-6 py-5">
                                            <span 
                                            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-tight ${item?.usage === 100 ? 'bg-surface-container-highest text-secondary' : 'bg-green-100 text-green-700'}`}>
                                                {Math.ceil(item?.remain_usage/item?.usage_limit)}%
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
                                )
                            }
                        </tbody>
                    </table>
                </div>
               
                {datas.length > 0 && <Paging currentPage={1} setCurrentPage={1} totalPage={1} />}
            </div>
        </div>
    </>
}

export default ContentVoucher