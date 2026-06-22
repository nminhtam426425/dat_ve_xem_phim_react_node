import {ChevronLeft,ChevronRight} from 'lucide-react'

const ArrowPage = ({value, handlePage, currentPage, totalPage}) => {
    let disabled = false
    if(value === "left" && currentPage === 1)
        disabled = true
    else if(value === "right" && currentPage === totalPage)
        disabled = true
    let Chevron = (value==='left') ? ChevronLeft : ChevronRight
    return <>
        <button 
            className={`p-1 rounded hover:bg-surface-container transition-colors text-secondary 
            ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            disabled={disabled}
            onClick={handlePage}>
            <span className="material-symbols-outlined" data-icon="chevron_left">
                <Chevron size={20} />
            </span>
        </button>
    </>
}

const PageButton = ({value,currentPage,setCurrentPage, resetFilter}) => {
    const handleClickPage = (page) => {
        resetFilter()
        setCurrentPage(page)
    }
    return <>
        <button 
            className={`w-8 h-8 rounded-lg font-label-bold text-xs flex items-center justify-center 
                ${(value===currentPage) 
                ? 'bg-primary-container text-white' 
                : 'hover:bg-surface-container text-on-surface-variant'}`}
                onClick={()=>handleClickPage(value)}>
            {value}
        </button>
    </>
   

}

const Dots = () => {
    return <span className="px-2 text-secondary">...</span>
}

const Paging =  ({currentPage, setCurrentPage, totalPage, resetFilter, itemsPerPage}) => {
    const pages = [{value:1,type:"button"}]

    const handleNextPage = () => {
        resetFilter()
        setCurrentPage(current => current+1)
    }
    
    const handlePrePage = () => {
        resetFilter()
        setCurrentPage(current => current-1)
    }
    // vị trí vẽ button phân trang dựa loại số
    let start = Math.max(2,currentPage-1)
    let end = Math.min(totalPage-1,currentPage+1)

    // truong hop dac biet, current nam o vi tri dau hoac cuoi 
    if(totalPage > 2){
        if(currentPage === 1){
            start = 2
            end = 3
        }
         
        if(currentPage >= (totalPage - 2) && (totalPage > 4)){
            start = totalPage - 2
            end = totalPage - 1
        }
    }

    // vị trí vẽ button phân trang dựa vào currnent page. vd: current = 4 ==> total page = 6, {  1 ... 4 5 6  }
    if(start > 2)
        pages.push({value:"...",type:"dots"})

    for(let i = start; i <= end; i++)
        pages.push({value:i,type:"button"})

     // vị trí vẽ button phân trang dựa vào currnent page. vd: current = 4, total page = 10 ==> {  1 ... 4 5 6 ... 10  }
    if(end < totalPage - 1)
        pages.push({value:"...",type:"dots"})

    // 1 trường hợp đb nữa, nhưng chưa nhớ ra
    if (end < totalPage && totalPage !== 1) 
        pages.push({value:totalPage,type:"button"})

    return <>
        <div className="px-6 py-4 bg-surface-container-low flex items-center justify-between border-t border-outline-variant/30">
            <span className="text-label-sm text-secondary">Hiển thị 1-{itemsPerPage} trên {totalPage*itemsPerPage} phim</span>
            <div className="flex items-center gap-1">
                <ArrowPage value='left' handlePage={handlePrePage} currentPage={currentPage} totalPage={totalPage}/>   
                {
                    pages.map(
                        (item,key)=>{
                            if(item.type === "dots")
                                return <Dots key={key}/>
                            else
                                return <PageButton value={item.value} key={key} currentPage={currentPage} setCurrentPage={setCurrentPage} resetFilter={resetFilter}/>
                        }
                    )
                }
                <ArrowPage value='right' handlePage={handleNextPage} currentPage={currentPage} totalPage={totalPage}/>
            </div>
        </div>
    </>
   
}

export default Paging