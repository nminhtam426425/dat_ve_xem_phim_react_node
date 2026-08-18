import {Eye, EyeOff, Save} from "lucide-react"
import { useState } from "react"
import {customeFetch, apiUserService, handleInputOnChange} from "../../../config"
import {useLoading} from "../../../../LoadingContext"
import { toast } from "sonner"

const FormChangeChangePass = ({dataItem, setDataItem}) => {
    const {showLoading, hideLoading} = useLoading()
    const [showPassword, setShowPassword] = useState(false)
    const [notPassValid, setNotPassValid] = useState(true)
    const [authen, setAuthen] = useState({
        newPass: "",
        oldPass: ""
    })
    const [authenError, setAuthenError] = useState({
        newPass_0: "err",
        oldPass_0: "err"
    })

    const handleInputChange = (e) => {
        handleInputOnChange(e,setAuthen, setAuthenError, setNotPassValid, "formChangePass") 
        let {id, value} = e.target
        if((id == 'newPass' && value == authen.oldPass) || (id == 'oldPass' && value == authen.newPass)){
            setAuthenError(pre => {
                const nextErrors = {
                    ...pre,
                    'newPass_0': 'Mật khẩu mới không được trùng mật khẩu cũ'
                  }
                const isValid = Object.values(nextErrors).every(err => String(err || "").trim() === "")
                setNotPassValid(!isValid)
                return nextErrors
            })
        }
        else if(!value.includes(" ") && value.length > 7){
            if(id == 'newPass' && authen.oldPass.length > 7 && !authen.oldPass.includes(" ")){
                setAuthenError(pre => {
                    const nextErrors = {
                        ...pre,
                        'newPass_0': ''
                      }
                    const isValid = Object.values(nextErrors).every(err => String(err || "").trim() === "")
                    setNotPassValid(!isValid)
                    return nextErrors
                })
            }
            else if(id == 'oldPass' && authen.newPass.length > 7 && !authen.newPass.includes(" ")){
                setAuthenError(pre => {
                    const nextErrors = {
                        ...pre,
                        'newPass_0': ''
                      }
                    const isValid = Object.values(nextErrors).every(err => String(err || "").trim() === "")
                    setNotPassValid(!isValid)
                    return nextErrors
                })
            }
        }
    }

    const handleChangePassword = async (e) => {
        e.preventDefault()
        let dataForApi = {
            old_pass: authen.oldPass,
            new_pass: authen.newPass
        }
        if(dataForApi.old_pass == dataForApi.new_pass){
            toast.error("Mật khẩu mới không được trùng mật khẩu cũ")
            return
        }
        showLoading("Đang xử lý dữ liệu, vui lòng chờ !")
        try{
            const res = await customeFetch(apiUserService.baseURL+'/users/change-password','authen','POST',JSON.stringify(dataForApi))
            const data = await res.json()
            if(res.ok){
                toast.success(data.message)
                setAuthen({
                    newPass: "",
                    oldPass: ""
                })
                setAuthenError({
                    newPass_0: "err",
                    oldPass_0: "err"
                })
            }
            else
                toast.error(data.message)
            setDataItem(null)
        }
        catch(err){

        }
        hideLoading()
    }

    return <div className="modal" style={{display: dataItem ? 'flex' : 'none'}}>
        <div className="modal-content w-[300px] md:w-[500px] p-8">
            <form action="#" className="space-y-6" method="POST" onSubmit={handleChangePassword}>
                <div className="space-y-2">
                    <label className="font-label-bold text-label-bold text-on-surface-variant" htmlFor="oldPass">
                    Mật khẩu cũ
                    <p  className={`text-primary ${authenError.oldPass_0 == 'err' ? 'text-[0px]' : 'text-[9px]'}`}>{authenError.oldPass_0}</p>
                    </label>
                    <div className="relative flex items-center">
                        <span className="material-symbols-outlined absolute left-3 text-secondary" data-icon="lock"></span>
                        <input 
                            className="w-full pl-4 pr-4 py-3 bg-white border border-outline rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-body-md text-on-surface" 
                            id="oldPass" 
                            type={showPassword ? "text" : "password"}
                            value={authen.oldPass}
                            onChange={handleInputChange}
                            required
                        />
                        <span
                            className="absolute right-3 text-secondary cursor-pointer hover:text-on-surface"
                            onClick={()=>setShowPassword(pre => !pre)} 
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />} 
                        </span>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="font-label-bold text-label-bold text-on-surface-variant" htmlFor="newPass">
                        Mật khẩu mới
                        <p id="title_01"  className={`text-primary ${authenError.newPass_0 == 'err' ? 'text-[0px]' : 'text-[9px]'}`}>{authenError.newPass_0}</p>
                    </label>

                    <div className="relative flex items-center">
                        <span className="material-symbols-outlined absolute left-3 text-secondary" data-icon="lock"></span>
                        <input 
                            className="w-full pl-4 pr-4 py-3 bg-white border border-outline rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-body-md text-on-surface" 
                            id="newPass" 
                            type={showPassword ? "text" : "password"}
                            value={authen.newPass}
                            onChange={handleInputChange}
                            required
                        />
                        <span
                            className="absolute right-3 text-secondary cursor-pointer hover:text-on-surface"
                            onClick={()=>setShowPassword(pre => !pre)} 
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />} 
                        </span>
                    </div>
                </div>

                <div className="pt-8 border-t border-outline-variant/30 flex items-center justify-end gap-4">
                    <button 
                        className="px-8 py-3 rounded-lg border border-outline text-secondary font-label-bold hover:bg-surface-container-high hover:text-on-surface transition-all active:scale-95" 
                        type="button"
                        onClick={()=>setDataItem(null)}>
                        Hủy bỏ
                    </button>
                    <button 
                        className={`px-10 py-3 rounded-lg bg-primary-container text-on-primary font-label-bold shadow-lg shadow-primary-container/30  flex items-center gap-2
                            ${notPassValid ? 'cursor-not-allowed opacity-60' : 'hover:bg-primary transition-all cursor-pointer active:scale-95'}`} 
                        type="submit"
                        disabled={notPassValid}>
                        <span className="material-symbols-outlined text-lg">
                            <Save size={20}/>
                        </span>
                                Lưu thông tin
                    </button>
                </div>
            </form>
        </div>
    </div>
}

export default FormChangeChangePass