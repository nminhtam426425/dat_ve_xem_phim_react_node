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
    useEffect(()=>{
        const getDatas = async () => {
            try{
                const res = await customeFetch(apiUserService.baseURL+'/movies/all','authen','GET')
                const res2 = await customeFetch(apiUserService.baseURL+'/categories/all','non-authen','GET')
                if(res.ok){
                    const data = await res.json()
                    let temp = data.sort( (a,b) => new Date(b.release_date) - new Date(a.release_date))
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
    const itemsPerPage = 4

    let propsOfContentMovie = {
        datas,
        currentPage,
        itemsPerPage,
        categories,
        dataItemBeforeConfirm,
        setConfirm,
        setDataItem: setDataMovie,
        setCurrentPage,
        setDataItemBeforeConfirm
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
    </div>
}

export default MovieManager