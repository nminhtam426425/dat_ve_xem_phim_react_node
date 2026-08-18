import { useState } from "react"
import {Eye, EyeOff} from "lucide-react"
import { toast } from 'sonner'
import { customeFetch,apiUserService, handleInputOnChange, handleAddData } from '../../../config'

const FormAddStaff = ({setDataItem, setDatas}) => {
    const [notPassValid, setNotPassValid] = useState(true)
    const [showPassword,setShowPassword] = useState(true)

    const [register,setRegister] = useState({
        username:"",
        password:"12345678",
        fullname:"",
        email: ""
    })

    const [registerError,setRegisterError] = useState({
        username_0:"err",
        password_0:"",
        fullname_0:"err",
        email_0:"err"
    })

    const handleInputChange = (e) => {
        handleInputOnChange(e, setRegister, setRegisterError, setNotPassValid, "formRegister")    
    }

    const handleRegister = () => {
        const registerBE = async () => {
          try{
            let dataForApi = {
                fullname: register.fullname,
                username: register.username,
                password: register.password,
                email: register.email
            }
            const res = await customeFetch(apiUserService.baseURL+'/users/staff','authen','POST',JSON.stringify(dataForApi))
            if(res.ok){
                const data = await res.json()
                data.is_activating = 1
                data.created_at = new Date()
                handleAddData(setDatas,data)
                setDataItem(null)
                setRegister({
                    username:"",
                    password:"12345678",
                    fullname:"",
                    email: ""
                })
                setRegisterError({
                    username_0:"err",
                    password_0:"",
                    fullname_0:"err",
                    email_0:"err"
                })
                toast.success("Đã tạo mới tài khoản!")
            }
            else{
                const data = await res.json()
                toast.error(data.message)
            }
           
          }
          catch(err){
            console.log(err)
            toast.error("Đăng ký thất bại !")
          }
        }
        registerBE()
    }

    const closeModal = (e) => {
        setDataItem(null)
    }

    return <>
         <div className="rounded-xl modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <div className="space-y-8 min-w-[300px] w-[600px]">
                <div className="backdrop-blur-2xl p-4 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.06)] w-full">
                    <div className="space-y-2">
                        <div className="space-y-2 gap-4">
                            <label className="font-label-bold text-on-surface ml-1" htmlFor='email'>
                                Email
                                <p id="fullname_0" className={`text-primary ${registerError.email_0 == 'err' ? 'text-[0px]' : 'text-[9px]'}`}>{registerError.email_0}</p>
                            </label>
                            <div className="relative">
                                <input 
                                    className="w-full pl-4 pr-4 py-4 bg-white border border-secondary/20 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all font-body-md" 
                                    placeholder="" 
                                    id="email"
                                    value={register.email}
                                    onChange={handleInputChange}
                                    max={100}
                                    type="text"/>
                            </div>
                        </div>

                        <div className="space-y-2 gap-4">
                            <label className="font-label-bold text-on-surface ml-1" htmlFor='fullname'>
                                Họ và tên
                                <p id="fullname_0" className={`text-primary ${registerError.fullname_0 == 'err' ? 'text-[0px]' : 'text-[9px]'}`}>{registerError.fullname_0}</p>
                            </label>
                            <div className="relative">
                                <input 
                                    className="w-full pl-4 pr-4 py-4 bg-white border border-secondary/20 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all font-body-md" 
                                    placeholder="" 
                                    id="fullname"
                                    value={register.fullname}
                                    onChange={handleInputChange}
                                    max={100}
                                    type="text"/>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="font-label-bold text-on-surface ml-1" htmlFor='username'>
                                Tên đăng nhập
                                <p id="username_0" className={`text-primary ${registerError.username_0 == 'err' ? 'text-[0px]' : 'text-[9px]'}`} >{registerError.username_0}</p>
                            </label>
                            <div className="relative">
                                <input 
                                    className="w-full pl-4 pr-4 py-4 bg-white border border-secondary/20 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all font-body-md" 
                                    placeholder="" 
                                    id="username"
                                    value={register.username}
                                    onChange={handleInputChange}
                                    max={50}
                                    type="text"/>
                            </div>
                        </div>
                        
                        <div className="space-y-2">
                            <label className="font-label-bold text-on-surface ml-1" htmlFor="password">
                                Mật khẩu
                                <p id="password_0"  className={`text-primary ${registerError.password_0 == 'err' ? 'text-[0px]' : 'text-[9px]'}`}>{registerError.password_0}</p>
                            </label>
                            <div className="relative">
                                <input 
                                    className="w-full pl-4 pr-4 py-4 bg-white border border-secondary/20 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all font-body-md" 
                                    placeholder="" 
                                    id="password"
                                    value={register.password}
                                    onChange={handleInputChange}
                                    type={showPassword ? "text" : "password"}/>
                                    <span
                                        className="absolute right-3 top-1/3 text-secondary cursor-pointer hover:text-on-surface"
                                        onClick={()=>setShowPassword(pre => !pre)} 
                                    >
                                        {showPassword ? <Eye size={20} /> : <EyeOff size={20} />} 
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="pt-8 border-t border-outline-variant/20 flex items-center justify-end gap-4">
                        <button 
                            className="px-8 py-3 rounded-lg text-secondary font-bold hover:bg-surface-container transition-colors" 
                            type="button"
                            onClick={closeModal}>Hủy
                        </button>
                        <button 
                            onClick={handleRegister}
                            disabled={notPassValid}
                            className={`px-10 py-3 bg-primary text-white font-bold rounded-lg shadow-lg shadow-primary/20 
                                hover:bg-primary-container active:scale-95 transition-all" type="submit ${notPassValid ? 'cursor-not-allowed' :'pointer'}`}>
                            Lưu thông tin
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default FormAddStaff