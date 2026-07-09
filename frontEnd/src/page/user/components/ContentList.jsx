import { useLocation } from "react-router-dom"
import { useMemo, useState } from "react"
import Category from "./Category"
import Paging from "./Paging"
import MovieCard from "./MovieCard"
import { removeVietnameseTones } from "../../config"

const ContentList = ({setTrailer,searchQuery, setSearchKeyword, dataRender}) => {
    const location = useLocation()
    const itemsPerPage = 10
    const [currentPage, setCurrentPage] = useState(1)
    const [selectedCategory, setSelectedCategory] = useState(location?.state?.idCategory || "0")

    const resetFilter = () => {
        setSearchKeyword("")
        setSelectedCategory(0)
    }

    const filteredData  = useMemo(()=>{
        return dataRender.filter((movie) => {
            const matchCategory = Number(selectedCategory) === 0 || movie.Categories.some((c) => c.id === Number(selectedCategory))
    
            const keyword = removeVietnameseTones(searchQuery?.trim());
            const matchSearch = keyword === "" || removeVietnameseTones(movie.title).includes(keyword) || removeVietnameseTones(movie.director).includes(keyword)
    
            return matchSearch && matchCategory
        })
       
    },[dataRender, searchQuery, selectedCategory])

    const totalPages = Math.ceil(filteredData.length / itemsPerPage)

    const dataOfPage = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage
        const endIndex = startIndex + itemsPerPage
        return filteredData.slice(startIndex,endIndex)

    }, [filteredData,currentPage,itemsPerPage])

    return<main className="bg-background2">
        <div className="flex-grow max-w-[1280px] mx-auto w-full px-6 py-8">
                <div className="pb-8">
                    <Category type="local" idChosen={selectedCategory} setSelectedCategory={setSelectedCategory}/>
                </div>
            {
                dataOfPage.length > 0 
                ?
                <>
                   
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-12">
                        {
                            dataOfPage.map( item => <MovieCard key={item.id} data={item} setTrailer={setTrailer}/>)
                        }
                    </div>
                    <Paging currentPage={currentPage} setCurrentPage={setCurrentPage}  totalPage={totalPages} resetFilter={resetFilter}/>
                </>
                :
                <div className="h-[370px] text-white">Không có dữ liệu</div>
            }
        </div>
    </main> 
}

export default ContentList