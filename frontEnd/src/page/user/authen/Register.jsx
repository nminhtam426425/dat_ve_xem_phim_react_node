import { Link, useNavigate } from 'react-router-dom'
import { useState } from "react"
import { toast } from 'sonner';
import {apiUserService, customeFetch} from '../../index'

const Register = () => {
    const navigate = useNavigate() 
    const [isLogin,setIsLogin] = useState(false)
    const [authen,setAuthen] = useState({
      username:"",
      password:"",
      fullname:""
    })

    const handleInputOnChange = (e) => {
        const {value, id} = e.target
        setAuthen({
            ...authen,
            [id]: value
        })
    }

    const handleRegister = (e) => {
        const register = async () => {
          try{
            setIsLogin(pre => !pre)
            const res = await customeFetch(
              apiUserService.baseURL+'/users', 
              'non-authen',
              'POST',
              JSON.stringify(authen)
            )
            if(res){
                const data = await res.json()
                if (res.ok) {
                    toast.success("Đăng ký thành công !")
                    navigate("/login")
                } 
                else 
                    toast.error(data.message)
            }
            setIsLogin(pre => !pre)
          }
          catch(err){
            console.log(err)
            toast.error("Đăng ký thất bại !")
            setIsLogin(pre => !pre)
          }
        }
        register()
    }

    return <div className="bg-background text-on-surface min-h-screen flex flex-col">
        <main className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
            
            <div className="absolute inset-0 z-0">
                <img alt="Cinematic Background" className="w-full h-full object-cover" data-alt="A cinematic wide shot of a luxury modern movie theater lobby with high ceilings and architectural lighting. The scene is bathed in a bright, airy light-mode aesthetic with soft white marble surfaces and subtle hints of deep red velvet. The atmosphere is sophisticated and premium, like an upscale editorial magazine spread, featuring clean lines and a sense of cinematic wonder." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDa4YCSBH3LsGIb64UUSfR6K0gB6pa6XmjTvIe7XrerLoSThcas6SLgqx9C4s81Dj4KYXFTbeqPtBuqlYmzyIA6byslKUaWQ06zQEJ-oMwH7vNFSbNUYFyh6AFjavRluHUFwhX3iQ9jEj10VD0tG5we5XuhPfnJFGA6wj-fO4M1OUPG-ktVIOSyCD9hYwJ8qkwbrKTBXXb_QqmXFim0PbAn_M6A-FGQCqWuZ52gqomtj3-qgG9xDkQGq8EmAmusbeIg7CwmiKwR32U"/>
                <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent"></div>
            </div>
           
            <div className="relative z-10 w-full max-w-[1280px] px-4 md:px-12 grid-cols-1 gap-12 items-center flex justify-center">
           
                <div className="flex justify-center lg:justify-end">
                    <div className="bg-white/70 backdrop-blur-2xl p-8 md:p-12 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.06)] border border-white/50 w-full min-w-[450px]">
                        <div className="mb-10 text-center lg:text-left">
                            <h1 className="font-headline-lg text-headline-lg text-on-surface mb-8 text-center">Đăng ký</h1>
                        </div>

                        <div className="space-y-5">
                            
                            <div className="space-y-2 gap-4">
                                <label className="font-label-bold text-on-surface ml-1">Họ và tên</label>
                                <div className="relative">
                                    <input 
                                        className="w-full pl-4 pr-4 py-4 bg-white border border-secondary/20 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all font-body-md" 
                                        placeholder="" 
                                        id="fullname"
                                        onChange={handleInputOnChange}
                                        type="text"/>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="font-label-bold text-on-surface ml-1">Username</label>
                                <div className="relative">
                                    <input 
                                        className="w-full pl-4 pr-4 py-4 bg-white border border-secondary/20 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all font-body-md" 
                                        placeholder="" 
                                        id="username"
                                        onChange={handleInputOnChange}
                                        type="text"/>
                                </div>
                            </div>
                            
                            <div className="space-y-2">
                                <label className="font-label-bold text-on-surface ml-1">Password</label>
                                <div className="relative">
                                    <input 
                                        className="w-full pl-4 pr-4 py-4 bg-white border border-secondary/20 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all font-body-md" 
                                        placeholder="" 
                                        id="password"
                                        onChange={handleInputOnChange}
                                        type="password"/>
                                </div>
                            </div>
                        
                            <button 
                                className="w-full bg-primary-container text-on-primary-container font-headline-md py-4 rounded-xl shadow-lg shadow-primary/20 hover:brightness-110 active:scale-[0.98] transition-all mt-4" 
                                type="submit"
                                onClick={handleRegister}>
                                Đăng ký
                            </button>
                        
                            <div className="text-center pt-6 border-t border-secondary/10">
                                <p className="font-body-md text-secondary">
                                    Bạn đã có tài khoản? 
                                <Link className="text-primary font-bold hover:underline ml-1" to="/login">Đăng nhập</Link>
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
}

export default Register