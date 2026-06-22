import Aside from './components/Aside'
import Profile from './components/Profile'
import Header from './components/Header'
import Modal from '../admin/components/modal/Modal'
import { useState } from 'react'

const Home = () => {
    const [info, setInfo] = useState(null)
   
    return <div className="bg-background text-on-background min-h-screen flex">
        <Aside/>
        <main className="ml-64 flex-1 flex flex-col min-h-screen bg-surface-container-lowest">
            <Header/>
            <Profile setDataItem={setInfo}/>
        </main>
        <Modal styleModal="updateInfo" dataItem={info} setDataItem={setInfo}/>
    </div>
}

export default Home