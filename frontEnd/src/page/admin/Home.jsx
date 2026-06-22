import Aside from './components/Aside'
import Header from './components/Header'
import ContentAdminBranch from './components/ContentAdminBranch'

const Home = () => {
    return <div className="bg-background text-on-background min-h-screen flex">
        <Aside/>
        <main className="ml-64 flex-1 flex flex-col min-h-screen bg-surface-container-lowest">
            <Header/>
            <ContentAdminBranch/>
        </main>
    </div>
}

export default Home