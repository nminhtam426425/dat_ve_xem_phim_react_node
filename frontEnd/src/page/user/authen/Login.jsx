import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { toast } from 'sonner'
import { Eye, EyeOff } from 'lucide-react'
import {apiUserService, customeFetch} from '../../index'

const  Login = () => {
    const navigate = useNavigate() 
    const [isLogin,setIsLogin] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const [authen,setAuthen] = useState({
      username:"",
      password:"",
      type: ['user']
    })

    const handleInputOnChange = (e) => {
      const {value, id} = e.target
      setAuthen({
        ...authen,
        [id]: value
      })
    }

    const handleLogin = (e) => { 
      e.preventDefault() 
      const login = async () => {
        try{
          setIsLogin(pre => !pre)
          const res = await customeFetch(
            apiUserService.baseURL+'/auth/login', 
            'non-authen',
            'POST',
            JSON.stringify(authen)
          )
          if (res.ok) {
            navigate("/")
          } else 
            toast.error("Đăng nhập thất bại !")
          setIsLogin(pre => !pre)
        }
        catch(err){
          console.log(err)
          toast.error("Đăng nhập thất bại !")
          setIsLogin(pre => !pre)
        }
      }
      login()
    }

    return <>
        <main className="relative flex-grow flex items-center justify-center min-h-screen">
          {/* <!-- Hero Background --> */}
          <div className="absolute inset-0 z-0">
            <img className="w-full h-full object-cover" 
                 data-alt="A grand, high-fidelity cinematic theater interior with rows of plush velvet seats and a massive glowing projection screen reflecting soft ambient light. The atmosphere is upscale and professional with a bright light-mode aesthetic, utilizing clean whites and soft grays. The lighting is ethereal and atmospheric, creating a sense of premium luxury and anticipation. Minimalist architecture and crisp lines dominate the frame, accented by subtle hints of deep cinema red in the detailing." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQpKM5t1_N5GPg9T_oZw-Hnwe4blVCX0gYab_a_GLr88DEf8-CZQjMGFdcyolqHQLqWLYnUmmJWO2G4kdnxgzjJ0WNVHQEKAu7IwYBUeAZNeLgo9RqdK40SH7oC62beEt-elOo6JRo8ITDI_vw0pXScfDA4usDGo8x0j0b99W3E78DbywXiiBA8QDVUhTq8BVX2PcVEhEXU_5Prw42M8NVGHbWMjMH_Xi8jldG0zQJzzup0JOAJyX5e5huxtpxlNRSmlZhreCKEEw"/>
            <div className="absolute inset-0 cinematic-gradient"></div>
          </div>
          {/* <!-- Content Overlay --> */}
          <div className="relative z-10 w-full max-w-md px-6">
          {/* <!-- Logo Section --> */}
            <div className="glass-panel border border-white/50 rounded-xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
              <h1 className="font-headline-lg text-headline-lg text-on-surface mb-8 text-center">Đăng nhập</h1>
              <form action="#" className="space-y-6" method="POST">

                <div className="space-y-2">
                <label className="font-label-bold text-label-bold text-on-surface-variant" htmlFor="username">Username</label>
                <div className="relative flex items-center">
                  <input 
                    className="w-full pl-4 pr-4 py-3 bg-white border border-outline rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-body-md text-on-surface" 
                    id="username" 
                    name="username" 
                    placeholder="" 
                    type="text"
                    onChange={handleInputOnChange}/>
                </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                  <label className="font-label-bold text-label-bold text-on-surface-variant" htmlFor="password">Password</label>
                  <Link className="text-label-sm font-label-bold text-primary hover:underline transition-all" to="/">Quên mật khẩu</Link>
                </div>

                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3 text-secondary" data-icon="lock"></span>
                  <input 
                    className="w-full pl-4 pr-4 py-3 bg-white border border-outline rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-body-md text-on-surface" 
                    id="password" 
                    type={showPassword ? "text" : "password"}
                    onChange={handleInputOnChange}
                    autoComplete="one-time-code"/>
                    <span
                      className="absolute right-3 text-secondary cursor-pointer hover:text-on-surface"
                      onClick={()=>setShowPassword(pre => !pre)} 
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />} 
                    </span>
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
                    onClick={handleLogin}
                    autoComplete="new-password">
                    {isLogin ? '... Đang đăng nhập' : 'Đăng nhập'}
                  </button>
              </form>
              {/* <!-- Social Divider --> */}
              <div className="flex items-center my-8">
              <div className="flex-grow h-px bg-outline-variant"></div>
              <span className="px-4 text-label-sm font-label-sm text-secondary">HOẶC-TIẾP TỤC VỚI</span>
              <div className="flex-grow h-px bg-outline-variant"></div>
              </div>
              {/* <!-- Social Login Buttons --> */}
              <div className="grid grid-cols-2 gap-4">
                <button className="cursor-pointer flex items-center justify-center gap-2 py-3 px-4 border border-outline-variant rounded-lg bg-white hover:bg-surface-container transition-colors font-label-bold text-label-bold">
                <img alt="Google" className="w-5 h-5" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAViM0EMtORp-RrEhl92FnMfRLzCJeLDU9QPh0WCREPGmMpVqi88pSP_-x-p4TyVDSTQWrIKLTw7D-MzV57Py9MB63s9xOj6igELijhZ_ISGx-LR96FPaALRr2zYN4JGxu7RrY2116FSAhmHrggjRLXqzm_23FdHOc2P6fZ_xUhh4A2oQZCC_z22fdmLCMIXnTGmCaUFj_CxJGSAdUY1lkwp1fzTJRXytCtfBr9OkauOV-_JUW5cXyxfZT__8NMDtHS-HnIGRymjIQ"/>
                                        Google
                                    </button>
                <button className="cursor-pointer flex items-center justify-center gap-2 py-3 px-4 border border-outline-variant rounded-lg bg-white hover:bg-surface-container transition-colors font-label-bold text-label-bold">
                <span className="material-symbols-outlined text-[#1877F2]" data-icon="facebook"></span>
                                        Facebook
                                    </button>
              </div>
              {/* <!-- Registration Link --> */}
              <div className="mt-8 text-center">
                <p className="text-body-md font-body-md text-secondary">
                  Don't have an account? 
                <Link className="text-primary font-label-bold hover:underline" to="/register">Đăng ký</Link>
                </p>
              </div>
            </div>
              {/* <!-- Secondary Footer Links --> */}
            <div className="mt-12 flex justify-center gap-6">
                <Link className="text-label-sm font-label-sm text-secondary hover:text-on-surface transition-colors" to="#">Privacy Policy</Link>
                <Link className="text-label-sm font-label-sm text-secondary hover:text-on-surface transition-colors" to="#">Terms of Service</Link>
                <Link className="text-label-sm font-label-sm text-secondary hover:text-on-surface transition-colors" to="#">Help Center</Link>
                <Link className="text-label-sm font-label-sm text-secondary hover:text-on-surface transition-colors" to="/login/internal">Internal Login</Link>
            </div>
          </div>
        </main>
    </>
}

export default Login