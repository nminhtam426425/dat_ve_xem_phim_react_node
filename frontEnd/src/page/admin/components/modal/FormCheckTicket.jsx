const FormCheckTicket = ({setDataItem}) => {
    return <>
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-outline-variant/30 shadow-sm flex flex-col md:flex-row gap-8 modal-content">
            <span className="close" onClick={()=>setDataItem(null)}>&times;</span>
            <div className="flex-1 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-2">
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Vé hợp lệ</span>
                <span className="text-secondary text-sm font-medium">#CRV-99821-XQ</span>
                </div>
                <h3 className="font-headline-lg text-headline-lg text-on-surface mb-2">Hành Tinh Cát: Phần Hai</h3>

                <div className="grid grid-cols-2 gap-y-4 gap-x-8 mt-4">
                <div>
                <p className="text-secondary text-xs font-label-bold uppercase">Giờ chiếu</p>
                <p className="font-bold text-on-surface">19:45</p>
                </div>
                    <div>
                    <p className="text-secondary text-xs font-label-bold uppercase">Phòng chiếu</p>
                    <p className="font-bold text-on-surface">Cinema 04 (IMAX)</p>
                    </div>
                    <div>
                    <p className="text-secondary text-xs font-label-bold uppercase">Vị trí ghế</p>
                    <p className="font-bold text-primary text-xl">H12, H13</p>
                    </div>
                    <div>
                    <p className="text-secondary text-xs font-label-bold uppercase">Loại vé</p>
                    <p className="font-bold text-on-surface">Người lớn (Couple)</p>
                    </div>
                </div>
                <button 
                    className="w-full py-4 mt-8 bg-primary-container text-on-primary rounded-xl font-bold shadow-lg shadow-primary-container/20 hover:translate-y-[-2px] transition-all"
                    onClick={() => {setDataItem(null)}}>
                    Hoàn tất &amp; Tiếp tục
                </button>
            </div>
        </div>
    </>
}

export default FormCheckTicket