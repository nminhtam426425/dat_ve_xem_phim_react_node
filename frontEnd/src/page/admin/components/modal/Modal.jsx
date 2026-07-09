import FormMovie from "./FormMovie"
import FormUpdateInfo from "./FormUpdateInfo"
import FormCheckTicket from "./FormCheckTicket"
import FromShowtime from "./FormShowtime"
import FormTypeTheater from "./FormTypeTheater"
import FormVoucher from "./FormVoucher"
import FormAddStaff from "./FormAddStaff"
import FormCategory from "./FormCategory"
import FormMovieTrending from "./FormMovieTrending"
import FormTheLoaiPhongChieu from "./FormTheLoaiPhongChieu"
import FormUpdateInfoBranch from "./FormUpdateInfoBranch"

const Modal = ({styleModal, dataItem, setDataItem, setDatas, categories, onDateSelect, setForUserUpdate, setMovieTrending}) => {
    const style = {
        movie: FormMovie,
        updateInfo: FormUpdateInfo,
        checkTicket: FormCheckTicket,
        showtime: FromShowtime,
        typeTheater: FormTypeTheater,
        voucher: FormVoucher,
        addStaff: FormAddStaff,
        category: FormCategory,
        trending: FormMovieTrending,
        theloaiPhongChieu: FormTheLoaiPhongChieu,
        updateInfoBranch: FormUpdateInfoBranch
    }
    let Element = style[styleModal]
    let props = {
        dataItem,
        setDataItem,
        setDatas, 
        categories,
        onDateSelect,
        setForUserUpdate,
        setMovieTrending
    }

    return <div className="modal" style={{display: dataItem ? 'flex' : 'none'}}>
        <Element {...props}/>
    </div>
}

export default Modal