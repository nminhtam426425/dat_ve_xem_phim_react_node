import {Header, ContentHome, ContentList, Footer} from "./components/index"
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { customeFetch, apiUserService } from "../config"
import WatchTrailer from "./components/modal/WatchTrailer"

const datas1 = {
  trending: {
      id:'90',
      title:'Mưa đỏ',
      description: "Bộ phim về cuộc chiến 81 ngày đêm bảo vệ thành cổ trước bàn đàm phán Paris về chấm dứt chiến tranh ở Việt Nam.",
      poster_url: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400/bda5e6232709307.68a21568c92f9.jpg',
      trailer_url: 'https://youtu.be/BD6PoZJdt_M?si=YrnpLxiBQaNB2DPo',
      
  }
}
// dùng searchQuery để render ra giao diện danh sách khi tìm kiếm phim
const  Home = () => {
    const navigate = useNavigate()
    const [datas, setDatas] = useState([])
    const [dataRenderList, setDataRenderList] = useState([])
    const [trending, setTrending] = useState(datas1.trending)
    const [searchQuery, setSearchQuery] =  useState("")
    const [trailer, setTrailer] = useState("")

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
                    setDatas(data.showing.slice(0,6))
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
          searchQuery != ""
          ?
          <ContentList searchQuery={searchQuery} setSearchKeyword={setSearchQuery} dataRender={dataRenderList}/>
          :
          <ContentHome setTrailer={setTrailer} dataRender={datas} trending={trending}/>
        }
        
        <WatchTrailer trailerUrl={trailer} setTrailerUrl={setTrailer}/>
        <Footer/>
    </>
}

export default Home