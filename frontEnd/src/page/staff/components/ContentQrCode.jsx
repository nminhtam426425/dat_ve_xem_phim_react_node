import {Flashlight, Keyboard, RotateCcwIcon, FileExclamationPoint} from "lucide-react"
import { useRef, useState, useEffect } from 'react'
import { Html5Qrcode } from 'html5-qrcode'

const ContentQrCode = ({setResultScan}) => {
    const [isCamActive, setIsCamActive] = useState(false)
    const qrScannerRef = useRef(null)

    useEffect(() => {
        const html5QrCode = new Html5Qrcode("qr-reader-bridge")
        qrScannerRef.current = html5QrCode
    
        return () => {
            // Kiểm tra xem có đang scan không để dừng hẳn camera trước khi hủy component
            if (qrScannerRef.current && qrScannerRef.current.isScanning) {
                qrScannerRef.current.stop()
                    .then(() => {
                        console.log("Camera đã được giải phóng an toàn khi unmount.")
                    })
                    .catch(err => console.error("Lỗi giải phóng camera:", err))
            }
        }
    }, [])

    const openCamera = async () => {
        if (typeof window === 'undefined') return
        // nếu đang bật cam thì không cần bật lại
        if (isCamActive || (qrScannerRef.current && qrScannerRef.current.isScanning)) return

        try {
            const config = { fps: 10, qrbox: { width: 250, height: 250 } }
        
            const cameraConfig = { facingMode: "environment" }
    
            await qrScannerRef.current.start(
                cameraConfig,
                config,
                (decodedText) => {
                    console.log(decodedText)
                    setResultScan(decodedText)
                    stopCamera()
                }
            )
        
            setIsCamActive(true)
    
          } catch (err) {
            console.error("Không thể mở camera hoặc khởi tạo QR Scanner:", err)
            setIsCamActive(false)
          }
    }

    const stopCamera = async () => {
        if (qrScannerRef.current && qrScannerRef.current.isScanning) {
            try {
                await qrScannerRef.current.stop()
            } catch (err) {
                console.error("Lỗi khi dừng camera từ thư viện:", err)
            }
        }
      
        setIsCamActive(false);
    }

    return <>
        <div className="flex-1 p-6 md:p-12 flex flex-col items-center justify-start gap-8">
            <div className="w-full max-w-2xl flex flex-col items-center gap-6">
                <div className="relative w-full aspect-square md:aspect-video rounded-3xl overflow-hidden shadow-2xl border-4 border-surface-container-highest group">
                    <div className="absolute inset-0 bg-neutral-900 flex items-center justify-center">
                        <img className="w-full h-full object-cover opacity-60 brightness-50" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBDmSBK6-yPyYPyj5X_kdI2nioBtE1T-0M60hPFtS61FkktTN_FFOT_rlAgSz1b1YHN7JpqynvvoUN8nXGgM8VaLhtVjl4Fhidz2fSMDTWkiww211Lua0upuL_kZ-uc1fHzUQz-LsX0U4qNX8UGYmPRapVvKOj3SWvKaWVBswTicmpixxx3D_1YhSiNNnDQ2eqLSS4uMaj7GcGpKiJpmUSb8iGuje3IIvLPKxQs0dkt9OtFCJBz4EawgQZCsYt0KVzy1zkzXvLl3v8"/>
                    
                        <div className="absolute w-64 h-64 border-2 border-white/40 rounded-2xl flex items-center justify-center">
                            <div className="relative w-64 h-64 overflow-hidden rounded-2xl bg-black">
                                {/* thẻ bọc bởi thư viên và sinh ra thẻ video */}
                                <div id="qr-reader-bridge" className={`w-full h-full ${isCamActive ? 'block' : 'hidden'}`}></div>

                                <div className="absolute inset-0 border-2 border-white/40 rounded-2xl pointer-events-none">
                                    {/* 4 góc khung */}
                                    <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary-container rounded-tl-xl"></div>
                                    <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary-container rounded-tr-xl"></div>
                                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary-container rounded-bl-xl"></div>
                                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary-container rounded-br-xl"></div>

                                    {isCamActive && (
                                        <div
                                            className="w-full h-[2px] bg-primary-container/80 shadow-[0_0_15px_rgba(229,9,20,0.8)] absolute top-1/2 -translate-y-1/2 animate-pulse"
                                            style={{
                                                animation: 'scan-vertical 3s linear infinite'
                                            }}>
                                        </div>
                                    )}
                                </div>
                            </div>

                        </div>

                            <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-surface/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                                <span className="text-white text-label-bold font-label-bold flex items-center gap-2">
                                    <span className={`w-2 h-2 rounded-full animate-pulse ${isCamActive ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                    { isCamActive ? 'Camera Đang Hoạt Động' : 'Camera Chưa Bật'}
                                </span>
                            </div>
                    </div>

                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-center gap-4 z-10">
                        <button 
                            className="w-14 h-14 rounded-full bg-surface/20 backdrop-blur-xl border border-white/30 text-white flex items-center justify-center hover:bg-primary transition-all active:scale-95 shadow-lg"
                            onClick={()=>openCamera()}>
                            <span className="material-symbols-outlined">
                                <Flashlight size={20}/>
                            </span>
                        </button>
                        <button 
                            className="w-14 h-14 rounded-full bg-surface/20 backdrop-blur-xl border border-white/30 text-white flex items-center justify-center hover:bg-primary transition-all active:scale-95 shadow-lg"
                            onClick={()=>stopCamera()}>
                            <span className="material-symbols-outlined">
                                <RotateCcwIcon size={20}/>
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        <style>
            {`
                @keyframes scan-vertical {
                0% { top: 0%; opacity: 0.3; }
                50% { opacity: 1; }
                100% { top: 100%; opacity: 0.3; }
                }
            `}
        </style>
        </div>
    </>
}

export default ContentQrCode