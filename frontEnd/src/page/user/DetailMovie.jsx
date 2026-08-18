import { useEffect, useState } from "react"
import {Header, ContentDetail, Footer} from "./components/index"
import { useLocation } from "react-router-dom"
import { customeFetch, apiUserService } from "../config"
import WatchTrailer from "./components/modal/WatchTrailer"

const  DetailMovie = () => {
    const location = useLocation()
    const [movie, setMovie] = useState(null)
    const [trailer, setTrailer] = useState("")
    const [dateChosen, setDateChosen] = useState(new Date().toISOString().split('T')[0])
    const [showtimeOfMovie,setShowtimeOfMovie] = useState([])

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

    useEffect(()=>{
        const getShowtimes = async () => {
            const res = await customeFetch(apiUserService.baseURL+`/showtimes/user/${location?.state?.idMovie}/${dateChosen}`)
            if(res.ok){
                const data = await res.json()
                setShowtimeOfMovie(data.map(item => {
                    let showtime = item.Showtimes.sort((a,b) => new Date(a.start_time) - new Date(b.start_time))
                    return {
                        ...item,
                        Showtimes: showtime
                    }
                }))
            }
        }
        getShowtimes()
    },[dateChosen,location?.state?.idMovie,setShowtimeOfMovie]) 

    let propsOfContent = {
        movie, 
        setTrailer,
        dateChosen,
        setDateChosen,
        showtimeOfMovie
    }

    return <>
        <Header/>
        <ContentDetail {...propsOfContent}/>
        <WatchTrailer trailerUrl={trailer} setTrailerUrl={setTrailer}/>
        <Footer/>
    </>
}

export default DetailMovie