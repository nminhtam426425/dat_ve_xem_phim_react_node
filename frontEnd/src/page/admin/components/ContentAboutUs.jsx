import { useState } from "react"

const ContetnAboutUs = ({datas, setDataItem}) => {
    const [isLoading, setIsLoading] = useState(true)
   
    return <>
        <main className="w-full mt-4">
            <section  className="py-2 px-6 max-w-7xl mx-auto w-300px md:w-full flex justify-between">
                <div>
                    <h2 className="text-headline-lg font-black text-on-surface tracking-tight">Thông tin vị trí</h2>
                </div>
                <div className="flex items-center">
                    <button
                        onClick={()=>setDataItem(datas[0])} 
                        className="px-6 py-3 border border-outline rounded-xl font-bold text-primary bg-surface hover:bg-surface-container-high transition-all"
                        >Sửa thông tin
                    </button>
                </div>
            </section>

            <section className="pt-20 px-6 max-w-7xl mx-auto w-300px md:w-full">
                <div className="grid md:grid-cols-2 gap-16 items-start">
                    <div className="order-2 md:order-1">
                        <div className="space-y-6 text-on-surface-variant text-body-lg leading-relaxed">
                            <p> <span className="underline">Tên cơ sở:</span> {datas[0]?.name}</p>
                            <p><span className="underline">Địa chỉ:</span> {datas[0]?.address}</p>
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
                                src={datas[0]?.map_url == "" ? null : datas[0]?.map_url}
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