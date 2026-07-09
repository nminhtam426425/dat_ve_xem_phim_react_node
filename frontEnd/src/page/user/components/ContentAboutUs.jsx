import { useState } from "react"

const ContetnAboutUs = ({datas}) => {
    const [isLoading, setIsLoading] = useState(true);
   
    return <>
        <main className="w-full">
            <section className="py-20 px-6 max-w-7xl mx-auto w-300px md:w-full">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div className="order-2 md:order-1">
                        <h2 className="text-3xl md:text-4xl font-bold text-on-surface mb-8 tracking-tight">Vị trí của chúng tôi.</h2>
                        <div className="space-y-6 text-on-surface-variant text-body-lg leading-relaxed">
                            <p> <span className="underline">Tên cơ sở:</span> {datas?.name}</p>
                            <p><span className="underline">Địa chỉ:</span> {datas?.address}</p>
                            <p><span className="underline">Thông tin liện lạc:</span> Liên hệ trưc tiếp tại quầy</p>
                        </div>
                    </div>

                    <div className="order-1 md:order-2">
                        <p>Vị trí trên bản đổ: </p>
                        <div style={{ position: 'relative', width: '600px', height: '450px' }}>
      
                            {isLoading && (
                                <div style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    backgroundColor: '#f3f3f3', 
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    zIndex: 1,
                                }}>
                                <div className="spinner">Đang tải bản đồ...</div>
                                </div>
                            )}

                            <iframe
                                src={datas?.map_url == "" ? null : datas?.map_url}
                                width="100%"
                                height="450"
                                style={{ border: 0 }}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                onLoad={() => setIsLoading(false)} 
                            />
                        </div>
                    </div>
                </div>
            </section>
    </main>
    </>
}

export default ContetnAboutUs