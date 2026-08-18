import { Link, useLocation, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { toast } from 'sonner'
import { Eye, EyeOff } from 'lucide-react'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'
import { customeFetch, apiUserService, handleInputOnChange, setAccessToken } from "../../config"
import {useLoading} from '../../../LoadingContext'

const  Login = () => {
    const clientId = import.meta.env.VITE_CLIENT_GOOGLE_ID
    const navigate = useNavigate() 
    const {setUserInfo, showLoading, hideLoading} = useLoading()
    const location = useLocation()
    const [isLogin, setIsLogin] = useState(false)
    const [notPassValid, setNotPassValid] = useState(true)
    const [showPassword, setShowPassword] = useState(false)

    const [authen,setAuthen] = useState(
      location?.state?.user  
      ||
        {
          username:"",
          password:""
        }
    )

    useEffect(() => {
      if (location?.state?.user) {
        setAuthen(location.state.user)
        setNotPassValid(false)
      }
    }, [location?.state?.user])

    const [authenError,setAuthenError] = useState({
        username_0: "err",
        password_0: "err"
    })

    const handleInputChange = (e) => {
        handleInputOnChange(e, setAuthen, setAuthenError, setNotPassValid, "formLogin")
    }

    const handleLogin = (e) => { 
        e.preventDefault() 
        const login = async () => {
          try{
                setIsLogin(pre => !pre)
                let dataForApi = {
                    username: authen.username,
                    password: authen.password,
                    type: ['user']
                }
                let res = await customeFetch(apiUserService.baseURL+'/auth/login', 'non-authen','POST',JSON.stringify(dataForApi))

                if (res.ok) {
                  let data = await res.json()
                  setAccessToken(data.token)
                  res = await customeFetch(apiUserService.baseURL+'/users','authen','GET')
                  data = await res.json()
                  setUserInfo(data)
                  navigate("/")
                }
                else {
                  let data = await res.json()
                  toast.error(data.message)
                }
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

    const handleLoginGoogle = (credentialResponse) => {
      try{
        setIsLogin(pre => !pre)
        const loginGoogle = async () => {
          const token = credentialResponse.credential
          let res = await customeFetch(apiUserService.baseURL+'/auth/login-google','non-authen','POST',JSON.stringify({idToken: token}))
          if(res.ok){
              let data = await res.json()
              setAccessToken(data.token)
              res = await customeFetch(apiUserService.baseURL+'/users','authen','GET')
              data = await res.json()
              setUserInfo(data)
              navigate("/")
          } 
          else{
            const data = await res.json()
            toast.error(data.message)
          }
        }
        loginGoogle()
        
        setIsLogin(pre => !pre)
      }
      catch(err){
        console.log(err)
      }
    }

    const handleForgetPass = async (e) => {
      e.preventDefault()
      showLoading("Vui lòng chờ ... !")
      try{
        const res = await customeFetch(apiUserService.baseURL+'/users/forget-password','non-authen','POST',JSON.stringify({username: authen.username}))
        hideLoading()
        if(res.ok)
          navigate('/xac-nhan')
        else{
          const data = await res.json()
          toast.error(data.message)
        }
      }
      catch(err){
        hideLoading()
        console.log(err)
      }
     
    }

    const handleError = () => {
      toast.error('Đăng nhập thất bại')
    }

    return <>
        <main className="relative flex-grow flex items-center justify-center min-h-screen">
          <div className="absolute inset-0 z-0">
            <img className="w-full h-full object-cover" 
                 data-alt="A grand, high-fidelity cinematic theater interior with rows of plush velvet seats and a massive glowing projection screen reflecting soft ambient light. The atmosphere is upscale and professional with a bright light-mode aesthetic, utilizing clean whites and soft grays. The lighting is ethereal and atmospheric, creating a sense of premium luxury and anticipation. Minimalist architecture and crisp lines dominate the frame, accented by subtle hints of deep cinema red in the detailing." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQpKM5t1_N5GPg9T_oZw-Hnwe4blVCX0gYab_a_GLr88DEf8-CZQjMGFdcyolqHQLqWLYnUmmJWO2G4kdnxgzjJ0WNVHQEKAu7IwYBUeAZNeLgo9RqdK40SH7oC62beEt-elOo6JRo8ITDI_vw0pXScfDA4usDGo8x0j0b99W3E78DbywXiiBA8QDVUhTq8BVX2PcVEhEXU_5Prw42M8NVGHbWMjMH_Xi8jldG0zQJzzup0JOAJyX5e5huxtpxlNRSmlZhreCKEEw"/>
            <div className="absolute inset-0 cinematic-gradient"></div>
          </div>
          
          <div className="relative z-10 w-full max-w-md px-6">
          
            <div className="glass-panel border border-white/50 rounded-xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
              <h1 className="font-headline-lg text-headline-lg text-on-surface mb-8 text-center">Đăng nhập</h1>
              <div className="space-y-6">

                <div className="space-y-2">
                    <label className="font-label-bold text-label-bold text-on-surface-variant" htmlFor="username">
                      Tên đăng nhập
                      <p  className={`text-primary ${authenError.username_0 == 'err' ? 'text-[0px]' : 'text-[9px]'}`}>{authenError.username_0}</p>
                    </label>
                  <div className="relative flex items-center">
                    <input 
                      className="w-full pl-4 pr-4 py-3 bg-white border border-outline rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-body-md text-on-surface" 
                      id="username" 
                      name="username" 
                      placeholder="" 
                      type="text"
                      max={50}
                      value={authen.username}
                      onChange={handleInputChange}/>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                   
                    <label className="font-label-bold text-label-bold text-on-surface-variant" htmlFor="password">
                        Mật khẩu
                        <p id="title_01"  className={`text-primary ${authenError.password_0 == 'err' ? 'text-[0px]' : 'text-[9px]'}`}>{authenError.password_0}</p>
                    </label>
                    {
                      authenError.username_0 == ""
                      && <button
                          onClick={handleForgetPass}
                          className="text-label-sm font-label-bold text-primary hover:underline transition-all"
                          > Quên mật khẩu
                      </button>
                    }
                   
                  </div>

                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-3 text-secondary" data-icon="lock"></span>
                    <input 
                      className="w-full pl-4 pr-4 py-3 bg-white border border-outline rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-body-md text-on-surface" 
                      id="password" 
                      type={showPassword ? "text" : "password"}
                      value={authen.password}
                      onChange={handleInputChange}
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
                      ${isLogin || notPassValid
                        ? 'bg-primary-container brightness-150 active:scale-[0.98] cursor-not-allowed' 
                        : 'bg-primary-container hover:brightness-110 active:scale-[0.98] cursor-pointer'
                      }`}
                    type="submit"
                    disabled={isLogin || notPassValid}
                    onClick={handleLogin}
                    autoComplete="new-password">
                    {isLogin ? '... Đang đăng nhập' : 'Đăng nhập'}
                  </button>
              </div>
             
              <div className="flex items-center my-8">
              <div className="flex-grow h-px bg-outline-variant"></div>
              <span className="px-4 text-label-sm font-label-sm text-secondary">HOẶC-TIẾP TỤC VỚI</span>
              <div className="flex-grow h-px bg-outline-variant"></div>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                <GoogleOAuthProvider clientId={clientId}>
                  {/* <div className="cursor-pointer flex items-center justify-center gap-2 py-3 px-4 border border-outline-variant rounded-lg bg-white hover:bg-surface-container transition-colors font-label-bold text-label-bold">
                    <img 
                        alt="Google" 
                        className="w-5 h-5" 
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAViM0EMtORp-RrEhl92FnMfRLzCJeLDU9QPh0WCREPGmMpVqi88pSP_-x-p4TyVDSTQWrIKLTw7D-MzV57Py9MB63s9xOj6igELijhZ_ISGx-LR96FPaALRr2zYN4JGxu7RrY2116FSAhmHrggjRLXqzm_23FdHOc2P6fZ_xUhh4A2oQZCC_z22fdmLCMIXnTGmCaUFj_CxJGSAdUY1lkwp1fzTJRXytCtfBr9OkauOV-_JUW5cXyxfZT__8NMDtHS-HnIGRymjIQ"/>
                          Google
                  </div> */}
                  <div>
                    <GoogleLogin
                      onSuccess={handleLoginGoogle}
                      onError={handleError}
                      useOneTap 
                    />
                  </div>
                </GoogleOAuthProvider>
                {/* <button 
                  className="cursor-pointer flex items-center justify-center gap-2 py-3 px-4 border border-outline-variant rounded-lg bg-white hover:bg-surface-container transition-colors font-label-bold text-label-bold">
                  <span className="material-symbols-outlined text-[#1877F2]" data-icon="facebook"></span>
                    Facebook
                </button> */}
              </div>
             
              <div className="mt-8 text-center">
                <p className="text-body-md font-body-md text-secondary">
                  Bạn chưa có tài khoản? 
                <Link className="text-primary font-label-bold hover:underline" to="/register">Đăng ký</Link>
                </p>
              </div>
              <div className="text-center">
                <Link className="text-primary font-label-bold hover:underline" to="/">Trang chủ</Link>
              </div>
            </div>
             
            <div className="mt-12 flex justify-center gap-6">
                <Link className="text-label-sm font-label-sm text-secondary hover:text-on-surface transition-colors" to="/login/internal">Nội bộ</Link>
            </div>
          </div>
        </main>
    </>
}

export default Login