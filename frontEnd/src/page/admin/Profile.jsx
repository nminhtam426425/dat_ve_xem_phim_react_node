import Aside from './components/Aside'
import ContentProfile from './components/ContentProfile'
import Header from './components/Header'
import { useLoading } from '../../LoadingContext'
import Modal from './components/modal/Modal'
import ConfirmAvatar from '../user/components/modal/ConfirmAvatar'
import FormChangeChangePass from '../user/components/modal/FormChangePass'
import { useRef, useState } from 'react'

const Profile = () => {
    const imgAvatar = useRef(null)
    const {userInfo, setUserInfo} = useLoading()
    const [info, setInfo] = useState(null)
    const [confirm, setConfirm] = useState(false)
    const [avatar, setAvatar] = useState({
        file: null,
        url: location?.state?.user?.avatar || ""
    })
    const [showFormChangePass, setShowFormChangePass] = useState(null)

    let propsOfContent = {
        user: userInfo,
        avatar,
        imgAvatar,
        setDataItem: setInfo,
        setConfirm,
        setAvatar,
        setUserInfo,
        setShowFormChangePass
    }

    return <div className="bg-background text-on-background min-h-screen flex">
        <Aside/>
        <main className="ml-64 flex-1 flex flex-col min-h-screen bg-surface-container-lowest">
            <Header/>
            <ContentProfile {...propsOfContent}/>
        </main>
        <Modal styleModal="updateInfo" dataItem={info} setDataItem={setInfo} setForUserUpdate={setUserInfo}/>
        <ConfirmAvatar confirm={confirm} setConfirm={setConfirm} imageInput={imgAvatar}/>
        <FormChangeChangePass dataItem={showFormChangePass} setDataItem={setShowFormChangePass}/>
    </div>
}

export default Profile