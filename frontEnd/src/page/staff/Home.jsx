import Aside from './components/Aside'
import Profile from './components/Profile'
import Header from './components/Header'
import Modal from '../admin/components/modal/Modal'
import AsideMobile from './components/AsideMobile'
import { useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import ConfirmAvatar from '../user/components/modal/ConfirmAvatar'
import FormChangeChangePass from '../user/components/modal/FormChangePass'
import { useLoading } from '../../LoadingContext'

const Home = () => {
    const location = useLocation()
    const {userInfo, setUserInfo} = useLoading()
    const imgAvatar = useRef(null)
    const [info, setInfo] = useState(null)
    const [confirm, setConfirm] = useState(false)
    const [avatar, setAvatar] = useState({
        file: null,
        url: location?.state?.user?.avatar || ""
    })
    const [showAside, setShowAside] = useState(false)
    const [showFormChangePass, setShowFormChangePass] = useState(null)

    let contentOfProfile = {
        user: userInfo,
        imgAvatar,
        avatar,
        setConfirm,
        setDataItem: setInfo,
        setAvatar,
        setShowFormChangePass
    }

    return <div className="bg-background text-on-background min-h-screen flex">
        <Aside/>
        <AsideMobile setShowAside={setShowAside} showAside={showAside}/>
        <main className="md:ml-64 flex-1 flex flex-col min-h-screen bg-surface-container-lowest">
            <Header setShowAside={setShowAside}/>
            <Profile {...contentOfProfile}/>
        </main>
        <Modal styleModal="updateInfo" dataItem={info} setDataItem={setInfo} setForUserUpdate={setUserInfo}/>
        <ConfirmAvatar confirm={confirm} setConfirm={setConfirm} imageInput={imgAvatar}/>
        <FormChangeChangePass dataItem={showFormChangePass} setDataItem={setShowFormChangePass}/>
    </div>
}

export default Home