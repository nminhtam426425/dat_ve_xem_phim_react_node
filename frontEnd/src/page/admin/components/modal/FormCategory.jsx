import { useEffect, useState } from "react"
import {AwardIcon, Save} from "lucide-react"
import { toast } from "sonner"
import { customeFetch, apiUserService, handleInputOnChange, handleAddData, handleUpdateData } from "../../../config"

const FormCategory = ({dataItem, setDataItem, setDatas}) => {
    const [notPassValid, setNotPassValid] = useState(false)

    const [category, setCategory] = useState({
        name: "abc",
        age_permit: 16
    })

    const [categoryErr, setCategoryErr] = useState({
        name_0: "err",
        age_permit_0: "err"
    })

    useEffect(()=>{
        if(dataItem?.id){
            setCategory({
                name: dataItem?.name,
                age_permit: dataItem?.age_permit
            })
        }
        else{
            setCategory({
                name: "",
                age_permit: 16
            })
        }
    },[dataItem])

    const handleInputChange = (e) => {
        handleInputOnChange(e, setCategory, setCategoryErr, setNotPassValid, "formCategory")
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
                name: category.name,
                age_permit: Number(category.age_permit)
            }
        }
        else {
            dataForApi = {
                name: category.name,
                age_permit: Number(category.age_permit)
            }
        }
        try{
            const res = await customeFetch(apiUserService.baseURL+'/categories','authen',method,JSON.stringify(dataForApi))
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
                    <p className={`h-4 text-primary ${categoryErr.name_0 == 'err' ? 'text-[0px]' : 'text-[9px]'}`} >{categoryErr.name_0}</p>
                </label>
                <input 
                    className="w-full px-4 py-3 bg-surface-container-lowest border border-outline rounded-lg focus:ring-2 focus:ring-primary-container/20 focus:border-primary-container outline-none transition-all placeholder:text-outline-variant" 
                    id="name" 
                    placeholder="VD: Trinh thám" 
                    value={category.name}
                    onChange={handleInputChange}
                    type="text"
                    required/>
            </div>

            <div className="space-y-1">
                <label className="block text-sm font-label-bold text-on-surface" htmlFor="age_permit">
                    Độ tuổi quy định
                    <p className={`h-4 text-primary ${categoryErr.age_permit_0 == 'err' ? 'text-[0px]' : 'text-[9px]'}`} >{categoryErr.age_permit_0}</p>
                </label>
                <input 
                    className="w-full px-4 py-3 bg-surface-container-lowest border border-outline rounded-lg focus:ring-2 focus:ring-primary-container/20 focus:border-primary-container outline-none transition-all placeholder:text-outline-variant" 
                    id="age_permit" 
                    value={category.age_permit}
                    onChange={handleInputChange}
                    type="number"
                    min={5}
                    required/>
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

export default FormCategory