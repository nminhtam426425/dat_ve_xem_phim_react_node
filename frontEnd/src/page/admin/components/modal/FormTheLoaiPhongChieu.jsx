import { useEffect, useState } from "react"
import {AwardIcon, Save} from "lucide-react"
import { toast } from "sonner"
import { customeFetch, apiUserService, handleInputOnChange, handleAddData, handleUpdateData } from "../../../config"

const FormTypeTheater = ({dataItem, setDataItem, setDatas}) => {
    const [notPassValid, setNotPassValid] = useState(false)

    const [typeTheater, setTypeTheater] = useState({
        type_name: "",
        description: ""
    })

    const [typeTheaterErr, setTypeTheaterErr] = useState({
        type_name_0: "err",
        description_0: "err"
    })

    useEffect(()=>{
        if(dataItem?.id){
            setTypeTheater({
                type_name: dataItem?.type_name,
                description: dataItem?.description
            })
        }
        else{
            setTypeTheater({
                type_name: "",
                description: ""
            })
        }
    },[dataItem])

    const handleInputChange = (e) => {
        handleInputOnChange(e, setTypeTheater, null, null, "")
    }

    const closeModal = () => {
        setDataItem(null)
    }

    const handleAddOrUpdate = async (e) => {
        e.preventDefault()
        let method = "POST"
        let dataForApi = {}
        if(dataItem.id){
            method = 'PUT'
            dataForApi = {
                id: dataItem.id,
                type_name: typeTheater.type_name,
                description: typeTheater.description
            }
        }
        else {
            dataForApi = {
                type_name: typeTheater.type_name,
                description: typeTheater.description
            }
        }
        try{
            const res = await customeFetch(apiUserService.baseURL+'/branches/type/theater','authen',method,JSON.stringify(dataForApi))
            if(res.ok){
                const data = await res.json()
                if(method == 'PUT'){
                    handleUpdateData(setDatas,'id',data.id, data)
                    setDataItem(null)
                    toast.success("Cập nhật thành công !")
                }
                else {
                    handleAddData(setDatas, data)
                    setDataItem(null)
                    toast.success("Thêm thành công !")
                }
            }
        }
        catch(err){
            toast.error("Thao tác thất bại !")
            console.log(err)
        }
    }

    return <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/20 modal-content">
        <span className="close" onClick={closeModal}>&times;</span>
        <form method="POST" className="p-8 space-y-4" onSubmit={handleAddOrUpdate}>
            <div className="space-y-1">
                <label className="block text-sm font-label-bold text-on-surface" htmlFor="name">
                    Tên thể loại
                    <p className={`h-4 text-primary ${typeTheaterErr.type_name_0 == 'err' ? 'text-[0px]' : 'text-[9px]'}`} >{typeTheaterErr.type_name_0}</p>
                </label>
                <input 
                    className="w-full px-4 py-3 bg-surface-container-lowest border border-outline rounded-lg focus:ring-2 focus:ring-primary-container/20 focus:border-primary-container outline-none transition-all placeholder:text-outline-variant" 
                    id="type_name" 
                    placeholder="VD: Tiêu chuẩn" 
                    type="text"
                    value={typeTheater.type_name}
                    onChange={handleInputChange}
                    required/>
            </div>

            <div className="space-y-1">
                <label className="block text-sm font-label-bold text-on-surface" htmlFor="age_permit">
                    Độ tuổi quy định
                    <p className={`h-4 text-primary ${typeTheaterErr.description_0 == 'err' ? 'text-[0px]' : 'text-[9px]'}`} >{typeTheaterErr.description_0}</p>
                </label>
                <textarea 
                    className="w-full px-4 py-3 bg-surface-container-lowest border border-outline rounded-lg focus:ring-2 focus:ring-primary-container/20 focus:border-primary-container outline-none transition-all resize-none" 
                    id="description" 
                    placeholder="Mô tả về loại phòng chiếu..."
                    value={typeTheater.description}
                    onChange={handleInputChange} 
                    rows="6">
                </textarea>
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

export default FormTypeTheater