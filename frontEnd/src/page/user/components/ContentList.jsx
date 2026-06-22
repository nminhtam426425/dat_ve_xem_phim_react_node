import { useLocation } from "react-router-dom"
import Category from "./Category"
import Paging from "./Paging"
import MovieCard from "./MovieCard"

const datas = [
    {
        id:'6',
        poster_url: 'https://res.cloudinary.com/dq8bb1xdl/image/upload/v1781577345/jhym7b2qzhy12lrvzuhb.png',
        name: 'Nobita và Lâu đài dưới đáy biển',
        release_date: '2026-10-10',
        score: 8.0,
        duration: 135
    },
    {
        id:'7',
        poster_url: 'https://res.cloudinary.com/dq8bb1xdl/image/upload/v1781577381/sq1tnltqbc8ovgmkpks0.png',
        name: 'Train To Busan',
        release_date: '2026-10-10',
        score: 8.0,
        duration: 135
    },
    {
        id:'8',
        poster_url: 'https://res.cloudinary.com/dq8bb1xdl/image/upload/v1781577412/oq8e5b5pa8kcgx665csh.jpg',
        name: 'Vô hạn thành',
        release_date: '2026-10-10',
        score: 8.0,
        duration: 135
    },
    {
        id:'9',
        poster_url: 'https://res.cloudinary.com/dq8bb1xdl/image/upload/v1781671502/i4pwk3ddvfnyhfoztxa7.jpg',
        name: 'Dòng thời gian đen tối',
        release_date: '2026-10-10',
        score: 8.0,
        duration: 135
    },
    {
        id:'61',
        poster_url: 'https://res.cloudinary.com/dq8bb1xdl/image/upload/v1781577345/jhym7b2qzhy12lrvzuhb.png',
        name: 'Nobita và Lâu đài dưới đáy biển',
        release_date: '2026-10-10',
        score: 8.0,
        duration: 135
    },
    {
        id:'72',
        poster_url: 'https://res.cloudinary.com/dq8bb1xdl/image/upload/v1781577381/sq1tnltqbc8ovgmkpks0.png',
        name: 'Train To Busan',
        release_date: '2026-10-10',
        score: 8.0,
        duration: 135
    },
    {
        id:'83',
        poster_url: 'https://res.cloudinary.com/dq8bb1xdl/image/upload/v1781577412/oq8e5b5pa8kcgx665csh.jpg',
        name: 'Vô hạn thành',
        release_date: '2026-10-10',
        score: 8.0,
        duration: 135
    },
    {
        id:'94',
        poster_url: 'https://res.cloudinary.com/dq8bb1xdl/image/upload/v1781671502/i4pwk3ddvfnyhfoztxa7.jpg',
        name: 'Dòng thời gian đen tối',
        release_date: '2026-10-10',
        score: 8.0,
        duration: 135
    },
    {
        id:'831',
        poster_url: 'https://res.cloudinary.com/dq8bb1xdl/image/upload/v1781577412/oq8e5b5pa8kcgx665csh.jpg',
        name: 'Vô hạn thành',
        release_date: '2026-10-10',
        score: 8.0,
        duration: 135
    },
    {
        id:'941',
        poster_url: 'https://res.cloudinary.com/dq8bb1xdl/image/upload/v1781671502/i4pwk3ddvfnyhfoztxa7.jpg',
        name: 'Dòng thời gian đen tối',
        release_date: '2026-10-10',
        score: 8.0,
        duration: 135
    },
]

const ContentList = () => {
    const location = useLocation()
    return<main className="bg-background2">
        <div className="flex-grow max-w-[1280px] mx-auto w-full px-6 py-8">
            {
                datas.length > 0 
                ?
                <>
                  <div className="pb-8">
                    <Category type="local" idChosen={location?.state?.idCategory}/>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-12">
                    {
                        datas.map( item => <MovieCard key={item.id} data={item}/>)
                    }
                </div>
                <Paging currentPage={1} setCurrentPage={null}  totalPage={9} resetFilter/>
                </>
                :
                <div className="h-full">
                </div>
            }
        </div>
    </main> 
}

export default ContentList