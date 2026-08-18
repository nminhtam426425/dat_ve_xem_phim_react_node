import {Header, ContentHome, ContentList, Footer} from "./components/index"
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { customeFetch, apiUserService } from "../config"
import WatchTrailer from "./components/modal/WatchTrailer"
import { useDebounce } from 'use-debounce'

// dùng searchQuery để render ra giao diện danh sách khi tìm kiếm phim
const  Home = () => {
    const navigate = useNavigate()
    const [datas, setDatas] = useState([])
    const [dataRenderList, setDataRenderList] = useState([])
    const [trending, setTrending] = useState({})
    const [searchQuery, setSearchQuery] =  useState("")
    const [trailer, setTrailer] = useState("")
    const [debouncedSearch] = useDebounce(searchQuery, 500)

    useEffect(() => {
        const handleKeyDown = (e) => {
          if (e.altKey && e.shiftKey && e.key.toLowerCase() === 'a') {
            navigate('/login/internal')
          }
        }
    
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [navigate])

    // vì table movie_trending chỉ lưu có 1 phim hot nhất nến lấy index = 0
    useEffect(() => {
        const getDatas = async () => {
            try{
                const res = await customeFetch(apiUserService.baseURL+'/showtimes/user','non-authen','GET')
                const resTrending = await customeFetch(apiUserService.baseURL+'/movies/trending','non-authen','GET')
                if(res.ok){
                    const data = await res.json()
                    const dataTrending = await resTrending.json() 
                    let tempTrending = data.showing.find(item => item.id == dataTrending[0].movie_id)
                    setTrending({
                        ...tempTrending,
                        background_url: dataTrending[0].background_url
                    })
                    setDataRenderList(data.showing)
                    setDatas(data)
                }
            }
            catch(err){
                console.log(err)
            }
        }
        getDatas()
    },[]) 

    return <>
        <Header setSearchQuery={setSearchQuery} searchQuery={searchQuery}/>
        {
          debouncedSearch != ""
          ?
          <ContentList searchQuery={debouncedSearch} setSearchKeyword={setSearchQuery} dataRender={dataRenderList}/>
          :
          <ContentHome setTrailer={setTrailer} dataRender={datas} trending={trending}/>
        }
        
        <WatchTrailer trailerUrl={trailer} setTrailerUrl={setTrailer}/>
        <Footer/>
    </>
}

export default Home