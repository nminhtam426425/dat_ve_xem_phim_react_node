import { useNavigate, useLocation } from "react-router-dom"
import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { toast } from "sonner"
import { customeFetch, apiUserService, handleInputOnChange } from "../../config"
import { useLoading } from "../../../LoadingContext"

const ConfirmPass = () =>{
    const {showLoading, hideLoading} = useLoading(0)
    const [notPassValid, setNotPassValid] = useState(true)
    const [showPassword,setShowPassword] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()

    const [register,setRegister] = useState({
        password:"",
        confirmPassword: ""
    })
    const [registerError,setRegisterError] = useState({
        password_0:"err",
        confirmPassword_0: "err"
    })

    const handleInputChange = (e) => {
        handleInputOnChange(e, setRegister, setRegisterError, setNotPassValid, "formRegister")
        const {id, value} = e.target
        if((id == 'password' && value != register.confirmPassword)){
            setRegisterError(pre => {
                const nextErrors = {
                    ...pre,
                    'confirmPassword_0': 'Mật khẩu chưa khớp'
                    }
                const isValid = Object.values(nextErrors).every(err => String(err || "").trim() === "")
                setNotPassValid(!isValid)
                return nextErrors
            })
        }
        // khi thay đổi, notPassValid phụ thuộc vào state của setError, nên tuân thủ
        // phải xét điều kiện phụ thuôc dựa vào id của input thay đổi
        else if(!value.includes(" ") && value.length > 7){
            if(id == 'password' && register.confirmPassword.length > 7 && !register.confirmPassword.includes(" ")){
                setRegisterError(pre => {
                    const nextErrors = {
                        ...pre,
                        'confirmPassword_0': ''
                        }
                    const isValid = Object.values(nextErrors).every(err => String(err || "").trim() === "")
                    setNotPassValid(!isValid)
                    return nextErrors
                })
            }
        }
    }

    const handleOnChangeConfirmPassword = (e) => {
        const {id, value} = e.target
        if((id == 'confirmPassword' && value != register.password)){
            setRegisterError(pre => {
                const nextErrors = {
                    ...pre,
                    'confirmPassword_0': 'Mật khẩu chưa khớp'
                    }
                const isValid = Object.values(nextErrors).every(err => String(err || "").trim() === "")
                setNotPassValid(!isValid)
                return nextErrors
            })
        }
        // khi thay đổi, notPassValid phụ thuộc vào state của setError, nên tuân thủ
        // phải xét điều kiện phụ thuôc dựa vào id của input thay đổi
        else if(!value.includes(" ") && value.length > 7){
            if(id == 'confirmPassword' && register.password.length > 7 && !register.password.includes(" ")){
                setRegisterError(pre => {
                    const nextErrors = {
                        ...pre,
                        'confirmPassword_0': ''
                        }
                    const isValid = Object.values(nextErrors).every(err => String(err || "").trim() === "")
                    setNotPassValid(!isValid)
                    return nextErrors
                })
            }
        }
        setRegister(pre =>({
            ...pre,
            [id]: value
        }))
    }

    const handleOnChagePass = async () => {
        try{
            let dataForApi = {
                user_id: location?.state?.user_id,
                new_pass: register.password
            }
            if(!dataForApi.user_id){
                toast.error("Đã có lỗi xảy ra, vui lòng thử lại sau!")
                return
            }
            showLoading("Vui lòng chờ ...")
            const res = await customeFetch(apiUserService.baseURL+'/users/confirm-password','non-authen','POST',JSON.stringify(dataForApi))
            hideLoading()
            if(res.ok){
                const data = await res.json()
                navigate('/login', 
                    {
                        state: {
                            user: {
                                username: data.username,
                                password: register.password
                            }
                        }
                    }
                )
            }
            else{
              const data = await res.json()
              toast.error(data.message)
            }
        }
        catch(err){
            console.log(err)
        }
    }
    return <div className="bg-background text-on-surface min-h-screen flex flex-col">
        <main className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
                <img alt="Cinematic Background" className="w-full h-full object-cover" data-alt="A cinematic wide shot of a luxury modern movie theater lobby with high ceilings and architectural lighting. The scene is bathed in a bright, airy light-mode aesthetic with soft white marble surfaces and subtle hints of deep red velvet. The atmosphere is sophisticated and premium, like an upscale editorial magazine spread, featuring clean lines and a sense of cinematic wonder." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDa4YCSBH3LsGIb64UUSfR6K0gB6pa6XmjTvIe7XrerLoSThcas6SLgqx9C4s81Dj4KYXFTbeqPtBuqlYmzyIA6byslKUaWQ06zQEJ-oMwH7vNFSbNUYFyh6AFjavRluHUFwhX3iQ9jEj10VD0tG5we5XuhPfnJFGA6wj-fO4M1OUPG-ktVIOSyCD9hYwJ8qkwbrKTBXXb_QqmXFim0PbAn_M6A-FGQCqWuZ52gqomtj3-qgG9xDkQGq8EmAmusbeIg7CwmiKwR32U"/>
                <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent"></div>
            </div>
        
            <div className="relative z-10 w-[350px] md:w-[500px] px-4 md:px-8 grid-cols-1 gap-4 items-center flex justify-center">
                <div className="flex justify-center lg:justify-end w-full">
                    <div className="bg-white/70 backdrop-blur-2xl p-4 md:p-8 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.06)] border border-white/50 w-full">
                        <div className="mb-10 text-center lg:text-left">
                            <h1 className="font-headline-lg text-headline-lg text-on-surface mb-8 text-center">Nhập mật khảu mới</h1>
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

                        <div className="space-y-2">
                            <label className="font-label-bold text-on-surface ml-1" htmlFor="confirm_password">
                                Nhập lại mật khẩu
                                <p id="confirmPassword_0"  className={`text-primary ${registerError.confirmPassword_0 == 'err' ? 'text-[0px]' : 'text-[9px]'}`}>{registerError.confirmPassword_0}</p>
                            </label>
                            <div className="relative">
                                <input
                                    readOnly={registerError.password_0 != ""} 
                                    className="w-full pl-4 pr-4 py-4 bg-white border border-secondary/20 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all font-body-md" 
                                    placeholder="" 
                                    id="confirmPassword"
                                    onChange={handleOnChangeConfirmPassword}
                                    type={showPassword ? "text" : "password"}/>
                                    <span
                                        className="absolute right-3 top-1/3 text-secondary cursor-pointer hover:text-on-surface"
                                        onClick={()=>setShowPassword(pre => !pre)} 
                                    >
                                        {showPassword ? <Eye size={20} /> : <EyeOff size={20} />} 
                                    </span>
                            </div>
                        </div>

                        <button 
                            className={`w-full py-4 text-white rounded-lg shadow-lg transition-all flex items-center justify-center gap-2 mt-4
                                ${notPassValid
                                ? 'bg-primary-container brightness-150 active:scale-[0.98] cursor-not-allowed' 
                                : 'bg-primary-container hover:brightness-110 active:scale-[0.98] cursor-pointer'
                                }`}
                            disabled={notPassValid}
                            onClick={handleOnChagePass}>
                            Xác nhận
                        </button>
                    </div>
                </div>
            </div>
        </main>
    </div>
}

export default ConfirmPass