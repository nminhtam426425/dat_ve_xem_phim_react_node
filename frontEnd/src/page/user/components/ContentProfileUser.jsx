import {  Pencil, Ticket, TrendingUp } from "lucide-react"
import { Link } from "react-router-dom"
import { formatDate, formatPhone,formatVND2 } from "../../validate"
import ChartUser from "./ChartUser"
import AsideProfile from "./AsideProfile"
import Avatar from "./Avatar"
import { useEffect, useState } from "react"
import { apiUserService, customeFetch } from "../../config"

const ContentProfileUser = ({userInfo, setDataItem, avatar, setAvatar, imageInput, setConfirm, setShowFormChangePass}) => {
    const today = new Date()
    const [dataSpending, setDataSpending] = useState({})
    let propsOfAvatar = {
        userInfo,
        avatar, 
        setAvatar, 
        imageInput, 
        setConfirm
    }

    useEffect(()=>{
        const getDataSpending = async () => {
            try{
                const res = await customeFetch(apiUserService.baseURL+'/users/spending','authen','GET')
                if(res.ok){
                    const data = await res.json()
                    console.log(data)
                    setDataSpending(data)
                }
            }
            catch(err){
                console.log(err)
            }
        }
        getDataSpending()
    },[])

    return <main className="w-full bg-background2">
        <Avatar {...propsOfAvatar}/>

        <div className="max-w-container-max mx-auto px-gutter py-12">
            <div className="flex flex-col lg:flex-row gap-12">
               <AsideProfile setShowFormChangePass={setShowFormChangePass}/>

                <section className="flex-1 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="p-6 rounded-xl bg-zinc-900 border border-outline-variant/10 flex flex-col gap-2">
                            <span className="text-white font-label-bold uppercase text-[12px]">Tổng chi tiêu</span>
                            <span className="font-headline-md text-white">{formatVND2(dataSpending.totalSpending)}</span>
                            
                        </div>
                        <div className="p-6 rounded-xl bg-zinc-900 border border-outline-variant/10 flex flex-col gap-2">
                        <span className="text-white font-label-bold uppercase text-[12px]">Số vé đã mua</span>
                            <span className="font-headline-md text-white">{dataSpending.totalTickets} Vé</span>
                            <span className="material-symbols-outlined text-[16px] text-green-400">
                                <Ticket size={20}/>
                            </span>
                        </div>

                        <div className="p-6 rounded-xl bg-zinc-900 border border-outline-variant/10 flex flex-col gap-2">
                            <span className="text-white font-label-bold uppercase text-[12px]">Điểm thưởng</span>
                            <span className="font-headline-md text-white">{dataSpending.points} Points</span>
                            <Link className="flex items-center gap-1 text-[12px] text-primary font-bold hover:underline" to="/doi-thuong">
                                Đổi quà ngay
                            </Link>
                        </div>
                    </div>

                    <div className="p-8 rounded-2xl bg-zinc-900 border border-outline-variant/20 shadow-sm">
                        <span className="text-green-400 mb-2">Chi tiêu từ: 01/01/{today.getFullYear()} - {formatDate(today)}</span>
                        <ChartUser spending={dataSpending?.spending}/>
                    </div>

                    <div className="p-8 rounded-2xl bg-zinc-900 border border-outline-variant/20 shadow-sm">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="font-headline-md text-white">Thông tin cá nhân</h2>
                            <button 
                                className="flex items-center gap-2 px-4 py-2 border border-secondary text-white rounded-lg font-label-bold hover:border-primary hover:text-primary transition-all"
                                onClick={()=>setDataItem(userInfo)}>
                                <span className="material-symbols-outlined text-[18px]">
                                    <Pencil size={20}/>
                                </span>
                                    Chỉnh sửa
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                            <div className="space-y-1">
                                <label className="text-[12px] font-label-bold text-white uppercase">Họ và tên</label>
                                <p className="font-body-lg text-green-500 border-b border-outline-variant/50 pb-2">{userInfo?.fullname}</p>
                            </div>

                            <div className="space-y-1">
                                <label className="text-[12px] font-label-bold text-white uppercase">Email</label>
                                <p className="font-body-lg text-green-500 border-b border-outline-variant/50 pb-2">{userInfo?.email}</p>
                            </div>

                            <div className="space-y-1">
                                <label className="text-[12px] font-label-bold text-white uppercase">Số điện thoại</label>
                                <p className="font-body-lg text-green-500 border-b border-outline-variant/50 pb-2">{formatPhone(userInfo?.phone)}</p>
                            </div>

                            <div className="space-y-1">
                                <label className="text-[12px] font-label-bold text-white uppercase">Ngày sinh</label>
                                <p className="font-body-lg text-green-500 border-b border-outline-variant/50 pb-2">{userInfo?.birthday}</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </main>
}

export default ContentProfileUser