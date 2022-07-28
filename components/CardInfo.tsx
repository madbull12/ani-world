import moment from 'moment'
import Link from 'next/link'
import React, { useState } from 'react'
import {  IoPlay } from 'react-icons/io5'
import { IoMdArrowDropup,IoMdArrowDropdown } from 'react-icons/io'
import {  AnimeDetailsProps } from '../interface'
import { v4 as uuidv4 } from 'uuid'
import Image from 'next/image'
import truncate from '../helper/truncate'


interface IProps{
  anime:AnimeDetailsProps
}
const CardInfo = ({ anime }:IProps) => {
  const [expand,setExpand] = useState<boolean>(false);
  
  return (
    <article className='border p-2'>
      
       
          <p className="text-sm md:text-base h-[80px] grid place-items-center py-2 cursor-pointer text-blue-500 hover:text-blue-400 font-bold text-center ">
            <Link href={`/anime/${anime.mal_id}`}  >{anime.title}</Link>
          </p>
        
        <div className='bg-blue-50 p-2 flex items-center gap-x-8'>
          <div className='w-6 text-white h-6 rounded-full bg-blue-500 grid place-items-center'>
            <a rel="noopener noreferrer" href={anime.trailer.url} target="_blank">
              <IoPlay className='cursor-pointer' />

            </a>
          </div>
          <div className='text-sm divide-x-2 text-gray-400 flex gap-x-2'>
            <span>{moment(anime.aired.from).format("ll")}</span>
            <span className='pl-2'>{anime.episodes ? anime.episodes : "?"} eps {anime.duration}</span>
          </div>

        </div>
        <div className='bg-blue-100 text-blue-500 justify-center p-2 flex gap-x-2 text-xs'>
          {anime.genres.map((genre)=>(
            <p key={uuidv4()} className="cursor-pointer hover:text-blue-400">{genre.name}</p>
          ))}
        </div>
        <div className='flex relative gap-x-2 h-[200px] w-full overflow-y-scroll overflow-x-hidden'>
          
            <div className='w-1/2 h-full relative  '>
              <Image src={anime.images.jpg.image_url}  
                  layout="fill"
                  objectFit='cover'
                  alt={anime.title}  
                />
            </div>
          
      
      
        <div className='w-1/2 '>
          <p className='text-xs md:text-sm text-ellipsis '>{expand ? anime.synopsis :  truncate(anime.synopsis,250)}</p>
          <div className="grid place-items-center text-2xl ">
            {!expand ? <IoMdArrowDropdown className='cursor-pointer animate-bounce' onClick={()=>setExpand(true)} /> : <IoMdArrowDropup className='cursor-pointer animate-bounce' onClick={()=>setExpand(false)} />}
          </div>

        </div>
        </div>
    </article>
  )
}

export default CardInfo