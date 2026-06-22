import Aside from './components/Aside'
import ContentProfile from './components/ContentProfile'
import Header from './components/Header'

const Profile = () => {
    return <div className="bg-background text-on-background min-h-screen flex">
        <Aside/>
        <main className="ml-64 flex-1 flex flex-col min-h-screen bg-surface-container-lowest">
            <Header/>
            <ContentProfile />
        </main>
    </div>
}

export default Profile