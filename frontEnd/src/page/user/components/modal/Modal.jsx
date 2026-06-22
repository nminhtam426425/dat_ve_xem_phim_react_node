import FormMovie from "./FormMovie"

const Modal = ({styleModal, dataItem, setDataItem, setDatas}) => {
    const style = {
        
    }
    let Element = style[styleModal]
    let props = {
        dataItem,
        setDataItem,
        setDatas, 
        categories
    }

    return <div className="modal" style={{display: dataItem ? 'flex' : 'none'}}>
        <Element {...props}/>
    </div>
}

export default Modal