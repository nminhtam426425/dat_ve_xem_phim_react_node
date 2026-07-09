import { useState, useRef } from "react"
import {Header, ContentProfileUser, Footer} from "./components/index"
import Modal from "../admin/components/modal/Modal"
import ConfirmAvatar from "./components/modal/ConfirmAvatar"
import FormChangeChangePass from "./components/modal/FormChangePass"
import { useLoading } from "../../LoadingContext"

const  ProfileUser = () => {
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
    const [showFormChangePass, setShowFormChangePass] = useState(null)

    let propsOFContet = {
        userInfo,
        avatar,
        imageInput,
        setUserInfo,
        setAvatar,
        setDataItem,
        setConfirm,
        choseImgFormClient,
        setShowFormChangePass
    }

    let propsOfConfirm = {
        confirm,
        setConfirm,
        imageInput
    }
   
    return <>
        <Header/>
        <ContentProfileUser {...propsOFContet}/>
        <Modal dataItem={dataItem} setDataItem={setDataItem} styleModal="updateInfo" setForUserUpdate={setUserInfo}/>
        <ConfirmAvatar {...propsOfConfirm}/>
        <FormChangeChangePass dataItem={showFormChangePass} setDataItem={setShowFormChangePass}/>
        <Footer/>
    </>
}

export default ProfileUser