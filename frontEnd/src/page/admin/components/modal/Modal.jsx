import FormMovie from "./FormMovie"
import FormUpdateInfo from "./FormUpdateInfo"
import FormCheckTicket from "./FormCheckTicket"
import FromShowtime from "./FormShowtime"
import FormTypeTheater from "./FormTypeTheater"
import FormVoucher from "./FormVoucher"

const Modal = ({styleModal, dataItem, setDataItem, setDatas, categories, onDateSelect}) => {
    const style = {
        movie: FormMovie,
        updateInfo: FormUpdateInfo,
        checkTicket: FormCheckTicket,
        showtime: FromShowtime,
        typeTheater: FormTypeTheater,
        voucher: FormVoucher
    }
    let Element = style[styleModal]
    let props = {
        dataItem,
        setDataItem,
        setDatas, 
        categories,
        onDateSelect
    }

    return <div className="modal" style={{display: dataItem ? 'flex' : 'none'}}>
        <Element {...props}/>
    </div>
}

export default Modal