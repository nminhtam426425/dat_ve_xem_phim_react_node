import {BellRing} from "lucide-react"
import { formatDate } from "../../validate"

const MovieComing = ({data}) => {
    return <div className="space-y-4" key={data?.id}>
        <div className="aspect-[2/3] rounded-xl overflow-hidden bg-zinc-900">
            <img alt="Soon 1" className="w-full h-full object-cover hover:grayscale-0 transition-all duration-500" src={data.poster_url == "" ? null : data.poster_url}/>
        </div>
        <div className="flex justify-between items-start">
            <div className="min-w-0">
                <h4 className="text-white font-label-bold truncate">{data.title}</h4>
                <p className="text-zinc-500 text-xs">{formatDate(data.release_date)}</p>
            </div>
            <button className="text-red-600">
                <span className="material-symbols-outlined" data-icon="notifications">
                    <BellRing size={20}/>
                </span>
            </button>
        </div>
    </div>
}

export default MovieComing