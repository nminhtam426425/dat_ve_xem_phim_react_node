import {
    Calendar,
    Phone,
    Mail,
    FileBadge,
    File
}
from "lucide-react"
const FormUpdateInfo = ({setDataItem}) => {
    return <>
            <div className="space-y-6 modal-content" id="profile-form">
            <div className="grid grid-cols-1 gap-6">
            <div className="flex flex-col gap-2">
            <label className="text-label-bold text-on-surface-variant uppercase tracking-wider" for="fullname">Họ tên</label>
            <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary">
                <FileBadge size={20}/>
            </span>
            <input className="w-full pl-10 pr-4 py-3 bg-surface rounded-lg border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all duration-200 text-body-md" id="fullname" name="fullname" placeholder="Nhập họ và tên" type="text" value="Nguyễn Minh Quân"/>
            </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="flex flex-col gap-2">
                <label className="text-label-bold text-on-surface-variant uppercase tracking-wider" for="dob">Ngày sinh</label>
                <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary">
                    <Calendar size={20}/>
                </span>
                <input className="w-full pl-10 pr-4 py-3 bg-surface rounded-lg border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all duration-200 text-body-md" id="dob" name="dob" type="date" value="1995-05-15"/>
                </div>
                </div>

                <div className="flex flex-col gap-2">
                <label className="text-label-bold text-on-surface-variant uppercase tracking-wider" for="phone">Số điện thoại</label>
                <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary">
                    <Phone size={20}/>
                </span>
                <input className="w-full pl-10 pr-4 py-3 bg-surface rounded-lg border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all duration-200 text-body-md" id="phone" name="phone" placeholder="0123 456 789" type="tel" value="0988 123 456"/>
                </div>
                </div>
            </div>
           

            <div className="flex flex-col gap-2">
            <label className="text-label-bold text-on-surface-variant uppercase tracking-wider" for="email">Email</label>
            <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary">
                <Mail size={20}/>
            </span>
            <input className="w-full pl-10 pr-4 py-3 bg-surface rounded-lg border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all duration-200 text-body-md" id="email" name="email" placeholder="email@example.com" type="email" value="admin@cinereserve.com"/>
            </div>
            </div>
            </div>

            <div className="pt-6 border-t border-outline-variant/10 flex flex-col sm:flex-row justify-end gap-4">
            <button 
                className="px-8 py-3 rounded-lg border border-secondary text-secondary font-bold hover:bg-secondary-container transition-all active:scale-95" 
                type="button"
                onClick={ () => [setDataItem(null)]}>
                    Hủy bỏ
            </button>
            <button className="px-12 py-3 rounded-lg bg-primary-container text-on-primary font-bold shadow-lg hover:brightness-110 transition-all active:scale-95" type="submit">
                Lưu thay đổi
            </button>
            </div>
            </div>
    </>
}

export default FormUpdateInfo