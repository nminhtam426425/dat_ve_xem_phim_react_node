import { Plus, Pencil, Trash2, Save } from "lucide-react"
import { useRef, useState } from "react"
import { uploadCloudinary, customeFetch, apiUserService } from "../../../config"
import { useLoading } from "../../../../LoadingContext"

const FormMovieTrending = ({dataItem, setDataItem, setMovieTrending}) => {
    const {showLoading,hideLoading} = useLoading()
    const imageInput = useRef(null)
    const [moviePoster, setMoviePoster] = useState({
        file: null,
        url:null
    })

    const handleAddMovie = async (e) => {
        e.preventDefault()
        showLoading("Đang xử lý, vui lòng chờ ... !")
        const img = await uploadCloudinary(moviePoster.file)
        let dataForApi = {
            movie_id: dataItem.id,
            background_url: img.url,
            pub_id_bg: img.publicId
        }
        try{
            const res = await customeFetch(apiUserService.baseURL+'/movies/trending','authen','POST',JSON.stringify(dataForApi))
            if(res.ok){
                setMovieTrending({
                    ...dataItem,
                    movie_id: dataItem.id
                })
                setMoviePoster({
                    file: null,
                    url:null
                })
                setDataItem(null)
            }
        }
        catch(err){
            console.log(err)
        }
        hideLoading()
    }

    const handleChoseImgFormClient = (e) => {
        const file = e.target.files[0]
       
        const validExtensions = ['image/jpeg', 'image/png', 'image/jpg']
        
        if (file.type && validExtensions.includes(file.type)) {
            setMoviePoster({
                file,
                url: URL.createObjectURL(file)
            })
        }
        else 
            alert(`File "${file.name}" không đúng định dạng (Chỉ nhận JPG, PNG, JPEG)`)
    }

    const choseImgFormClient = () => {
        imageInput.current.click()
    }

    const deleteImgIsChosen = () => {
        URL.revokeObjectURL(moviePoster.url)
        setMoviePoster({
            file: null,
            url: null
        })
        if (imageInput.current) {
            imageInput.current.value = ""
        }
    }

    const closeModal = () => {
        setDataItem(null)
    }

    return <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/20 modal-content modal-content-h-90">
        <span className="close" onClick={closeModal}>&times;</span>

        <form method="POST" className="p-8 space-y-4" onSubmit={handleAddMovie}>
            <div className="w-[700px] h-[400px] space-y-4">
                <label className="block text-sm font-label-bold text-secondary uppercase tracking-wider">Background Phim Hot Nhất</label>
                <div className="relative h-[100%] group cursor-pointer border-2 border-dashed border-outline-variant rounded-xl flex flex-col items-center justify-center bg-surface-container transition-all hover:border-primary-container hover:bg-surface-container-high overflow-hidden">
                    <input accept=".jpg, .jpeg, .png" className="hidden" id="poster-input" type="file" ref={imageInput} onChange={handleChoseImgFormClient}/>
                    <div className="flex flex-col items-center text-center p-6" id="preview-placeholder" onClick={choseImgFormClient}>
                        <span className="material-symbols-outlined text-4xl text-outline mb-4 group-hover:text-primary-container transition-colors">
                            <Plus size={20}/>
                        </span>
                        <p className="text-sm font-semibold text-on-surface">Tải lên poster</p>
                    </div>

                    <img className={`absolute inset-0 w-full h-full object-cover ${!moviePoster.url ? 'hidden' : ''}`} src={moviePoster.url} id="poster-preview"/>
                </div>
            </div>

            <div className="flex gap-2 justify-end mt-16">
                <button type="button" className={`cursor-pointer p-1 rounded-lg hover:bg-surface-container text-tertiary ${!moviePoster.url ? 'hidden' : ''}`}>
                    <Pencil size={20} onClick={choseImgFormClient}/>
                </button>
                <button  type="button" className={`cursor-pointer p-1 rounded-lg hover:bg-error-container hover:text-error ${!moviePoster.url ? 'hidden' : ''}`}>
                    <Trash2 size={20} onClick={deleteImgIsChosen}/>
                </button>
            </div>

            <div className="pt-2 border-t border-outline-variant/30 flex items-center justify-end gap-4">
                <button 
                    className="px-8 py-3 rounded-lg border border-outline text-secondary font-label-bold hover:bg-surface-container-high hover:text-on-surface transition-all active:scale-95" 
                    type="button"
                    onClick={closeModal}>
                    Hủy bỏ
                </button>
                <button 
                    className={`px-10 py-3 rounded-lg bg-primary-container text-on-primary font-label-bold shadow-lg shadow-primary-container/30 flex items-center gap-2 cursor-pointer active:scale-95'`} 
                    type="submit"
                    disabled={!moviePoster.url ? true : false}>
                    <span className="material-symbols-outlined text-lg">
                        <Save size={20}/>
                    </span>
                        Lưu thông tin
                </button>
            </div>
        </form>
    </div>
}

export default FormMovieTrending