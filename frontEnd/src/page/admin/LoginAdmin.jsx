import {branch, apiUserService, customeFetch, handleInputOnChange, setAccessToken} from '../config.js'
import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { useLoading } from '../../LoadingContext.jsx'

const LoginAdmin = () => {
    const {setInfo} = useLoading() 
    const navigate = useNavigate() 
    const [isLogin,setIsLogin] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const [authen,setAuthen] = useState({
      username:"",
      password:"",
      type: ['admin','staff']
    })

    const handleChange = (e) => {
      handleInputOnChange(e, setAuthen, null , null)
    }

    const handleLogin = (e) => { 
      e.preventDefault() 
      const login = async () => {
        try{
          setIsLogin(pre => !pre)
          const res = await customeFetch(apiUserService.baseURL+'/auth/login', 'non-authen','POST',JSON.stringify(authen))
          if (res.ok) {
            let data = await res.json()
            setAccessToken(data.token)

            const info = await customeFetch(apiUserService.baseURL+'/users','authen','GET')
            data = await info.json()
            if(data.role == 'admin')
              navigate("/admin")
            else if(data.role == 'staff')
              navigate("/staff")
            else {
              navigate('/')
            }
          } 
          else 
            toast.error("Đăng nhập thất bại !")
          setIsLogin(pre => !pre)
        }
        catch(err){
          toast.error("Đăng nhập thất bại !")
          console.log(err)
          setIsLogin(pre => !pre)
        }
      }
      login()
    }

    return <div className="bg-inverse-surface min-h-screen flex flex-col font-body-md text-on-surface">
        <main className="relative z-10 flex-grow flex items-center justify-center p-gutter">
            <div className="w-full max-w-md">

                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center gap-2 mb-4">
                        <h1 className="font-headline-xl text-headline-xl text-on-primary-container tracking-tighter uppercase">{branch}</h1>
                    </div>
                    <p className="font-label-bold text-label-bold text-tertiary-fixed-dim uppercase tracking-widest">Hệ thống quản trị nội bộ</p>
                </div>

                <form className="bg-surface-container-lowest/10 backdrop-blur-2xl p-10 rounded-xl border border-white/10 shadow-2xl" method="POST">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="font-label-bold text-label-bold text-on-primary-container/80 flex items-center gap-2" htmlFor="employee_id">
                                <span className="material-symbols-outlined text-sm"></span>
                                    Username
                                </label>
                            <div className="relative">
                                <input 
                                className="w-full bg-inverse-surface/50 border border-outline-variant/30 text-on-primary-container px-4 py-3 rounded-lg focus:ring-2 focus:ring-primary-container focus:border-transparent outline-none transition-all placeholder:text-tertiary" 
                                id="username"  
                                type="text"
                                value={authen.username}
                                onChange={handleChange}
                                autoComplete="one-time-code"/>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <label className="font-label-bold text-label-bold text-on-primary-container/80 flex items-center gap-2" htmlFor="password">
                                <span 
                                  className="material-symbols-outlined text-sm"
                                  onClick={()=>setShowPassword(pre => !pre)}>
                                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />} 
                                </span>
                                    Password
                                </label>
                                {/* <a className="text-label-sm font-label-sm text-tertiary-fixed-dim hover:text-primary-container transition-colors" href="#">Quên mật khẩu?</a> */}
                            </div>
                            <div className="relative">
                                <input 
                                className="w-full bg-inverse-surface/50 border border-outline-variant/30 text-on-primary-container px-4 py-3 rounded-lg focus:ring-2 focus:ring-primary-container focus:border-transparent outline-none transition-all placeholder:text-tertiary" 
                                id="password" 
                                name="password" 
                                type={showPassword ? "text" : "password"}
                                value={authen.password}
                                onChange={handleChange}
                                autoComplete="new-password"/>
                            </div>
                        </div>

                        <button 
                          className={`w-full py-4 text-white rounded-lg shadow-lg transition-all flex items-center justify-center gap-2 
                          ${isLogin 
                            ? 'bg-primary-container brightness-150 active:scale-[0.98] cursor-not-allowed' 
                            : 'bg-primary-container hover:brightness-110 active:scale-[0.98] cursor-pointer'
                          }`}
                          type="submit"
                          disabled={isLogin}
                          onClick={handleLogin}>
                               {isLogin ? '... ĐANG ĐĂNG NHẬP' : 'ĐĂNG NHẬP HỆ THỐNG'}                 
                        </button>
                    </div>
                </form>
            </div>
        </main>
    </div>
}

export default LoginAdmin;