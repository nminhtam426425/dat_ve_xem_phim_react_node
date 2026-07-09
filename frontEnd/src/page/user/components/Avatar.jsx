import { customeFetch, apiUserService, uploadCloudinary } from "../../config"
import { Camera } from "lucide-react"
import { useLoading } from "../../../LoadingContext"

const convertDateToShow = (created_at) => {
    if(!created_at)
        return "abc"
    let temp = new Date(created_at)
    return `ngày ${temp.getDate()} tháng ${(temp.getMonth()+1)}, năm ${temp.getFullYear()}`
}
const Avatar = ({ userInfo, avatar, setAvatar, imageInput, setConfirm}) => {
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
                const res = await customeFetch(
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
          <section className="relative h-[400px] w-full overflow-hidden">
            <div className="absolute inset-0 z-0">
                <img 
                    className="w-full h-full object-cover opacity-60" 
                    data-alt="avatar" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-5nnYu-alz9XEoqtoKIMsYujdtbfVkYoxQdT9wGiEqb4SlYm6BdSkKDoRhprm2jbkU83nkCYXaugGqV5tCwIVsUkzBFOGbpdUo6GICN7ykzl_Md0WZqc9Vo9vKdLpVgkgVYLQ5ktZF-JzoG2oidvpo5aoaag7bHvEFAyIjLA9FpkKJa1tZ3Hnw0wWYZHMr7iAXpbZG5f0FlzLIzDTh3-kY4XAzJ1WTQRMGFQ_I1dOe-Qif0ryWIdesRk2KGQs9Q_AP2mtG9uuYHs"/>
                <div className="absolute inset-0 bg-gradient-to-t from-background2 via-background2/60 to-transparent"></div>
            </div>

            <div className="relative z-10 max-w-container-max mx-auto px-gutter h-full flex flex-col justify-end pb-12">
                <div className="flex flex-col md:flex-row items-center md:items-end gap-6 md:gap-8">
                    <div className="relative group">
                        <div className="w-32 h-32 md:w-48 md:h-48 rounded-full border-4 border-zinc-900 shadow-xl overflow-hidden bg-zinc-900">
                            <img alt="Profile Avatar" className="w-full h-full object-cover" src={avatar.url == "" ? null : avatar.url}/>
                        </div>

                        <input 
                            accept=".jpg, .jpeg, .png" 
                            className="hidden" 
                            id="poster-input" 
                            type="file" 
                            ref={imageInput} 
                            onChange={handleChoseImgFormClient}/>

                        <button 
                            className="absolute bottom-2 right-2 p-2 bg-primary text-on-primary rounded-full shadow-lg hover:scale-105 transition-transform"
                            onClick={()=>setConfirm(true)}>
                            <span className="material-symbols-outlined">
                                <Camera size={20}/>
                            </span>
                        </button>
                    </div>
                    <div className="text-center md:text-left pb-2">
                        <div className="flex items-center justify-center md:justify-start gap-3">
                            <h1 className="font-headline-xl text-headline-md md:text-headline-xl text-white">{userInfo?.fullname}</h1>
                        </div>
                        <p className="font-body-lg text-secondary mt-1">• Tham gia từ tháng {convertDateToShow(userInfo?.created_at)}</p>
                    </div>
                </div>
            </div>
        </section>
    </>
}

export default Avatar