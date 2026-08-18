import React, { useRef, useState } from 'react'
import {ArrowBigLeft, ArrowBigRight} from "lucide-react"
import MovieCard from './MovieCard'
import MovieComing from './MovieComing'

const Gallery = ({datas, typElement}) => {
    const style = {
        movieCard: MovieCard,
        movieComing: MovieComing
    }
    
    let Element = style[typElement]
    const trackRef = useRef(null)
    const viewportRef = useRef(null)
    const [currentScroll, setCurrentScroll] = useState(0)

    const scrollGallery = (direction) => {
      const track = trackRef.current
      const viewport = viewportRef.current
  
      if (!track || !viewport) return
  
      const firstItem = track.querySelector('.gallery-item')
      const itemWidth = firstItem ? firstItem.offsetWidth + 15 : 0
      const maxScroll = track.scrollWidth - viewport.offsetWidth
  
      let newScroll = currentScroll - (direction * itemWidth)
  
      if (newScroll < 0) newScroll = 0;
      if (newScroll > maxScroll) newScroll = maxScroll
  
      setCurrentScroll(newScroll)
    }

    return (datas?.length > 0 &&<>
        {typElement=="movieCard"&&<h2 className="font-headline-lg text-headline-md text-white">Có thể bạn quan tâm</h2>}

         <div className="flex items-center gap-4">
            <button 
                className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-400 hover:border-red-600 hover:text-red-600 transition-colors" 
                onClick={() => scrollGallery(-1)}
                >
                <span className="material-symbols-outlined" data-icon="arrow_back">
                    <ArrowBigLeft size={20}/>
                </span>
            </button>
            
            <div className="overflow-hidden w-[100%]" ref={viewportRef}>
                <div className="flex gap-4" ref={trackRef} style={{ transform: `translateX(-${currentScroll}px)`, transition: 'transform 0.3s ease' }}>
                        {
                            datas.map((item, index) => (
                                <div key={index} className="gallery-item w-[calc(50%-14px)] md:w-[calc(33.33%-14px)] lg:w-[calc(25%-14px)] shrink-0">
                                    <Element data={item} />
                                </div>
                            ))
                        }
                </div>
            </div>
    
            <button 
                className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-400 hover:border-red-600 hover:text-red-600 transition-colors" 
                onClick={() => scrollGallery(1)}
            >
                <span className="material-symbols-outlined" data-icon="arrow_back">
                    <ArrowBigRight size={20}/>
                </span>
            </button>
      </div>
    </>)
}


export default Gallery