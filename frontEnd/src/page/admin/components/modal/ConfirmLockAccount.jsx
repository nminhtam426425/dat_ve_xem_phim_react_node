import {customeFetch, apiUserService, handleUpdateData} from '../../../config.js'
import { toast } from 'sonner'
import { useLoading } from '../../../../LoadingContext.jsx'


const ConfirmLockAccount = ({confirm, setConfirm, dataItemBeforeConfirm, setDataItemBeforeConfirm, setDatas, type, dataCal, setDataCal}) => {
    const {showLoading, hideLoading} = useLoading()
    const handleConfirmYes = () => {
        const deleteData = async () => {
            showLoading("Đang xử lý dữ liệu ... ")
            try{
                let dataForApi = {
                    id: dataItemBeforeConfirm.id,
                    is_activating: type == 'lock' ? 0 : 1
                }
                const res = await customeFetch(apiUserService.baseURL+'/users/activate', 'authen','PUT', JSON.stringify(dataForApi))
                if(res.ok){
                    if(type == 'lock')
                        dataItemBeforeConfirm.is_activating = 0
                    else 
                        dataItemBeforeConfirm.is_activating = 1
                    handleUpdateData(setDatas, 'id', dataForApi.id, dataItemBeforeConfirm)
                    let count = dataCal.active
                    count = (type == 'lock') ? --count : ++count 
                    setDataCal(pre => ({
                        ...pre,
                        ['active']: count
                    }))
                    setDatas(pre => pre.filter(item => item.id != dataForApi.id))
                }
            }
            catch(err){
                toast.error("Thao tác thất bại !")
                console.log(err)
            }
            setDataItemBeforeConfirm(null)
            setConfirm('')
            hideLoading()
        }
        deleteData()
    }
    const handleConfirmNo = () => {
        setConfirm('')
    }
    return <>
        <div className="modal" style={{display: confirm != '' ? 'flex' : 'none'}}>
            <div className="modal-content p-0">
                <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl transition-all dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
                    <div className="flex items-start gap-4">
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                                Xác nhận {type == 'lock' ? 'khóa tài khoản' : 'mở khóa tài khoàn'} 
                            </h3>
                            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                                Bạn có chắc chắn muốn thực hiện hành động này không?
                            </p>
                        </div>
                    </div>

                    <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                    <button 
                        type="button" 
                        className="inline-flex items-center justify-center rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm font-semibold text-zinc-700 shadow-xs hover:bg-zinc-50 active:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700/50 cursor-pointer transition-colors"
                        onClick={handleConfirmNo}
                        >Hủy bỏ
                    </button>

                    <button 
                        type="button" 
                        className="inline-flex items-center justify-center rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-red-500 active:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600 cursor-pointer transition-colors"
                        onClick={handleConfirmYes}
                        >Xác nhận
                    </button>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default ConfirmLockAccount