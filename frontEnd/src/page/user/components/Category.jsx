import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {customeFetch, apiUserService} from "../../config"

const Category = ({type, idChosen}) => {
    const [categories, setCategories] = useState([])
    const navigate = useNavigate()
    const [idCategorySelect, setIdCategorySelect] = useState('none')

    useEffect(()=>{
        (idChosen) ? setIdCategorySelect(idChosen) : setIdCategorySelect('none')
    },[idChosen])

    const goToListByCategory = (idCagory) => {
        navigate('/danh-sach',{state: {idCategory: idCagory}})
    }

    // nếu type: router: --> ở trang chủ chuyển hướng sang 
    //           local:  --> ở trang danh sách và dùng re-reder lại giao diện
    const handle = (idCategory) => {
        if(type=='router')
            goToListByCategory(idCategory)
        else
            setIdCategorySelect(idCategory)
    }

    useEffect(()=>{
        const getCategories = async () => {
            try{
                const res = await customeFetch(apiUserService.baseURL+'/categories/all','non-authen','GET')
                if(res.ok){
                    const data = await res.json()
                    setCategories(data)
                }
            }
            catch(err){
                console.log()
            }
        }
        getCategories()
    },[])

    return <>
        <section className="py-base max-w-[1280px] mx-auto relative z-20">
            <div className="flex items-center space-x-3 flex-wrap gap-2">
                <button className={`px-6 py-3 rounded-full font-label-sm 
                    ${idCategorySelect == 'none' 
                    ? 'bg-primary-container text-white whitespace-nowrap' 
                    : 'bg-surface-container2 hover:bg-surface-container2-high text-zinc-400 hover:text-white'}`}
                    onClick={()=>handle('none')}>Tất cả</button>
                    {
                            categories.map( item =>
                                <button
                                    key={item.id} 
                                    className={`px-6 py-3 rounded-full font-label-sm 
                                        ${idCategorySelect == item.id
                                        ? 'bg-primary-container text-white whitespace-nowrap' 
                                        : 'bg-surface-container2 hover:bg-surface-container2-high text-zinc-400 hover:text-white'}`}
                                    onClick={()=>handle(item.id)}>
                                    {item.name}
                                </button>
                            )
                    }
                </div>
        </section>
    </>
}

export default Category