import {Header, ContentList, Footer} from "./components/index"
import { useState, useEffect } from "react"
import { customeFetch, apiUserService } from "../config"
import WatchTrailer from "./components/modal/WatchTrailer"
import { useDebounce } from 'use-debounce'

const  ListShowtime = () => {
    const [searchQuery, setSearchQuery] =  useState("")
    const [dataRenderList, setDataRenderList] = useState([])
    const [trailer, setTrailer] = useState("")
    const [debouncedSearch] = useDebounce(searchQuery, 500)

    useEffect(() => {
        const getDatas = async () => {
            try{
                const res = await customeFetch(apiUserService.baseURL+'/showtimes/user')
                if(res.ok){
                    const data = await res.json()
                    setDataRenderList(data.showing)
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
        <ContentList setTrailer={setTrailer} searchQuery={debouncedSearch} setSearchKeyword={setSearchQuery} dataRender={dataRenderList}/>
        <WatchTrailer trailerUrl={trailer} setTrailerUrl={setTrailer}/>
        <Footer/>
    </>
}

export default ListShowtime