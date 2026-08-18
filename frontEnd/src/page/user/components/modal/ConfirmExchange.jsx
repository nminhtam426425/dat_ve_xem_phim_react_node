import { useLoading } from "../../../../LoadingContext"
import { customeFetch, apiUserService } from "../../../config"
import { toast } from "sonner"

const ConfirmExchange = ({confirm, setConfirm, dataBeforeConfirm, setDatas }) => {
    const {userInfo, setUserInfo} = useLoading()
    const handleConfirmYes = async () => {
          try{
            if(Number(dataBeforeConfirm.point_cost) > Number(userInfo.reward_points)){
                toast.error("Bạn không đủ điểm để đổi voucher này!")
                setConfirm(false)
                return
            }
            const res = await customeFetch(apiUserService.baseURL+'/vouchers/user/exchange','authen','POST',JSON.stringify({idVoucher: dataBeforeConfirm.id}))
            if(res.ok){
                let remandPoint = userInfo.reward_points - dataBeforeConfirm.point_cost
                setUserInfo( pre => ({
                    ...pre,
                    reward_points: remandPoint
                }))
                setDatas(prev =>prev.filter(item => item.id !== dataBeforeConfirm.id))
                toast.success("Bạn đã đổi thưởng thành công!")
            }
            else{
                const data = await res.json()
                toast.error(data.message)
            }
        }
        catch(err){
            console.log(err)
        }
        setConfirm(false)
    }

    return <>
        <div className="modal" style={{display: confirm ? 'flex' : 'none'}}>
            <div className="modal-content p-0">
                <div className="w-[300px] md:w-[700px] rounded-2xl bg-white p-6 shadow-xl transition-all dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
                    <div className="flex items-start gap-4">
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                                Xác nhận đổi voucher này - Điểm hiện tại: {userInfo?.reward_points}
                            </h3>
                            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                                Bạn có muốn đổi voucher này ?
                            </p>
                        </div>
                    </div>

                    <div className="mt-6 flex gap-2 justify-end">
                        <button 
                            className="inline-flex items-center justify-center rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm font-semibold text-zinc-700 shadow-xs hover:bg-zinc-50 active:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700/50 cursor-pointer transition-colors"
                            onClick={()=>setConfirm(false)}
                            >Hủy bỏ
                        </button>

                        <button 
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

export default ConfirmExchange