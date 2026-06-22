import {Header, ContentHome, Footer} from "./components/index"
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import WatchTrailer from "./components/modal/WatchTrailer"

const  Home = () => {
    const navigate = useNavigate() 
    const [trailer, setTrailer] = useState("abc")
    useEffect(() => {
        const handleKeyDown = (e) => {
          if (e.altKey && e.shiftKey && e.key.toLowerCase() === 'a') {
            navigate('/login/internal')
          }
        }
    
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown)
      }, [navigate])

    return <>
        <Header/>
        <ContentHome setTrailer={setTrailer}/>
        <WatchTrailer trailerUrl={trailer} setTrailerUrl={setTrailer}/>
        <Footer/>
    </>
}

export default Home