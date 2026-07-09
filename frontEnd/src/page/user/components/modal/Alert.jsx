const Alert = ({confirm, setConfirm, message}) => {
    
    return <>
        <div className="modal" style={{display: confirm ? 'flex' : 'none'}}>
            <div className="modal-content p-0">
                <div className="w-full md:w-[500px] rounded-2xl bg-white p-6 shadow-xl transition-all dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
                    <div className="flex items-start gap-4">
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                                Thông báo
                            </h3>
                            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                                {message}
                            </p>
                        </div>
                    </div>

                    <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">

                    <button 
                        type="button" 
                        className="inline-flex items-center justify-center rounded-xl bg-green-600 px-4 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-green-500 cursor-pointer transition-colors"
                        onClick={()=>setConfirm(false)}
                        >Oke
                    </button>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default Alert