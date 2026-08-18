import {Calendar, Phone,Mail,FileBadge}from "lucide-react"
import { useEffect, useState } from "react"
import { handleInputOnChange, customeFetch, apiUserService } from "../../../config"
import { formatPhone } from "../../../validate"
import { toast } from "sonner"

const FormUpdateInfo = ({dataItem, setDataItem, setForUserUpdate}) => {
    const [notPassValid, setNotPassValid] = useState(true)
    const [statusPhone, setStatusPhone] = useState('phone')

    const [userInfo, setUserInfoForm] = useState(
        {
            fullname:"",
            phone: "",
            email:"",
            dob: ""   
        }
    )
    const [userInfoError, setUserInfoError] = useState(
        {
            fullname_0: "err",
            phone_0: "",
            email_0: "",
            dob_0: ""
        }
    )

    useEffect(()=>{
        if(dataItem){
            setUserInfoForm({
                fullname:dataItem.fullname,
                phone: dataItem.phone || "",
                email: dataItem.email || "",
                dob: dataItem.birthday || ""
            })
            setUserInfoError( {
                fullname_0: "",
                phone_0: "",
                email_0: "",
                dob_0: ""
            })
        }
        else{
            setUserInfoForm({
                fullname:"",
                phone: "",
                email:"",
                dob: ""
            })
        }
    },[dataItem])

    const handleOnChange = (e) => {
        handleInputOnChange(e, setUserInfoForm, setUserInfoError, setNotPassValid, "formUpdateInfo")
    } 

    const handleUpdateInfo = () => {
        let dataForApi = {
            id: dataItem.id,
            fullname: userInfo.fullname,
            phone: userInfo.phone,
            email: userInfo.email || "",
            birthday: userInfo.dob
        }
        const update = async (dataForApi) => {
            try{
                const res = await customeFetch(apiUserService.baseURL+'/users','authen','PUT',JSON.stringify(dataForApi))
                if(res.ok) {
                    setForUserUpdate(pre => ({
                        ...pre,
                        ...dataForApi
                    }))
                    toast.success("Cập nhật thông tin thành công!")
                }
                else{
                    const data = await res.json()
                    toast.error(data.message)
                }
                setDataItem(null)
            }
            catch(err){
                console.log(err)
            }
        }
        update(dataForApi)
    }

    return <>
            <div className="space-y-6 modal-content" id="profile-form">
                <div className="grid grid-cols-1 gap-4">
                    <div className="flex flex-col gap-2">
                        <label className="text-label-bold text-on-surface-variant uppercase tracking-wider" htmlFor="fullname">
                            Họ tên
                            <p className={`h-4 text-primary ${userInfoError.fullname_0 == 'err' ? 'text-[0px]' : 'text-[9px]'}`} >{userInfoError.fullname_0}</p>
                        </label>
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary">
                                <FileBadge size={20}/>
                            </span>
                            <input 
                                className="w-full pl-10 pr-4 py-3 bg-surface rounded-lg border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all duration-200 text-body-md" 
                                id="fullname" 
                                type="text" 
                                value={userInfo.fullname}
                                onChange={handleOnChange}/>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <div className="flex flex-col gap-2">
                            <label className="text-label-bold text-on-surface-variant uppercase tracking-wider" htmlFor="dob">
                                Ngày sinh
                                <p className={`h-4 text-primary ${userInfoError.dob_0 == 'err' ? 'text-[0px]' : 'text-[9px]'}`} >{userInfoError.dob_0}</p>
                            </label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary">
                                    <Calendar size={20}/>
                                </span>
                                <input 
                                    className="w-full pl-10 pr-4 py-3 bg-surface rounded-lg border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all duration-200 text-body-md" 
                                    id="dob" 
                                    type="date" 
                                    value={userInfo.dob}
                                    onChange={handleOnChange}/>
                            </div>  
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-label-bold text-on-surface-variant uppercase tracking-wider" htmlFor="phone">
                                Số điện thoại
                                <p className={`h-4 text-primary ${userInfoError.phone_0 == 'err' ? 'text-[0px]' : 'text-[9px]'}`} >{userInfoError.phone_0}</p>
                            </label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary">
                                    <Phone size={20}/>
                                </span>
                                <input 
                                    className="w-full pl-10 pr-4 py-3 bg-surface rounded-lg border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all duration-200 text-body-md" 
                                    id="phone" 
                                    type="tel"
                                    maxLength={10}
                                    onFocus={()=>setStatusPhone(null)} 
                                    onBlur={()=>setStatusPhone('phone')}
                                    value={statusPhone == 'phone' ? formatPhone(userInfo.phone)  : userInfo.phone}
                                    onChange={handleOnChange}/>
                            </div>
                        </div>
                    </div>
                

                    <div className="flex flex-col gap-2">
                        <label className="text-label-bold text-on-surface-variant uppercase tracking-wider" htmlFor="email">
                            Email
                            <p className={`h-4 text-primary ${userInfoError.email_0 == 'err' ? 'text-[0px]' : 'text-[9px]'}`} >{userInfoError.email_0}</p>
                        </label>
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary">
                                <Mail size={20}/>
                            </span>
                            <input 
                                className="w-full pl-10 pr-4 py-3 bg-surface rounded-lg border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all duration-200 text-body-md" 
                                id="email" 
                                type="email" 
                                value={userInfo.email}
                                onChange={handleOnChange}/>
                        </div>
                    </div>
                </div>

                <div className="pt-2 border-t border-outline-variant/10 flex flex-col sm:flex-row justify-end gap-4">
                    <button 
                        className="px-8 py-3 rounded-lg border border-secondary text-secondary font-bold hover:bg-secondary-container transition-all active:scale-95" 
                        onClick={() => setDataItem(null)}>
                            Hủy bỏ
                    </button>
                    <button 
                       className={`px-8 py-3 rounded-lg border border-secondary text-white font-bold hover:bg-primary transition-all active:scale-95
                        ${notPassValid
                          ? 'bg-primary-container active:scale-[0.98] cursor-not-allowed' 
                          : 'bg-primary-container hover:brightness-110 active:scale-[0.98] cursor-pointer'
                        }`}
                        disabled={notPassValid}
                        onClick={handleUpdateInfo}
                        >
                        Lưu thay đổi
                    </button>
                </div>
            </div>
    </>
}

export default FormUpdateInfo