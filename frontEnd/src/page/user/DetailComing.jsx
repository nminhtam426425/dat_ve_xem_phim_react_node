import { useEffect, useState } from "react"
import {Header, DetailComingSoon, Footer} from "./components/index"
import { useLocation } from "react-router-dom"
import { customeFetch, apiUserService } from "../config"
import WatchTrailer from "./components/modal/WatchTrailer"

const  DetailComing = () => {
    const location = useLocation()
    const [movie, setMovie] = useState(null)
    const [trailer, setTrailer] = useState("")

    useEffect(()=>{
        const getDatas = async () => {
            const [res] = await Promise.all(
                [
                    customeFetch(apiUserService.baseURL+`/movies/detail/${location?.state?.idMovie}`)
                ]
            )
            if(res.ok){
                const [data] = await Promise.all([res.json()])
                setMovie(data)
            }
        } 
        getDatas()
    },[location?.state?.idMovie])

    let propsOfContent = {
        movie, 
        setTrailer
    }

    return <>
        <Header/>
        <DetailComingSoon {...propsOfContent}/>
        <WatchTrailer trailerUrl={trailer} setTrailerUrl={setTrailer}/>
        <Footer/>
    </>
}

export default DetailComing