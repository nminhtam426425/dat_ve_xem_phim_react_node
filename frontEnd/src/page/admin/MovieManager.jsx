import Aside from './components/Aside'
import ContentMovieManager from './components/ContentMovieManager'
import Header from './components/Header'
import Modal from './components/modal/Modal'
import ConfirmBox from './components/modal/ConfirmBox'
import { useEffect, useState } from 'react'
import {customeFetch, apiUserService} from '../config.js'

const MovieManager = () => {
    const [datas, setDatas] = useState([])
    const [categories, setCategories] = useState([])
    const [movieTrending, setMovieTrending] = useState(null)

    useEffect(()=>{
        const getDatas = async () => {
            try{
                const res = await customeFetch(apiUserService.baseURL+'/movies/all','authen','GET')
                const res2 = await customeFetch(apiUserService.baseURL+'/categories/all','non-authen','GET')
                const res3 = await customeFetch(apiUserService.baseURL+'/movies/trending','non-authen','GET')
                if(res.ok && res3.ok){
                    const data = await res.json()
                    const data2 = await res3.json()

                    let temp = data.sort( (a,b) => new Date(b.release_date) - new Date(a.release_date))
                    let trendingMovie = {}

                    if(data2[0]){
                        trendingMovie = data.find(item => item.id == data2[0].movie_id)
                        setDatas(temp.filter(item => item.id != trendingMovie.movie_id))
                        setMovieTrending(trendingMovie)
                    }
                    else    
                        setDatas(temp)
                }
                if(res2.ok){
                    const data = await res2.json()
                    setCategories(data)
                }
            }
            catch(err){
                console.log(err)
            }
        }
        getDatas()
    },[])
    const [dataMovie, setDataMovie] = useState(null)
    const [dataItemBeforeConfirm, setDataItemBeforeConfirm] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [confirm, setConfirm] = useState(null)
    const [showFormTrending, setShowFormTrending] = useState(null)
    const itemsPerPage = 5

    let propsOfContentMovie = {
        datas,
        currentPage,
        itemsPerPage,
        categories,
        dataItemBeforeConfirm,
        movieTrending,
        setConfirm,
        setDataItem: setDataMovie,
        setCurrentPage,
        setDataItemBeforeConfirm,
        setShowFormTrending
    }

    let propsOfConfirm = {
        confirm,
        dataItemBeforeConfirm,
        type: 'movies',
        setDatas,
        setConfirm,
        setDataItemBeforeConfirm
    }

    return <div className="bg-background text-on-background min-h-screen flex">
        <Aside/>
        <main className="ml-64 flex-1 flex flex-col min-h-screen bg-surface-container-lowest">
            <Header/>
            <ContentMovieManager {...propsOfContentMovie} />
        </main>
        <Modal styleModal="movie" dataItem={dataMovie} setDataItem={setDataMovie} datas={datas} setDatas={setDatas} categories={categories}/>
        <ConfirmBox {...propsOfConfirm}/>
        <Modal styleModal="trending" dataItem={showFormTrending} setDataItem={setShowFormTrending} setMovieTrending={setMovieTrending}/>
    </div>
}

export default MovieManager