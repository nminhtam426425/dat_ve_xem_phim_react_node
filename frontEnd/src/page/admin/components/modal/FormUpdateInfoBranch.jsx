import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import {Save} from "lucide-react"
import { toast } from "sonner"
import { customeFetch, apiUserService, handleInputOnChange, handleUpdateData } from "../../../config"

const FormUpdateInfoBranch = ({dataItem, setDataItem, setDatas}) => {
    const [notPassValid, setNotPassValid] = useState(false)

    const [infoBranch, setInfoBranch] = useState({
        name: "",
        address: "",
        map_url: ""
    })

    const [infoBranchErr, setInfoBranchErr] = useState({
        name_0: "",
        address_0: "",
        map_url_0: ""
    })

    useEffect(()=>{
        if(dataItem?.id){
            setInfoBranch({
                name: dataItem.name,
                address: dataItem.address,
                map_url: dataItem.map_url,
            })
        }
    },[dataItem])

    const handleInputChange = (e) => {
        handleInputOnChange(e, setInfoBranch, null, null, "")
    }

    const closeModal = () => {
        setDataItem(null)
    }

    const handleAddOrUpdate = async (e) => {
        e.preventDefault()
        let dataForApi = {}
        dataForApi = {
            id: dataItem.id,
            name: infoBranch.name,
            address: infoBranch.address,
            map_url: getSrcFromIframe(infoBranch.map_url),
        }
        console.log(dataForApi)
        try{
            const res = await customeFetch(apiUserService.baseURL+'/branches','authen','PUT',JSON.stringify(dataForApi))
            if(res.ok){
                const data = await res.json()
                handleUpdateData(setDatas,'id',data.id, data)
                setDataItem(null)
                toast.success("Cập nhật thành công !")
                
            }
        }
        catch(err){
            toast.error("Thao tác thất bại !")
            console.log(err)
        }
    }

    const getSrcFromIframe = (iframeString) => {
        if(!iframeString) return ""
        const regex = /src=["']([^"']+)["']/;
        const match = iframeString.match(regex);
        
        // Nếu tìm thấy thì trả về group thứ 1 (chính là URL), không thì trả về null
        return match ? match[1] : iframeString;
    }

    return <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/20 modal-content">
        <span className="close" onClick={closeModal}>&times;</span>
        <form method="POST" className="space-y-4 w-300px md:w-[700px]" onSubmit={handleAddOrUpdate}>
            <div className="space-y-1">
                <label className="block text-sm font-label-bold text-on-surface" htmlFor="name">
                    Tên chi nhánh
                    <p className={`h-4 text-primary ${infoBranchErr.name_0 == 'err' ? 'text-[0px]' : 'text-[9px]'}`} >{infoBranchErr.name_0}</p>
                </label>
                <input 
                    className="w-full px-4 py-3 bg-surface-container-lowest border border-outline rounded-lg focus:ring-2 focus:ring-primary-container/20 focus:border-primary-container outline-none transition-all placeholder:text-outline-variant" 
                    id="name" 
                    placeholder="VD: Trinh thám" 
                    value={infoBranch.name}
                    onChange={handleInputChange}
                    type="text"
                    required/>
            </div>

            <div className="space-y-1">
                <label className="block text-sm font-label-bold text-on-surface" htmlFor="address">
                    Địa chỉ
                    <p className={`h-4 text-primary ${infoBranchErr.address_0 == 'err' ? 'text-[0px]' : 'text-[9px]'}`} >{infoBranchErr.address_0}</p>
                </label>
                <input 
                    className="w-full px-4 py-3 bg-surface-container-lowest border border-outline rounded-lg focus:ring-2 focus:ring-primary-container/20 focus:border-primary-container outline-none transition-all placeholder:text-outline-variant" 
                    id="address" 
                    value={infoBranch.address}
                    onChange={handleInputChange}
                    required/>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-1 gap-6">
                <div className="space-y-2">
                    <label className="block text-sm font-label-bold text-on-surface" htmlFor="map_url">
                        Địa chỉ map
                        <span  className="text-primary text-[12px]">
                            {(infoBranchErr.map_url_0 == "" || infoBranchErr.map_url_0 == null) ? ' (Mở Google và sao chép địa chỉ map)' : ' Vui lòng không chỉnh sửa (khi không cần thiết)'}
                        </span>
                    </label>
                    <div className="flex items-center gap-2">
                        <input 
                            className="flex-1 px-4 py-3 bg-surface-container-lowest border border-outline rounded-lg focus:ring-2 focus:ring-primary-container/20 focus:border-primary-container outline-none transition-all placeholder:text-outline-variant" 
                            id="map_url" 
                            placeholder="Lấy url từ google map, vui lòng không chỉnh sửa khi sao chép" 
                            type="text"
                            value={getSrcFromIframe(infoBranch.map_url)}
                            onChange={handleInputChange}/>

                        <div className="">
                            <Link to="https://maps.google.com" target="_blank" className="px-4 py-3 rounded-lg bg-green-400 text-white">
                                Mở GG Map
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="pt-8 border-t border-outline-variant/30 flex items-center justify-end gap-4">
                <button 
                    className="px-8 py-3 rounded-lg border border-outline text-secondary font-label-bold hover:bg-surface-container-high hover:text-on-surface transition-all active:scale-95" 
                    type="button"
                    onClick={closeModal}>
                    Hủy bỏ
                </button>
                <button 
                    className={`px-10 py-3 rounded-lg bg-primary-container text-on-primary font-label-bold shadow-lg shadow-primary-container/30  flex items-center gap-2
                        ${notPassValid ? 'hover:bg-primary transition-all cursor-not-allowed' : 'cursor-pointer active:scale-95'}`} 
                    type="submit"
                    disabled={notPassValid}>
                    <span className="material-symbols-outlined text-lg">
                        <Save size={20}/>
                    </span>
                            Lưu thông tin
                </button>
            </div>
        </form>
    </div>
}

export default FormUpdateInfoBranch