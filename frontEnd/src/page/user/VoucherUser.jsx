import { useState, useRef } from "react"
import {Header, Footer, ContentMyVoucher} from "./components/index"
import ConfirmAvatar from "./components/modal/ConfirmAvatar"
import { useLoading } from "../../LoadingContext"

const  VoucherUser = () => {
    const {userInfo, setUserInfo} = useLoading()
    const [dataItem, setDataItem] = useState(null)
    const [confirm, setConfirm] = useState(false)
    const [avatar, setAvatar] = useState({
        file: null,
        url: userInfo?.avatar || ""
    })
    const imageInput = useRef(null)

    const choseImgFormClient = () => {
        imageInput.current.click()
    }

    let propsOFContet = {
        userInfo,
        avatar,
        imageInput,
        setUserInfo,
        setAvatar,
        setDataItem,
        setConfirm,
        choseImgFormClient
    }

    let propsOfConfirm = {
        confirm,
        setConfirm,
        imageInput
    }
   
    return <>
        <Header/>
        <ContentMyVoucher {...propsOFContet}/>
        <ConfirmAvatar {...propsOfConfirm}/>
        <Footer/>
    </>
}

export default VoucherUser