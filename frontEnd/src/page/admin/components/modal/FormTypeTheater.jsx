import { useState, useEffect } from "react"
import {ChevronDown} from "lucide-react"
import {Save} from 'lucide-react'
import { toast } from "sonner"
import { handleInputOnChange, customeFetch,apiUserService, handleAddData, handleUpdateData } from "../../../config"
import { useLoading } from "../../../../LoadingContext.jsx"

function getName(countStandard, countVIP, countSweetbox) {
    const std = Number(countStandard) || 0
    const vip = Number(countVIP) || 0
    const sweet = Number(countSweetbox) || 0

    if((std + vip + sweet) > 26)
        return -1

    const alphabet = Array.from({ length: 26 }, (_, i) =>
      String.fromCharCode(65 + i)
    )
  
    let start = 0
    const result = []
  
    result.push(alphabet.slice(start, start + std))
    start += std
  
    result.push(alphabet.slice(start, start + vip))
    start += vip
  
    result.push(alphabet.slice(start, start + sweet))
    start += sweet

    return result
}
  
const FormTypeTheater = ({setDataItem, dataItem, setDatas}) => {
    const {showLoading, hideLoading} = useLoading()
    const [isActivate, setIsActivate] = useState(false)
    const [notPassValid, setNotPassValid] = useState(false)
    const [descTheater, setDescTheater] = useState("")
    const [idType, setIdType] = useState("0")
    const [typeTheater, setTypeTheater] = useState([])
    const [theater, setTheater] = useState({
        name:'',
        count_per_row:2,
        countStandard : 1,
        countVIP: 1,
        countSweetbox: 1
    })
    const [theaterError, setTheaterError] = useState({
        name_0:'err',
        count_per_row_0:""
    })

    useEffect(()=>{
        const getTheaterOnBranch = async () => {
            try{
                const res = await customeFetch(apiUserService.baseURL+'/branches/type/theater','non-authen','GET')
                if(res.ok){
                    const data = await res.json()
                    setTypeTheater(data)
                }
            }
            catch(err){
                console.log(err)
            }
        }
        getTheaterOnBranch()
    },[])

    useEffect(()=>{
        if(dataItem?.id){
            setTheater({
                name: dataItem.name || "",
                count_per_row: dataItem.count_per_row || 2,
                countStandard : dataItem.countStandard || 1,
                countVIP: dataItem.countVIP || 1,
                countSweetbox: dataItem.countSweetbox || 1
            })
            setTheaterError({
                name_0:'',
                count_per_row_0:""
            })
            setIdType(dataItem?.TypeTheater?.id)
            let temp = typeTheater.find(item => item.id == dataItem?.TypeTheater?.id)
            setDescTheater(temp.description)
        }
        else{
            setTheater({
                name:'',
                count_per_row:2,
                countStandard : 1,
                countVIP: 1,
                countSweetbox: 1 
            })
            setTheaterError({
                name_0:'err',
                count_per_row_0:""
            })
            setIdType(typeTheater[0]?.id)
            setDescTheater(typeTheater[0]?.description)
        }
    },[dataItem])

    const closeModal = () => {
        setDataItem(null)
    }

    // xử lý cho các input, dùng chung cho các input có cùng state là movie
    const handleInputChange = (e) => {
        handleInputOnChange(e, setTheater, setTheaterError, setNotPassValid, 'formTheater')
    }

    // xử lý thay đổi kiểu phòng
    const handleTypeTheater = (e) => {
        const {value} = e.target
        setIdType(Number(value))
        setDescTheater(typeTheater.find(item => item.id == value)?.description)
    }

    const addOrUpdateTheater = async (e) => {
        e.preventDefault()
        showLoading("Đang xử lý dữ liệu !")
        let method = 'POST'
        let dataForApi = {}
        if(dataItem?.id){
            method = 'PUT'
            let arrChair = getName(theater.countStandard, theater.countVIP,theater.countSweetbox)
            if(arrChair == -1){
                toast.error("Số hàng ghế không phù hợp trong hệ thống")
                setIsActivate(false)
            }
            dataForApi = {
                room_id: dataItem.id,
                name: theater.name,
                type: idType,
                countStandard: theater.countStandard,
                countVIP: theater.countVIP,
                countSweetbox: theater.countSweetbox,
                arrName: arrChair,
                arrType: ['Standard','VIP','Sweetbox'],
                count_per_row: theater.count_per_row
            }
        }
        else{
            let arrChair = getName(theater.countStandard, theater.countVIP,theater.countSweetbox)
            if(arrChair == -1){
                toast.error("Số hàng ghế không phù hợp trong hệ thống")
                setIsActivate(false)
            }
            dataForApi = {
                name: theater.name,
                type: idType,
                countStandard: theater.countStandard,
                countVIP: theater.countVIP,
                countSweetbox: theater.countSweetbox,
                arrName: arrChair,
                arrType: ['Standard','VIP','Sweetbox'],
                count_per_row: theater.count_per_row
            }
        }
        try{
            const res = await customeFetch(apiUserService.baseURL+'/branches/room','authen',method,JSON.stringify(dataForApi))
            if(res.ok){
                const data = await res.json()
                dataForApi.id = data.id
                dataForApi.TypeTheater = {}
                dataForApi.TypeTheater.id = data.type
                dataForApi.TypeTheater.type_name = data.type_name
                dataForApi.TypeTheater.description = data.description
                if(dataItem.id){
                    toast.success("Cập nhật phòng chiếu thành công !")
                    handleUpdateData(setDatas,'id',data.id, dataForApi)
                }
                else{
                    toast.success("Thêm phòng chiếu thành công !")
                    handleAddData(setDatas, dataForApi)
                }
            }
            else{
                const data = await res.json()
                toast.error(data.message)
            }
            setDataItem(null)
        }
        catch(err){
            console.log(err)
            toast.error("Thêm phòng chiếu thất bại !")
        }
        hideLoading()
    }

    return <>
        <form className="bg-primary-containe p-10 rounded-xl border border-white/10 shadow-2xl modal-content modal-content-h-90 overflow-y-scroll" method="POST" onSubmit={addOrUpdateTheater}>
            <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="font-label-bold text-label-bold gap-2" htmlFor="name">
                                Tên phòng
                            <p className={`h-4 text-primary ${theaterError.name_0 == 'err' ? 'text-[0px]' : 'text-[9px]'}`} >{theaterError.name_0}</p>
                        </label>
                        <div className="relative">
                            <input 
                                required
                                className="w-full px-4 py-3 bg-surface-container-lowest border border-outline rounded-lg focus:ring-2 focus:ring-primary-container/20 focus:border-primary-container outline-none transition-all placeholder:text-outline-variant" 
                                id="name"  
                                type="text"
                                value={theater.name}
                                onChange={handleInputChange}/>
                        </div>
                    </div>
                    <div className="space-y-2 relative">
                        <label className="font-label-bold text-label-bold " htmlFor="name">
                                Loại phòng chiếu
                                <p className={`h-4 text-primary ${theaterError.name_0 == 'err' ? 'text-[0px]' : 'text-[9px]'}`} ></p>
                        </label>
                        <select
                            required
                            value={idType}
                            onChange={handleTypeTheater} 
                            className="w-full appearance-none px-4 py-3.5 bg-surface-container-low border border-outline-variant/50 rounded-lg focus:ring-2 focus:ring-primary outline-none text-label-bold cursor-pointer pr-10"
                            >
                            {
                                typeTheater.map(item => <option key={item.id} value={item.id} >{item.type_name}</option>)
                            }
                        </select>
                        <span className="material-symbols-outlined absolute right-3 top-[62%] -translate-y-1/2 pointer-events-none text-secondary" data-icon="expand_more">
                            <ChevronDown size={20} />
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <label className="font-label-bold text-label-bold" htmlFor="count_per_row">
                                Số ghế mỗi hàng
                            <p className={`h-4 text-primary ${theaterError.count_per_row_0 == 'err' ? 'text-[0px]' : 'text-[9px]'}`} >{theaterError.count_per_row_0}</p>
                            </label>
                        </div>
                        <div className="relative">
                            <input 
                                className="w-full px-4 py-3 bg-surface-container-lowest border border-outline rounded-lg focus:ring-2 focus:ring-primary-container/20 focus:border-primary-container outline-none transition-all resize-none" 
                                id="count_per_row"
                                type="number"
                                value={theater.count_per_row}
                                onChange={handleInputChange}
                                required
                                min={2}
                                step={2} />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <label className="font-label-bold text-label-bold" htmlFor="countStandard">
                                Số hàng ghế thường                            
                                <p className={`h-4 text-primary ${theaterError.count_per_row_0 == 'err' ? 'text-[0px]' : 'text-[9px]'}`} ></p>
                            </label>
                        </div>
                        <div className="relative">
                            <input 
                                className="w-full px-4 py-3 bg-surface-container-lowest border border-outline rounded-lg focus:ring-2 focus:ring-primary-container/20 focus:border-primary-container outline-none transition-all resize-none" 
                                id="countStandard"
                                type="number"
                                value={theater.countStandard}
                                onChange={handleInputChange}
                                required
                                min={1} 
                                max={15}/>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <label className="font-label-bold text-label-bold flex items-center gap-2" htmlFor="countVIP">
                                Số hàng ghế VIP
                            </label>
                        </div>
                        <div className="relative">
                            <input 
                                className="w-full px-4 py-3 bg-surface-container-lowest border border-outline rounded-lg focus:ring-2 focus:ring-primary-container/20 focus:border-primary-container outline-none transition-all resize-none" 
                                id="countVIP"
                                type="number" 
                                value={theater.countVIP}
                                onChange={handleInputChange}
                                required
                                min={1}
                                max={8} />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <label className="font-label-bold text-label-bold flex items-center gap-2" htmlFor="countSweetbox">
                                Số hàng ghế cặp đôi
                            </label>
                        </div>
                        <div className="relative">
                            <input 
                                className="w-full px-4 py-3 bg-surface-container-lowest border border-outline rounded-lg focus:ring-2 focus:ring-primary-container/20 focus:border-primary-container outline-none transition-all resize-none" 
                                id="countSweetbox"
                                value={theater.countSweetbox}
                                onChange={handleInputChange}
                                min={1}
                                max={4}
                                required
                                type="number"  />
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <label className="font-label-bold text-label-bold flex items-center gap-2" htmlFor="description">
                        Mô tả phòng chiếu
                        </label>
                    </div>
                    <div className="relative">
                        <textarea 
                                readOnly
                                className="w-full px-4 pt-2 bg-surface-container-lowest border border-outline rounded-lg focus:ring-2 focus:ring-primary-container/20 focus:border-primary-container outline-none transition-all resize-none" 
                                id="description" 
                                placeholder="Mô tả ngắn gọn về phòng chiếu..." 
                                value={descTheater}
                                rows="6">
                        </textarea>
                    </div>
                </div>

                <div className="border-t border-outline-variant/30 flex items-center justify-end gap-4">
                    <button 
                        className="px-8 py-3 rounded-lg border border-outline text-secondary font-label-bold hover:bg-surface-container-high hover:text-on-surface transition-all active:scale-95" 
                        type="button"
                        onClick={closeModal}>
                        Hủy bỏ
                    </button>
                    <button 
                        className={`px-10 py-3 rounded-lg bg-primary-container text-on-primary font-label-bold shadow-lg shadow-primary-container/30  flex items-center gap-2
                            ${isActivate || notPassValid ? 'hover:bg-primary transition-all cursor-not-allowed' : 'cursor-pointer active:scale-95'}`} 
                        type="submit"
                        disabled={isActivate || notPassValid}>
                        <span className="material-symbols-outlined text-lg">
                            <Save size={20}/>
                        </span>
                                Lưu thông tin
                    </button>
                </div>
            </div>
        </form>
    </>
}

export default FormTypeTheater