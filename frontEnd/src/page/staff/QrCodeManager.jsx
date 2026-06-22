import Aside from './components/Aside'
import ContentQrCode from './components/ContentQrCode'
import Header from './components/Header'
import Modal from '../admin/components/modal/Modal'
import { useState } from 'react'

const Ticket = () => {
    const [dataMovie, setDataMovie] = useState(null)
    return <div className="bg-background text-on-background min-h-screen flex">
        <Aside/>
        <main className="flex-1 md:ml-64 min-h-screen relative flex flex-col bg-surface-container-lowest">
            <Header/>
            <ContentQrCode setDataItem={setDataMovie}/>
        </main>
        <Modal styleModal="checkTicket" dataItem={dataMovie} setDataItem={setDataMovie}/>
    </div>
}

export default Ticket