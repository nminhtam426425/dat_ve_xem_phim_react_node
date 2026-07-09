import {Plus,Save,Clock, Trash2, Pencil} from "lucide-react"
import { useEffect, useRef, useState } from "react"
import {customeFetch, 
    apiUserService, 
    handleInputOnChange,
    handleAddData,
    handleUpdateData,
    uploadCloudinary
} from '../../../config.js'
import {formatDate2} from '../../../validate.js'
import { toast } from "sonner"
import { useLoading } from "../../../../LoadingContext.jsx"
import { Link } from "react-router-dom"

const FormMovie = ({dataItem,setDataItem, setDatas, categories}) => {
    const {showLoading, hideLoading} = useLoading()
    const [notPassValid, setNotPassValid] = useState(true)
    const [movie, setMovie] = useState({
        title: "",
        release_date: formatDate2(new Date()),
        duration: 90,
        director: "",
        trailer_url: "",
        actor: "",
        synopsis: ""
    })

    const [movieError, setMovieError] = useState({
        title_0: "",
        director_0: "",
        actor_0: "",
        synopsis_0: "",
        release_date_0: ""
    })
    
    const [moviePoster, setMoviePoster] = useState({
        file: null,
        url:null
    })

    const [categorieForCreate, setCategorieForCreate] = useState([])
    const imageInput = useRef(null)

    // xử lý khi có dateItem của modal để pop-up
    useEffect(()=>{
        if(dataItem?.id){
            setMovie(
                {
                    title: dataItem.title || "",
                    release_date: dataItem.release_date.substring(0,10) || "",
                    duration: dataItem.duration || 90,
                    director: dataItem.director || "",
                    trailer_url: dataItem.trailer_url || "",
                    actor: dataItem.actor || "",
                    synopsis:dataItem.description || ""
                }
            )
            setCategorieForCreate( dataItem?.Categories?.map( item => item.id) || [])
            setMoviePoster({
                file: null,
                url: dataItem.poster_url || ""
            })
            setNotPassValid(false)
        }
        // sau khi sửa hoặc thêm thì reset lại để tắt modal
        else{
            setNotPassValid(true)
            setMovie(
                {
                    title:  "",
                    release_date: "",
                    duration:  90,
                    director:  "",
                    trailer_url:  "",
                    actor:  "",
                    synopsis: ""
                }
            )
            setCategorieForCreate([])
            setMoviePoster({
                file: null,
                url: null
            })
        }
        setMovieError({
            title_0: "",
            director_0: "",
            actor_0: "",
            synopsis_0: ""
        })
    },[dataItem]) 

    // xử lý cho các input, dùng chung cho các input có cùng state là movie
    const handleInputChange = (e) => {
        handleInputOnChange(e, setMovie, setMovieError, setNotPassValid, "formMovie")
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

    const handleOnChangeService = (e) => {
        let isChose = e.target.checked
        const valueAmenities = Number(e.target.value)
        if(isChose)
            setCategorieForCreate(services => [...services,valueAmenities])
        else
            setCategorieForCreate(services => services.filter( item => item !== valueAmenities))
    }

    // dữ liệu cùng định dạng
    // có id       --> sửa (nếu có file ảnh thì xử lý với cloudinary)
    // 0 có id     --> thêm mới
    const handleAddMovie = async (e) => {
        e.preventDefault()
        showLoading('Đang xử lý dữ liệu !')
        const method = (dataItem.id) ? 'PUT' : 'POST'
        let dataForApi = {} 
        if(dataItem.id){
            if(moviePoster.file){
                try{
                    const res = await customeFetch(apiUserService.baseURL+'/movies/delete/poster','authen','POST',JSON.stringify({pub_id_poster: dataItem.pub_id_poster}))
                    const img = await uploadCloudinary(moviePoster.file)
                    if(res.ok){
                        dataForApi = {
                            title: movie.title,
                            description: movie.synopsis,
                            duration: movie.duration,
                            release_date: movie.release_date || null,
                            poster_url: img.url ||null,
                            pub_id_poster: img.publicId || "",
                            director: movie.director,
                            actor: movie.actor,
                            trailer_url:movie.trailer_url || "",
                            categories: categorieForCreate
                        } 
                        
                    }
                }
                catch(err){
                    console.log(err)
                }
            }
            else{
                dataForApi = {
                    title: movie.title,
                    description: movie.synopsis,
                    duration: movie.duration,
                    release_date: movie.release_date,
                    poster_url: dataItem.poster_url || "",
                    pub_id_poster: dataItem.pub_id_poster || "",
                    director: movie.director,
                    actor: movie.actor,
                    trailer_url:movie.trailer_url,
                    categories: categorieForCreate
                } 
            }
            dataForApi = {
                id: dataItem.id,
                ...dataForApi
            }
        }
        else {
            let img = {}
            if(moviePoster.file) 
                img = await uploadCloudinary(moviePoster.file)
            dataForApi = {
                title: movie.title,
                description: movie.synopsis,
                duration: movie.duration,
                release_date: movie.release_date || null,
                poster_url: img.url || null,
                pub_id_poster: img.publicId || null,
                director: movie.director,
                actor: movie.actor,
                trailer_url:null,
                categories: categorieForCreate
            } 
        }
        try{
            const res = await customeFetch(apiUserService.baseURL+'/movies', 'authen', method, JSON.stringify(dataForApi))
            if(method == 'PUT'){
                if(res.ok){
                    const data = await res.json()
                    handleUpdateData(setDatas, 'id', dataItem.id, data)
                    toast.success("Cập nhật thành công !")
                } 
                else
                    toast.error("Cập nhật thất bại !")
            }
            else {
                if(res.ok){
                    const data = await res.json()
                    data.status = 'coming_soon'
                    handleAddData(setDatas, data)
                    toast.success("Thêm phim thành công !")
                }
                else
                    toast.error("Thêm phim tthất bại !")
            }
            setCategorieForCreate( dataItem?.Categories?.map( item => item.id) || [])
            setMoviePoster({
                ...moviePoster,
                url: dataItem.poster_url
            })
            setDataItem(null)
        }
        catch(err){
            console.log(err)
        }
        hideLoading()
    }

    // khi render danh sách các thể loại, 
    // khi thêm mới dựa vào state categoriesForCreate để render checked tương ứng khi sửa
    const isCheckedCategory = (id) => {
        return Array.isArray(categorieForCreate) && categorieForCreate.includes(id)
    }

    const closeModal = () => {
        deleteImgIsChosen()
        setDataItem(null)
    }
      
    return <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/20 modal-content modal-content-h-90 overflow-y-scroll">
        <span className="close" onClick={closeModal}>&times;</span>
        <form method="POST" className="p-8 space-y-4" onSubmit={handleAddMovie}>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                <div className="md:col-span-4 space-y-4">
                    <label className="block text-sm font-label-bold text-secondary uppercase tracking-wider">Ảnh Poster Phim</label>
                    <div className="relative group cursor-pointer border-2 border-dashed border-outline-variant rounded-xl aspect-[2/3] flex flex-col items-center justify-center bg-surface-container transition-all hover:border-primary-container hover:bg-surface-container-high overflow-hidden">
                        <input accept=".jpg, .jpeg, .png" className="hidden" id="poster-input" type="file" ref={imageInput} onChange={handleChoseImgFormClient}/>
                        <div className="flex flex-col items-center text-center p-6" id="preview-placeholder" onClick={choseImgFormClient}>
                            <span className="material-symbols-outlined text-4xl text-outline mb-4 group-hover:text-primary-container transition-colors">
                                <Plus size={20}/>
                            </span>
                            <p className="text-sm font-semibold text-on-surface">Tải lên poster</p>
                        </div>

                        <img className={`absolute inset-0 w-full h-full object-cover ${!moviePoster.url ? 'hidden' : ''}`} id="poster-preview" src={moviePoster.url == "" ? null : moviePoster.url}/>
                    </div>
                    <div className="flex gap-2 justify-end">
                        <button type="button" className={`cursor-pointer p-1 rounded-lg hover:bg-surface-container text-tertiary ${!moviePoster.url ? 'hidden' : ''}`}>
                            <Pencil size={20} onClick={choseImgFormClient}/>
                        </button>
                        <button  type="button" className={`cursor-pointer p-1 rounded-lg hover:bg-error-container hover:text-error ${!moviePoster.url ? 'hidden' : ''}`}>
                            <Trash2 size={20} onClick={deleteImgIsChosen}/>
                        </button>
                    </div>
                </div>

                <div className="md:col-span-8 space-y-6">

                    <div className="space-y-1">
                        <label className="block text-sm font-label-bold text-on-surface" htmlFor="title">Tên Phim 
                            <span id="title_0" className="text-primary">{movieError.title_0}</span>
                        </label>
                        <input 
                            className="w-full px-4 py-3 bg-surface-container-lowest border border-outline rounded-lg focus:ring-2 focus:ring-primary-container/20 focus:border-primary-container outline-none transition-all placeholder:text-outline-variant" 
                            id="title" 
                            placeholder="VD: Avengers: Endgame" 
                            type="text"
                            value={movie.title}
                            onChange={handleInputChange}
                            required/>
                    </div>

                    <div className="space-y-1">
                        <label className="block text-sm font-label-bold text-on-surface">Thể loại phim</label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {
                            categories?.map( item => 
                                <label key={item.id} className="flex items-center gap-3 p-3 border border-outline-variant rounded-lg cursor-pointer hover:bg-surface-container-low transition-all group">
                                    <input 
                                        className="w-5 h-5 rounded border-outline text-primary focus:ring-primary-container" 
                                        type="checkbox"
                                        checked={isCheckedCategory(item.id)}
                                        value={item.id}
                                        onChange={handleOnChangeService}/>
                                    <span className="text-sm font-medium text-on-surface-variant group-hover:text-on-surface">{item.name}</span>
                                </label>)
                        }
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-1">
                            <label className="block text-sm font-label-bold text-on-surface" htmlFor="release_date">
                                Ngày phát hành
                                <span id="release_date_0" className="text-primary">{movieError.release_date_0}</span>
                            </label>
                            <div className="relative">
                                <input 
                                    className="w-full px-4 py-3 bg-surface-container-lowest border border-outline rounded-lg focus:ring-2 focus:ring-primary-container/20 focus:border-primary-container outline-none transition-all" 
                                    id="release_date"
                                    type="date"
                                    value={movie.release_date}
                                    onChange={handleInputChange}
                                    required/>
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="block text-sm font-label-bold text-on-surface" htmlFor="duration">Thời lượng (phút)</label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant text-lg">
                                    <Clock size={20}/>
                                </span>
                                <input 
                                    className="w-full pl-10 pr-4 py-3 bg-surface-container-lowest border border-outline rounded-lg focus:ring-2 focus:ring-primary-container/20 focus:border-primary-container outline-none transition-all" 
                                    id="duration" 
                                    placeholder="VD: 120" 
                                    type="number"
                                    min="60"
                                    value={movie.duration}
                                    onChange={handleInputChange}
                                    required
                                    />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        
                        <div className="space-y-2">
                            <label className="block text-sm font-label-bold text-on-surface" htmlFor="director">
                                Đạo diễn <span id="director_0" className="text-primary">{movieError.director_0}</span>
                            </label>
                            <input 
                                className="w-full px-4 py-3 bg-surface-container-lowest border border-outline rounded-lg focus:ring-2 focus:ring-primary-container/20 focus:border-primary-container outline-none transition-all placeholder:text-outline-variant" 
                                id="director" 
                                placeholder="VD: Anthony Russo, Joe Russo" 
                                type="text"
                                value={movie.director}
                                onChange={handleInputChange}
                                required/>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-label-bold text-on-surface" htmlFor="actor">
                                Diễn viên<span id="actor_0" className="text-primary">{movieError.actor_0}</span>
                            </label>
                            <input 
                                className="w-full px-4 py-3 bg-surface-container-lowest border border-outline rounded-lg focus:ring-2 focus:ring-primary-container/20 focus:border-primary-container outline-none transition-all placeholder:text-outline-variant" 
                                id="actor" 
                                placeholder="VD: Robert Downey Jr., Chris Evans" 
                                type="text"
                                value={movie.actor}
                                onChange={handleInputChange}/>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-1 gap-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-label-bold text-on-surface" htmlFor="trailer_url">
                                Trailer URL
                                <span  className="text-primary text-[12px]">
                                    {(movie.trailer_url == "" || movie.trailer_url == null) ? ' (Mở youtube và sao chép URL của phim - cẩn thận bản quyền)' : ' Vui lòng không chỉnh sửa URL của phim'}
                                </span>
                            </label>
                            <div className="flex items-center gap-2">
                                <input 
                                    className="flex-1 px-4 py-3 bg-surface-container-lowest border border-outline rounded-lg focus:ring-2 focus:ring-primary-container/20 focus:border-primary-container outline-none transition-all placeholder:text-outline-variant" 
                                    id="trailer_url" 
                                    placeholder="Lấy url từ youtube, vui lòng không chỉnh sửa khi sao chép" 
                                    type="text"
                                    value={movie.trailer_url}
                                    onChange={handleInputChange}/>

                                <div className="">
                                    <Link to="https://youtube.com" target="_blank" className="px-4 py-3 rounded-lg bg-primary-container text-white">
                                        Mở Youtube
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="block text-sm font-label-bold text-on-surface" htmlFor="synopsis">
                            Tóm tắt nội dung
                            <span id="synopsis_0" className="text-primary">{movieError.synopsis_0}</span>
                        </label>
                        <textarea 
                            className="w-full px-4 py-3 bg-surface-container-lowest border border-outline rounded-lg focus:ring-2 focus:ring-primary-container/20 focus:border-primary-container outline-none transition-all resize-none" 
                            id="synopsis" 
                            placeholder="Mô tả ngắn gọn cốt truyện phim..." 
                            rows="6"
                            value={movie.synopsis}
                            onChange={handleInputChange}>
                        </textarea>
                    </div>
                </div>
            </div>

            <div className="pt-8 border-t border-outline-variant/30 flex items-center justify-end gap-4">
                <button 
                    className="px-8 py-3 rounded-lg border border-outline text-secondary font-label-bold hover:bg-surface-container-high hover:text-on-surface transition-all active:scale-95" 
                    type="button"
                    onClick={closeModal}>
                    Hủy bỏ
                </button>
                <button 
                    className={`px-10 py-3 rounded-lg bg-primary-container text-on-primary font-label-bold shadow-lg shadow-primary-container/30  flex items-center gap-2
                        ${notPassValid ? 'hover:bg-primary transition-all cursor-not-allowed' : 'cursor-pointer active:scale-95'}`} 
                    type="submit"
                    disabled={notPassValid}>
                    <span className="material-symbols-outlined text-lg">
                        <Save size={20}/>
                    </span>
                            Lưu thông tin
                </button>
            </div>
        </form>
    </div>
}

export default FormMovie