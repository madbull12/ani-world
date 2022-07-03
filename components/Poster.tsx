import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { Anime } from '../interface'

interface IProps {
    anime:Anime
}

const Poster = ({ anime }: IProps) => {
    const [showTitle,setShowTitle] = useState<boolean>(false);
  return (
    <Link href={`/anime/${anime.mal_id}`}>
        <article className='cursor-pointer relative group overflow-hidden h-full '
            onMouseEnter={()=>setShowTitle(true)}
            onMouseLeave={()=>setShowTitle(false)}
        >
     
            <Image alt={anime.title} src={anime.images.jpg.image_url} width={180} height={220} objectFit="cover" className="rounded-lg ease-in-out duration-150 transition-all group-hover:scale-105 " />

          
            <div 
                className={`bg-[#007CEF] absolute bottom-0 rounded-b-lg   w-full ease-in-out duration-150 transition-all ${showTitle ? "h-[40px] p-2" : "h-0"}`}
        
            >
                <h1 className=' text-white  truncate font-bold'>{anime.title}</h1>

            </div>
        </article>
    
    </Link>
  
        


  )
}

export default Poster