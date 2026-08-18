import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from "react"
import { toast } from 'sonner'
import {customeFetch, apiUserService, handleInputOnChange} from "../../config"

const ConfirmCode = () => {
    const navigate = useNavigate() 
    const [notPassValid, setNotPassValid] = useState(true)
    const [codeReset, setCodeReset] = useState({
        code_reset: ""
    })
    const [codeResetError, setCodeResetError] = useState({
        code_reset_0: "err"
    })

    useEffect(()=>{
        toast.success("Mã xác nhận đã được gửi về trong email bạn đăng ký!")
    },[])
  
    const handleInputChange = (e) => {
       handleInputOnChange(e, setCodeReset, setCodeResetError, setNotPassValid, "formConfirmCode")
    }

    const handleRegister = async () => {
       try{
        const res = await customeFetch(
            apiUserService.baseURL+'/users/confirm-code',
            'non-authen',
            'POST', 
            JSON.stringify({code_reset: codeReset.code_reset.toUpperCase()})
        )
        if(res.ok){
            const data = await res.json()
            navigate('/doi-mat-khau',{state: {user_id: data.user_id}})
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
                        <div className="space-y-2">
                            <div className="space-y-2 gap-4">
                                <label className="font-label-bold text-on-surface ml-1" htmlFor='code_reset'>
                                    Nhập code xác nhận
                                    <p id="code_reset_0" className={`text-primary ${codeResetError.code_reset_0 == 'err' ? 'text-[0px]' : 'text-[9px]'}`}>{codeResetError.code_reset_0}</p>
                                </label>
                                <div className="relative">
                                    <input 
                                        className="w-full pl-4 pr-4 py-4 bg-white border border-secondary/20 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all font-body-md" 
                                        id="code_reset"
                                        value={codeReset.code_reset.toUpperCase()}
                                        onChange={handleInputChange}
                                        maxLength={8}
                                        type="text"/>
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
                            Xác nhận
                        </button>
                    </div>
                </div>
            </div>
        </main>
    </div>
}

export default ConfirmCode