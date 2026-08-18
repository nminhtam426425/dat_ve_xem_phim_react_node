import {customeFetch, apiUserService,  handleUpdateData} from '../../../config.js'
import { toast } from 'sonner'
import { useLoading } from '../../../../LoadingContext.jsx'


const ConfirmLockMovie = ({confirm, setConfirm, dataItemBeforeConfirm, setDataItemBeforeConfirm, setDatas, type}) => {
    const {showLoading, hideLoading} = useLoading()
    const handleConfirmYes = () => {
        const deleteData = async () => {
            showLoading("Đang xử lý dữ liệu ... ")
            try{
                if(Number(dataItemBeforeConfirm.newShowtimes_count) > 0){
                    toast.error(`Phim ${dataItemBeforeConfirm.title} đang có ${dataItemBeforeConfirm.newShowtimes_count} suất chiếu mới !`) 
                    setConfirm('')
                    hideLoading()
                    return
                }
                let dataForApi = {
                    id: dataItemBeforeConfirm.id,
                    status: type == 'lock' ? 'ended' : 'showing'
                }
                const res = await customeFetch(apiUserService.baseURL+'/movies', 'authen','PUT', JSON.stringify(dataForApi))
                if(res.ok){
                    if(type == 'lock')
                        dataItemBeforeConfirm.status = 'ended'
                    else
                        dataItemBeforeConfirm.status = 'showing'
                    toast.success(`Đã ${type == 'lock' ? 'kết thúc' : 'mở lại'} phim ${dataItemBeforeConfirm.title}`)
                    handleUpdateData(setDatas, 'id', dataForApi.id, dataItemBeforeConfirm)
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
        setConfirm(false)
    }
    return <>
        <div className="modal" style={{display: confirm ? 'flex' : 'none'}}>
            <div className="modal-content p-0">
                <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl transition-all dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
                    <div className="flex items-start gap-4">
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                                Xác nhận {type == 'lock' ? 'kết thúc suất chiếu của phim' : 'mở lại suất chiếu của phim'} 
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

export default ConfirmLockMovie