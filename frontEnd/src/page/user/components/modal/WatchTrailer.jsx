const WatchTrailer = ({trailerUrl, setTrailerUrl}) => {
    const getYouTubeId = (url) => {
        if(!url) return ""
        const prefix = "https://youtu.be/"
        if (!url.startsWith(prefix)) 
            return ""
        
        let rest = url.substring(prefix.length)
        
        const questionIndex = rest.indexOf("?")
        if (questionIndex !== -1) 
            rest = rest.substring(0, questionIndex)
        return rest
    }
    console.log(trailerUrl)

    return <>
         <div className="modal" style={{display: getYouTubeId(trailerUrl) != "" ? 'flex' : 'none'}}>
            <div className="modal-content min-w-[280px] w-[900px] h-[500px] p-4 bg-black">
                <span className="close text-white" onClick={()=>setTrailerUrl("")}>&times;</span>
                <iframe width="100%" height="100%" 
                    src={`https://www.youtube.com/embed/${getYouTubeId(trailerUrl)}`}
                    title="YouTube video player" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowFullScreen>
                </iframe>
            </div>
        </div>
    </>
}

export default WatchTrailer