import { useState } from "react"
import { toast } from "sonner"
import { Eye, EyeOff } from "lucide-react"
import { customeFetch, apiUserService, handleInputOnChange } from "../../../config"

const FormAddCustomer = ({dataItem, setDateItem, setUserEarnPoint, setConfirm}) => {
    const [notPassValid, setNotPassValid] = useState(false)
    const [showPassword,setShowPassword] = useState(true)

    const [register,setRegister] = useState({
      username:"",
      password:"123456789",
      fullname:""
    })
    const [registerError,setRegisterError] = useState({
        username_0:"",
        password_0:"",
        fullname_0:""
    })

    const handleInputChange = (e) => {
        handleInputOnChange(e, setRegister, setRegisterError, setNotPassValid, "formRegister")
    }

    const handleRegister = () => {
        const registerBE = async () => {
          try{
            let dataForApi = {
                username: register.username,
                password: register.password,
                fullname: register.fullname
            }
            const res = await customeFetch(
              apiUserService.baseURL+'/users/create-by-staff', 
              'authen',
              'POST',
              JSON.stringify(dataForApi)
            )
            
            if (res.ok) {
                const data = await res.json()
                toast.success("Đăng ký thành công !")
                setDateItem(null)
                setUserEarnPoint(data)
                setRegister({
                    username:"",
                    password:"123456789",
                    fullname:""
                })
                setConfirm(false)
            } 
            else {
                const data = await res.json()
                toast.error(data.message)
            }
          }
          catch(err){
            console.log(err)
            toast.error(err.message)
            setIsLogin(pre => !pre)
          }
        }
        registerBE()
    }

    const closeModal = () => {
        setDateItem(null)
    }

    const handleAddCustomer = (e) => {
        e.preventDefault()
    }

    return <div className="modal" style={{display: dataItem ? 'flex' : 'none'}}>
         <form 
            method="POST"
            onSubmit={handleAddCustomer}
            className="bg-white/70 w-[300px] md:w-[550px] backdrop-blur-2xl p-4 md:p-8 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.06)] border border-white/50 modal-content">
            
            <span className="close" onClick={closeModal}>&times;</span>
            
            <div className="mb-10 text-center lg:text-left">
                <h1 className="font-headline-lg text-headline-lg text-on-surface mb-8 text-center">Đăng ký khách hàng</h1>
            </div>
           
            <div className="space-y-2">
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
                            max={50}
                            value={register.username}
                            onChange={handleInputChange}
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
            
                <button 
                    className={`w-full py-4 text-white rounded-lg shadow-lg transition-all flex items-center justify-center gap-2 mt-4
                        ${notPassValid
                            ? 'bg-primary-container brightness-150 active:scale-[0.98] cursor-not-allowed' 
                            : 'bg-primary-container hover:brightness-110 active:scale-[0.98] cursor-pointer'
                        }`}
                    disabled={notPassValid}
                    onClick={handleRegister}>
                    Đăng ký
                </button>
        </form>
    </div>
}

export default FormAddCustomer