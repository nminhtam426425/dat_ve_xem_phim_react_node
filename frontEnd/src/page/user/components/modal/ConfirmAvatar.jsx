
const ConfirmAvatar = ({confirm, setConfirm, imageInput }) => {
    // cập nhật lại ảnh lên database
    const handleConfirmYes = async () => {
        imageInput.current.click()
        setConfirm(false)
    }

    return <>
        <div className="modal" style={{display: confirm ? 'flex' : 'none'}}>
            <div className="modal-content p-0">
                <div className="w-[300px] md:w-[700px] rounded-2xl bg-white p-6 shadow-xl transition-all dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
                    <div className="flex items-start gap-4">
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                                Xác nhận hành động
                            </h3>
                            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                                Cập nhập lại ảnh đại diện ?
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

export default ConfirmAvatar