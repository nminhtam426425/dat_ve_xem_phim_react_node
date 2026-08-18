import { useNavigate } from "react-router-dom"
import { formatDate } from "../../validate"

const MovieComing = ({data}) => {
    const navigate = useNavigate()

    const goToDetail = (idMovie) => {
        navigate('/chi-tiet-sap-chieu',{state:{idMovie}})
    }
    
    
    return <div className="space-y-4 cursor-pointer" key={data?.id} onClick={()=>goToDetail(data?.id)}>
        <div className="aspect-[2/3] rounded-xl overflow-hidden bg-zinc-900">
            <img alt="Soon 1" className="w-full h-full object-cover hover:grayscale-0 transition-all duration-500" src={data.poster_url == "" ? null : data.poster_url}/>
        </div>
        <div className="flex justify-between items-start">
            <div className="min-w-0 w-full">
                <h4 className="text-white font-label-bold truncate uppercase">{data.title}</h4>
                <div className="flex justify-between">
                    <p className="text-secondary text-md">Khởi chiếu: {formatDate(data.release_date)}</p>
                    <span className="text-secondary text-md">{data.duration} phút</span>
                </div>
            </div>
        </div>
    </div>
}

export default MovieComing