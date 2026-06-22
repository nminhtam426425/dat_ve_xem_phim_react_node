import {
    Flashlight, 
    Keyboard, 
    RotateCcwIcon, 
    FileExclamationPoint
} from "lucide-react"

import { useRef, useState } from 'react'

const ContentQrCode = ({setDataItem}) => {
    const [isCamActive, setIsCamActive] = useState(false)
    const videoRef = useRef(null)
    const streamRef = useRef(null)

    const openCamera = async () => {
        try {
            const constraints = {
              video: { facingMode: 'environment' },
              audio: false,
            };
      
            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            streamRef.current = stream; 
      
            if (videoRef.current) {
              videoRef.current.srcObject = stream;
            }
            setIsCamActive(true); 
          } catch (error) {
            console.error("Lỗi khi mở camera:", error);
            alert("Không thể truy cập camera. Vui lòng kiểm tra quyền thiết bị!");
          }
    }

    const stopCamera = () => {
        if (streamRef.current) {
          streamRef.current.getTracks().forEach(track => track.stop());
          streamRef.current = null;
        }
        if (videoRef.current) {
          videoRef.current.srcObject = null;
        }
        setIsCamActive(false);
    }

    return <>
        <div className="flex-1 p-6 md:p-12 flex flex-col items-center justify-start gap-8">
        
            <div className="w-full max-w-2xl flex flex-col items-center gap-6">
            <div className="relative w-full aspect-square md:aspect-video rounded-3xl overflow-hidden shadow-2xl border-4 border-surface-container-highest group">
        
            <div className="absolute inset-0 bg-neutral-900 flex items-center justify-center">
            <img className="w-full h-full object-cover opacity-60 brightness-50" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBDmSBK6-yPyYPyj5X_kdI2nioBtE1T-0M60hPFtS61FkktTN_FFOT_rlAgSz1b1YHN7JpqynvvoUN8nXGgM8VaLhtVjl4Fhidz2fSMDTWkiww211Lua0upuL_kZ-uc1fHzUQz-LsX0U4qNX8UGYmPRapVvKOj3SWvKaWVBswTicmpixxx3D_1YhSiNNnDQ2eqLSS4uMaj7GcGpKiJpmUSb8iGuje3IIvLPKxQs0dkt9OtFCJBz4EawgQZCsYt0KVzy1zkzXvLl3v8"/>
        
            <div className="absolute z-10 w-64 h-64 border-2 border-white/40 rounded-2xl flex items-center justify-center">

                {/* <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover"/>
            
                <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary-container rounded-tl-xl"></div>
                <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary-container rounded-tr-xl"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary-container rounded-bl-xl"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary-container rounded-br-xl"></div>

                <div className="w-full h-[2px] bg-primary-container/80 shadow-[0_0_15px_rgba(229,9,20,0.8)] absolute top-1/2 -translate-y-1/2"></div> */}
        
            <div className="relative w-64 h-64 overflow-hidden rounded-2xl bg-black">
                    {/* 1. Thẻ hiển thị Camera */}
                    <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        onPlay={() => setIsCamActive(true)}
                        className="w-full h-full object-cover"
                    />

                    {/* 2. Khung overlay (Giữ nguyên từ code của bạn, bỏ 'absolute' ở cha vì đã gom vào container) */}
                    <div className="absolute inset-0 z-10 border-2 border-white/40 rounded-2xl pointer-events-none">
                        {/* 4 góc khung */}
                        <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary-container rounded-tl-xl"></div>
                        <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary-container rounded-tr-xl"></div>
                        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary-container rounded-bl-xl"></div>
                        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary-container rounded-br-xl"></div>

                        {isCamActive && (
                            <div className="w-full h-[2px] bg-primary-container/80 shadow-[0_0_15px_rgba(229,9,20,0.8)] absolute top-1/2 -translate-y-1/2 animate-pulse"></div>
                        )}
                    </div>
                </div>
            </div>

                <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-surface/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                    <span className="text-white text-label-bold font-label-bold flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full animate-pulse ${isCamActive ? 'bg-green-500' : 'bg-red-500'}`}></span>
                        { isCamActive ? 'Camera Đang Hoạt Động' : 'Camera Chưa Bật'}
                    </span>
                </div>
            </div>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4">
                <button 
                    className="w-14 h-14 rounded-full bg-surface/20 backdrop-blur-xl border border-white/30 text-white flex items-center justify-center hover:bg-primary transition-all active:scale-95 shadow-lg"
                    onClick={openCamera}>
                    <span className="material-symbols-outlined">
                        <Flashlight size={20}/>
                    </span>
                </button>
                <button 
                    className="w-14 h-14 rounded-full bg-surface/20 backdrop-blur-xl border border-white/30 text-white flex items-center justify-center hover:bg-primary transition-all active:scale-95 shadow-lg"
                    onClick={stopCamera}>
                    <span className="material-symbols-outlined">
                        <RotateCcwIcon size={20}/>
                    </span>
                </button>
            </div>
            </div>

            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
            <input className="w-full h-14 px-12 bg-white border border-outline rounded-xl focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-all outline-none font-medium" placeholder="Nhập mã vé thủ công..." type="text"/>
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-secondary">
                <Keyboard size={20}/>
            </span>
            </div>
                <button 
                    className="h-14 bg-inverse-surface text-white rounded-xl font-bold hover:bg-primary transition-all active:scale-[0.98] shadow-sm"
                    onClick={() => {setDataItem({})}}>
                    Kiểm tra mã
                </button>
            </div>
            </div>

            <div className="w-full max-w-4xl opacity-50 grayscale pointer-events-none mt-8 border-t border-dashed border-outline-variant pt-12">
                <div className="bg-red-50 p-6 rounded-3xl border border-red-200 flex items-center gap-6">
                    <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                        <span className="material-symbols-outlined text-2xl">
                            <FileExclamationPoint size={24}/>
                        </span>
                    </div>
                    <div>
                    <h4 className="font-bold text-red-800">Vé không hợp lệ</h4>
                    <p className="text-red-600 text-sm">Mã vé này đã được sử dụng lúc 18:30 hoặc không tồn tại trong hệ thống.</p>
                    </div>
                    <button className="ml-auto px-6 py-2 bg-white border border-red-200 text-red-700 rounded-lg font-bold text-sm">
                                            Xem chi tiết
                                        </button>
                </div>
            </div>
        </div>
    </>
}

export default ContentQrCode