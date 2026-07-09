import { Camera, Edit } from "lucide-react"
import {formatDate, formatPhone} from '../../validate'
import { useLoading } from "../../../LoadingContext"
import { uploadCloudinary, customeFetch, apiUserService } from "../../config"

const convertDateToShow = (created_at) => {
    if(!created_at)
        return "abc"
    let temp = new Date(created_at)
    return `ngày ${temp.getDate()} tháng ${(temp.getMonth()+1)}, năm ${temp.getFullYear()}`
}
const Profile = ({user, setDataItem, imgAvatar, setConfirm, setAvatar, setShowFormChangePass}) => {
    const {showLoading, hideLoading, setUserInfo} = useLoading()

    const handleChoseImgFormClient = async (e) => {
        const file = e.target.files[0]
       
        const validExtensions = ['image/jpeg', 'image/png', 'image/jpg']
        
        if (file.type && validExtensions.includes(file.type)) {
            setAvatar({
                file,
                url: URL.createObjectURL(file)
            })
            showLoading("Đang xử lý, vui lòng chờ !")
            const imgAvatar = await uploadCloudinary(file)
            if(imgAvatar.publicId){
                await customeFetch(
                    apiUserService.baseURL+'/users/avatar',
                    'authen',
                    'PUT',
                    JSON.stringify({
                        avatar: imgAvatar.url,
                        pub_id_avatar: imgAvatar.publicId
                    })
                )
                setUserInfo(pre => ({
                    ...pre,
                    avatar: imgAvatar.url
                }))
            }
            hideLoading()
        }
        else 
            alert(`File "${file.name}" không đúng định dạng (Chỉ nhận JPG, PNG, JPEG)`)
    }

    return <>   
        <section className="relative h-[250px] w-full overflow-hidden pt-8 md:pt-0">
            <div className="absolute inset-0 z-0">
                <img className="w-full h-full object-cover opacity-60" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-5nnYu-alz9XEoqtoKIMsYujdtbfVkYoxQdT9wGiEqb4SlYm6BdSkKDoRhprm2jbkU83nkCYXaugGqV5tCwIVsUkzBFOGbpdUo6GICN7ykzl_Md0WZqc9Vo9vKdLpVgkgVYLQ5ktZF-JzoG2oidvpo5aoaag7bHvEFAyIjLA9FpkKJa1tZ3Hnw0wWYZHMr7iAXpbZG5f0FlzLIzDTh3-kY4XAzJ1WTQRMGFQ_I1dOe-Qif0ryWIdesRk2KGQs9Q_AP2mtG9uuYHs"/>
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent"></div>
            </div>

            <div className="relative z-10 max-w-container-max mx-auto h-full flex flex-col justify-center md:pb-12">
                <div className="flex flex-col md:flex-row items-center md:items-end gap-6 md:gap-8">
                    <div className="relative group">
                        <div className="w-32 h-32 md:w-48 md:h-48 rounded-full shadow-xl overflow-hidden bg-zinc-900">
                            <img 
                                alt="Profile Avatar" 
                                className="w-full h-full object-cover"
                                src={user?.avatar == "" ? null : user?.avatar}
                            />
                        </div>

                        <input 
                            accept=".jpg, .jpeg, .png" 
                            className="hidden" 
                            id="poster-input" 
                            type="file" 
                            ref={imgAvatar} 
                            onChange={handleChoseImgFormClient}/>

                        <button 
                            className="absolute bottom-2 right-2 p-2 bg-primary text-on-primary rounded-full shadow-lg hover:scale-105 transition-transform"
                            onClick={()=>setConfirm(true)}>
                            <span className="material-symbols-outlined text-[20px]">
                                <Camera size={20}/>
                            </span>
                        </button>
                    </div>

                    <div className="text-center md:text-left pb-2">
                        <div className="flex items-center justify-center md:justify-start gap-3">
                            <h1 className="font-headline-xl text-lg md:text-headline-xl text-black">{user?.fullname}</h1>
                        </div>
                        <p className="font-body-lg text-secondary mt-1">{user?.email} • Nhân viên từ tháng {convertDateToShow(user?.created_at)}</p>
                    </div>
                </div>
            </div>
        </section>

        <div className="p-8 rounded-2xl  border border-outline-variant/20 shadow-sm">
            <div className="flex items-center justify-between mb-8 border-b py-4">
                <h2 className="font-headline-md">Thông tin cá nhân</h2>
                <div className="flex gap-2">
                    <button 
                        className="flex items-center gap-2 px-4 py-2 border border-secondary text-secondary rounded-lg font-label-bold hover:border-primary hover:text-primary transition-all"
                        onClick={() => setDataItem(user)}>
                            <span className="material-symbols-outlined text-[18px]">
                                <Edit size={18}/>
                            </span>Chỉnh sửa
                    </button>
                    <button 
                        className="flex items-center gap-2 px-4 py-2 bg-primary text-white border border-secondary rounded-lg font-label-bold hover:text-secondary transition-all"
                        onClick={() => setShowFormChangePass({})}>
                            <span className="material-symbols-outlined text-[18px]">
                                <Edit size={18}/>
                            </span>Đổi mật khẩu
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                <div className="space-y-1">
                <label className="text-[12px] font-label-bold text-secondary uppercase">Họ và tên</label>
                <p className="font-body-lg text-on-surface-variant border-b border-outline-variant/10 pb-2">{user?.fullname}</p>
                </div>
                <div className="space-y-1">
                <label className="text-[12px] font-label-bold text-secondary uppercase">Email</label>
                <p className="font-body-lg text-on-surface-variant border-b border-outline-variant/10 pb-2">{user?.email}</p>
                </div>
                <div className="space-y-1">
                <label className="text-[12px] font-label-bold text-secondary uppercase">Số điện thoại</label>
                <p className="font-body-lg text-on-surface-variant border-b border-outline-variant/10 pb-2">{formatPhone(user?.phone)}</p>
                </div>
                <div className="space-y-1">
                <label className="text-[12px] font-label-bold text-secondary uppercase">Ngày sinh</label>
                <p className="font-body-lg text-on-surface-variant border-b border-outline-variant/10 pb-2">{formatDate(user?.birthday)}</p>
                </div>
            </div>
        </div>
    </>
}
export default Profile