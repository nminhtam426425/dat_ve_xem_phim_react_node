import {FileExclamationPoint} from "lucide-react"

const FormCheckTicket = ({dataItem, setDataItem}) => {
    return <>
        {
            dataItem && dataItem?.type == 'success'
            ?
            <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-outline-variant/30 shadow-sm flex flex-col md:flex-row gap-8 modal-content">
                <div className="flex-1 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-2">
                        <span className="bg-green-100 text-green-700 px-12 py-4 rounded-full text-xs font-bold uppercase tracking-wider mx-auto">#Vé hợp lệ</span>
                    </div>
                    <h3 className="font-headline-lg text-headline-md text-on-surface mb-2 text-center">Hành Tinh Cát: Phần Hai</h3>

                    <div className="grid grid-cols-2 gap-y-4 gap-x-8 mt-4">
                        <div>
                            <p className="text-secondary text-xs font-label-bold uppercase">Giờ chiếu</p>
                            <p className="font-bold text-on-surface">{dataItem?.data?.start_time}</p>
                        </div>
                        <div>
                            <p className="text-secondary text-xs font-label-bold uppercase">Phòng chiếu</p>
                            <p className="font-bold text-on-surface">{dataItem?.data?.theater}</p>
                        </div>
                        <div>
                            <p className="text-secondary text-xs font-label-bold uppercase">Vị trí ghế</p>
                            <p className="font-bold text-primary text-xl">{dataItem?.data?.seats}</p>
                        </div>
                        <div>
                            <p className="text-secondary text-xs font-label-bold uppercase">Độ tuổi</p>
                            <p className="font-bold text-primary text-xl">{dataItem?.data?.maxAge}+</p>
                        </div>
                    </div>

                    <button 
                        className="w-full py-4 mt-8 bg-primary-container text-on-primary rounded-xl font-bold shadow-lg shadow-primary-container/20 hover:translate-y-[-2px] transition-all"
                        onClick={() => {setDataItem(null)}}>
                        Hoàn tất
                    </button>
                </div>
            </div>
            :
            <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-outline-variant/30 shadow-sm flex flex-col md:flex-row gap-8 modal-content">
                <div className="flex-1 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-2">
                        <span className="bg-primary/70 text-white px-8 py-4 rounded-full text-xs font-bold uppercase tracking-wider mx-auto">#Vé hợp không hợp lệ</span>
                    </div>
                        <div className="w-full max-w-4xl opacity-80 grayscale pointer-events-none border-t border-dashed border-outline-variant pt-2">
                            <div className="bg-red-50 p-6 rounded-3xl border border-red-200 flex items-center gap-6">
                                <div className="w-12 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                                    <span className="material-symbols-outlined text-2xl">
                                        <FileExclamationPoint size={24}/>
                                    </span>
                                </div>
                                <div>
                                    <p className="text-red-600 text-sm">{dataItem?.message}</p>
                                </div>
                            </div>
                        </div>
                    <button 
                        className="w-full py-4 mt-8 bg-primary-container text-on-primary rounded-xl font-bold shadow-lg shadow-primary-container/20 hover:translate-y-[-2px] transition-all"
                        onClick={() => {setDataItem(null)}}>
                        Hoàn tất
                    </button>
                </div>
            </div>
        }
    </>
}

export default FormCheckTicket