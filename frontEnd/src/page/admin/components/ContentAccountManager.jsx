import {
    ListFilter,
    ChevronLeft,
    ChevronRight,
    Plus,
    Pencil,
    Trash2,
    Lock,
    LockOpen
}
from "lucide-react"
import { formatDate, formatPhone, uppercaseFirstLetter } from "../../validate.js"
import { useEffect, useState } from "react"

const ContentAccountManager = ({datas, setDataItem, dataRender, setDataRender}) => {
    const [roleForRender, setRoleForRender] = useState('staff')

    useEffect(()=>{
        const filtered = datas.filter((account) =>
            account.role == roleForRender
        )
        setDataRender(filtered)
    },[roleForRender])

    return <div className="p-gutter mx-auto space-y-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/20 shadow-sm flex flex-col gap-2">
                <span className="text-secondary font-label-bold text-label-sm">Tổng tài khoản</span>
                <div className="flex items-end gap-2">
                    <span className="text-3xl font-bold text-on-surface">1,284</span>
                </div>
            </div>

            <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/20 shadow-sm flex flex-col gap-2">
                <span className="text-secondary font-label-bold text-label-sm">Nhân viên</span>
                <div className="flex items-end gap-2">
                    <span className="text-3xl font-bold text-on-surface">42</span>
                </div>
            </div>

            <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/20 shadow-sm flex flex-col gap-2">
                <span className="text-secondary font-label-bold text-label-sm">Khách hàng mới (Tháng)</span>
                <div className="flex items-end gap-2">
                    <span className="text-3xl font-bold text-on-surface">156</span>
                </div>
            </div>

            <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/20 shadow-sm flex flex-col gap-2">
                <span className="text-secondary font-label-bold text-label-sm">Tài khoản Active</span>
                <div className="flex items-end gap-2">
                    <span className="text-3xl font-bold text-on-surface">892</span>
                    <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider mb-1">High</span>
                </div>
            </div>
        </div>

        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/30 shadow-md overflow-hidden w-full">
            <div className="p-6 border-b border-outline-variant/20 flex justify-between items-center bg-surface-container-low/30">
                <div className="flex items-center gap-4">
                    <button className="bg-primary text-white px-6 py-2.5 rounded-xl font-label-bold text-sm flex items-center gap-2 hover:opacity-90 active:scale-95 transition-all shadow-lg shadow-primary/20">
                        <span className="material-symbols-outlined text-sm">
                            <Plus size={20}/>
                        </span>
                                                    Thêm tài khoản mới
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
                </div>

                <button className="p-2 text-secondary hover:bg-surface-container border border-outline-variant/30 rounded-lg transition-all">
                    <span className="material-symbols-outlined">
                        <ListFilter size={20}/>
                    </span>
                </button>
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
                            dataRender.length > 0 
                            ? 
                            (
                                dataRender.map( (item, index) =>  
                                <tr className="hover:bg-surface-container-lowest/50 transition-colors group" key={index}>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-full overflow-hidden border border-outline-variant/30">
                                                <img alt="User" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBh30dgNbRizJia0SSeJcCzZsuSq4v4sQLaDy8iD-BOHnk9dzHEhZJ3QMIYAVEjE0DYWY7lBt3MeZS7MGbbG_SGiDQIrfnVN-khsB7AGr_3Sn2fRo_hHqzzGpcVSniDdJe0OJTo8v6qGbQJvba5lCGij8Gz4daORpzQoftWWItWqP5EaiSW8JWiP2bLr3CA_JPAel80VaIgQENtHsHSEIlxZNQXusaztynhuFPC5ZVoQTlQaZGC3UwnImcrCCmHez-y0h14wbgabXg"/>
                                            </div>
                                            <div>
                                                <div className="font-bold text-on-surface">{item.name}</div>
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
                                    
                                    <td className="px-6 py-4 text-on-surface-variant text-sm">{formatDate(item.create_at)}</td>
                                    
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button 
                                                className={`p-1.5 rounded text-secondary ${item.is_activating ? 'hover:bg-error-container' : 'text-primary hover:bg-yellow-100'} transition-colors`}>
                                                <span className="material-symbols-outlined text-[20px]">
                                                { item.is_activating ? <Lock size={20}/> : <LockOpen size={20}/> }</span>
                                            </button>
                                            <button className="p-1.5 rounded text-secondary hover:text-primary transition-colors hover:bg-yellow-100">
                                                <span className="material-symbols-outlined text-[20px]">
                                                <Pencil size={20}/></span>
                                            </button>
                                            <button className="p-1.5 rounded text-secondary hover:text-error transition-colors hover:bg-error-container">
                                                <span className="material-symbols-outlined text-[20px]">
                                                <Trash2 size={20}/></span>
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

            {/* paging */}
            <div className="p-6 bg-surface-container-low/30 border-t border-outline-variant/20 flex justify-between items-center">
                <span className="text-sm text-secondary font-label-bold">Hiển thị 1 - 4 của 1,284 tài khoản</span>
                <div className="flex items-center gap-2">
                    <button className="p-2 border border-outline-variant/50 rounded-lg text-secondary hover:bg-surface-container-high transition-all disabled:opacity-30" disabled="">
                        <span className="material-symbols-outlined">
                            <ChevronLeft size={20}/>
                        </span>
                    </button>

                    <button className="w-10 h-10 bg-primary text-white rounded-lg font-bold text-sm">1</button>
                   
                    <button className="w-10 h-10 hover:bg-surface-container-high rounded-lg font-bold text-sm">2</button>
                   
                    <button className="w-10 h-10 hover:bg-surface-container-high rounded-lg font-bold text-sm">3</button>
                   
                    <span className="px-2 text-secondary">...</span>
                    
                    <button className="w-10 h-10 hover:bg-surface-container-high rounded-lg font-bold text-sm">321</button>
                   
                    <button className="p-2 border border-outline-variant/50 rounded-lg text-secondary hover:bg-surface-container-high transition-all">
                        <span className="material-symbols-outlined">
                            <ChevronRight size={20}/>
                        </span>
                    </button>
                </div>
            </div>
        </div>
    
    </div>
}

export default ContentAccountManager