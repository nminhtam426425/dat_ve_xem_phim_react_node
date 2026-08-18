import Aside from './components/Aside'
import ContentAccountManager from './components/ContentAccountManager'
import Header from './components/Header'
import Modal from './components//modal/Modal'
import ConfirmLockAccount from './components/modal/ConfirmLockAccount'
import { useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'
import { apiUserService, customeFetch } from '../config'

const MovieManager = () => {
    const [dataAccountNew, setDataAccountNew] = useState(null)
    const [datas, setDatas] = useState([])
    // tính toán phần trăm
    const [dataCal, setDataCal] = useState([])
    const itemsPerPage = 5 
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [typeLockOrUnlock, setTypeLockOrUnlock] = useState('')
    const [dataItemBeforeConfirm,setDataItemBeforeConfirm] = useState(null)
    
    const [roleForRender, setRoleForRender] = useState('staff')
    const [searchKeyword, setSearchKeyword] = useState('')
    const [isActivate, setIsActivate] = useState(1)

    const [debouncedSearch] = useDebounce(searchKeyword, 500)
    useEffect(() => {
        setCurrentPage(1)
    }, [roleForRender, isActivate, debouncedSearch])

    useEffect(()=>{
        const getDatas = async () => {
            try{
                let query = `page=${currentPage}&limit=${itemsPerPage}&role=${roleForRender}&is_activating=${isActivate}&search=${debouncedSearch}`
                const res = await customeFetch(apiUserService.baseURL+`/users/all?${query}`,'authen','GET')
                if(res.ok){
                    const data = await res.json()
                    setDatas(data.data)
                    setTotalPages(data.pagination.totalPages)
                }
            }
            catch(err){
                console.log(err)
            }
        }
        getDatas()
    },[currentPage, itemsPerPage, roleForRender, isActivate, debouncedSearch])

    useEffect(()=>{
        const getDataCal = async () => {
            try{
                const res = await customeFetch(apiUserService.baseURL+`/users/dataCal`,'authen','GET')
                if(res.ok){
                    const data = await res.json()
                    setDataCal(data)
                }
            }
            catch(err){
                console.log(err)
            }
        }
        getDataCal()
    },[])

    let propsOfContent = {
        datas,
        dataAccountNew,
        itemsPerPage,
        currentPage,
        totalPages,
        roleForRender,
        searchKeyword,
        isActivate,
        dataCal,
        setCurrentPage,
        setDataItem: setDataAccountNew,
        setDatas,
        setConfirm: setTypeLockOrUnlock,
        setDataItemBeforeConfirm,
        setIsActivate,
        setSearchKeyword,
        setRoleForRender

    }

    let propsOfConfirmLock = {
        confirm: typeLockOrUnlock,
        setConfirm: setTypeLockOrUnlock,
        setDatas,
        type: typeLockOrUnlock,
        dataItemBeforeConfirm,
        setDataItemBeforeConfirm,
        dataCal,
        setDataCal
    }

    return <div className="bg-background text-on-background min-h-screen flex">
        <Aside/>
        <main className="ml-64 flex-1 flex flex-col min-h-screen bg-surface-container-lowest">
            <Header/>
            <ContentAccountManager {...propsOfContent}/>
        </main>
        <Modal styleModal="addStaff" dataItem={dataAccountNew} setDataItem={setDataAccountNew} setDatas={setDatas}/>
        <ConfirmLockAccount {...propsOfConfirmLock}/>
    </div>
}

export default MovieManager