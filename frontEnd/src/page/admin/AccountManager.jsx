import Aside from './components/Aside'
import ContentAccountManager from './components/ContentAccountManager'
import Header from './components/Header'
import Modal from './components//modal/Modal'
import { useState } from 'react'
const datas = [
    {
        id: '1',
        name: 'Trần Long',
        phone: '0901234567',
        email: 'long.tranminh@gmail.com',
        role: 'staff',
        create_at: '2023-05-12',
        is_activating: 1
    },
    {
        id: '1',
        name: 'Trần Long 2',
        phone: '0901234567',
        email: 'long2.tranminh@gmail.com',
        role: 'user',
        create_at: '2023-05-12',
        is_activating: 1
    },
    {
        id: '1',
        name: 'Trần Long 3',
        phone: '0901234567',
        email: 'long3.tranminh@gmail.com',
        role: 'user',
        create_at: '2023-05-12',
        is_activating: 0
    }
]
const MovieManager = () => {
    const [dataMovie, setDataMovie] = useState(null)
    const [dataRender, setDataRender] = useState(datas)

    let propsOfAccount = {
        datas,
        dataRender,
        setDataItem: setDataMovie,
        setDataRender
    }

    return <div className="bg-background text-on-background min-h-screen flex">
        <Aside/>
        <main className="ml-64 flex-1 flex flex-col min-h-screen bg-surface-container-lowest">
            <Header/>
            <ContentAccountManager {...propsOfAccount}/>
        </main>
        <Modal styleModal="movie" data={dataMovie} setDataItem={setDataMovie}/>
    </div>
}

export default MovieManager