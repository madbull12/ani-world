import Image from 'next/image'
import React, { FC, useState } from 'react'
import { IoAddCircleOutline, IoHeartCircleOutline } from 'react-icons/io5'
import { Anime, AnimeDetailsProps, Genre } from '../interface'
import Backdrop from './Backdrop'
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { Jelly } from '@uiball/loaders'
import Link from 'next/link'

interface IDetails {
    anime:AnimeDetailsProps,
    children?:React.ReactNode
}


const AnimeDetailsComponent = ({ anime,children }:IDetails) => {
    const tabLinks = [
        "videos",
        "episodes",
        "reviews",
        "recommendations",
        "stats",
        "characters",

    ]
    const [_link,setLink] = useState("videos");
    const router = useRouter();
    const { animeId } = router.query;
    // console.log(animeId);


    const convertToDate = (x:string) => {
        const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
        ];
        const date = new Date(x);

        const year = date.getFullYear();
        let dt:string | number = date.getDate();
        let month = monthNames[date.getMonth()];

        if(dt<10) {
            dt="0"+dt;
        }
        
        if(!x) {
            return "N/A"
        }

        return (`${dt} ${month}, ${year}`)
    }

  return (
    <div>
        {anime && (
            <>
            <div className='relative'>
                <Image alt={anime.title} src={anime.images.jpg.large_image_url} width="100%" height={25} layout="responsive" objectFit='cover'  />
                <div className='absolute z-50 -bottom-40 left-0  px-8 flex  gap-x-8 w-full'>
                  
                        <Image alt={anime.title} src={anime.images.jpg.large_image_url} width={220} height={300} className="rounded-lg" objectFit='cover' />
                        <div className='pt-16 '>
                            <div>
                                <h1 className='text-white font-bold text-3xl '>{anime.title}</h1>
                                <p className="text-white font-thin text-lg">{anime.title_japanese}</p>
                       
                            </div>
                        </div>
                        <div className='pt-16 ml-auto text-white text-4xl flex'>
                      
                                <IoAddCircleOutline />
                                <IoHeartCircleOutline />

                        </div>
                        
                </div>
                <Backdrop color="#1085f1" />
            </div>
            <section className='bg-[#007CEF] w-full py-4 pr-4 text-white'>
                <div className='ml-[285px] space-y-3'>
                    <header className='flex justify-between '>
                        <h1 className='text-xl font-bold'>Synopsis</h1>
                        <div className='flex space-x-4'>
                            <p className='font-semibold'>
                                Ranked:
                                <span className='font-normal'> #{anime.rank?.toLocaleString() || "N/A"}</span>
                            </p>
                            <p className='font-bold'>
                                Popularity:
                                <span className='font-normal'> #{anime.popularity?.toLocaleString() || "N/A"}</span>
                            </p>
                            <p className='font-semibold'>
                                Members:
                                <span className='font-normal'> {anime.members?.toLocaleString() || "N/A"}</span>
                            </p>
                        </div>
                    </header>
                    <p>
                        {anime.synopsis}
                    </p>
                </div>
                <div className='p-8 flex gap-x-4 mt-8'>
                    <div className='text-white bg-[#FF9901] rounded-lg p-2 flex flex-col items-center'>
                        <span className='font-bold text-xs'>SCORE</span>
                        <span className='text-2xl font-bold'>{anime.score || "N/A"}</span>
                        <span className='text-xs font-normal'>{anime.scored_by?.toLocaleString() || "N/A"} users</span>
                    </div>
                    <div className='rounded-lg border-2 border-gray-700 p-3 space-y-2 flex flex-col '>
                        <div className='space-x-4'>
                            <span className='font-semibold'>Type: <span className='font-normal'>{anime.type}</span></span>
                            <span className='font-semibold'>Episodes: <span className='font-normal'>{anime.episodes || "N/A"}</span></span>
                            <span className='font-semibold'>
                                Genres: 
                              {anime.genres.map((genre:Genre,i:any)=>(
                                <span key={uuidv4()} className="font-normal">{`${i  ? "," : ""} ${genre.name}`}</span>
                              ))}
                            </span>
                            <span className='font-semibold'>Status: <span className='font-normal'>{anime.status}</span></span>
                            
                        </div>
                        <div className='space-x-4'>
                            <span className='font-semibold'>Aired: <span className='font-normal'>from {convertToDate(anime.aired.from)} to {convertToDate(anime.aired.to)} </span></span>
                            <span className='font-semibold'><span className='font-normal'>Broadcast: {anime.broadcast.string}</span></span>
                            <span className='font-semibold'>
                                Studios:
                              {anime.studios.map((studio:Genre,i:any)=>(
                                <span key={uuidv4()} className="font-normal">{`${i  ? "," : ""} ${studio.name}`}</span>
                            ))}
                            </span>

                        </div>
                    </div>
                    
                </div>
            
            </section>
            <section className='bg-white p-8 max-7xl mx-auto'>
                <nav>
                    <ul className='flex justify-between'>
                        {tabLinks.map((link,i)=>(
                            <Link href={`/anime/${animeId}/${link}`} key={uuidv4()} scroll={false}>
                                 <li  className={`font-bold pb-2 uppercase text-sm cursor-pointer ${(router.pathname.includes(link))  ? "border-b-4 border-blue-500" : ""}`} onClick={()=>setLink(link)}>{link}</li>
                            </Link>
                           
                        ))}
                    </ul>
                </nav>
                {children}
            </section>
        </>
        
    
        )}
        

        
    </div>
   
  )
}

export default AnimeDetailsComponent