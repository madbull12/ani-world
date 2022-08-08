import { Jelly } from '@uiball/loaders';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import useSWR from 'swr';
import AnimeDetailsComponent from '../../../components/AnimeDetailsComponent';
import { Character, Staff } from '../../../interface';
import { v4 as uuidv4 } from 'uuid';
import Image from 'next/image';
import { motion } from 'framer-motion';
import MotionBtn from '../../../components/MotionBtn';
import { useTheme } from '../../../lib/zustand';


const fetcher = (url:string) => fetch(url).then(res=>res.json());
const CharactersPage = () => {
    const router = useRouter();
    const { animeId } = router.query;
    const { data,error } = useSWR(`https://api.jikan.moe/v4/anime/${animeId}`,fetcher);
    const { data:animeCharacters } = useSWR(`https://api.jikan.moe/v4/anime/${animeId}/characters`,fetcher);
    const { data:animeStaff } = useSWR(`https://api.jikan.moe/v4/anime/${animeId}/staff`,fetcher);
  

    const { data:anime } = data || {};
    const { data:characters }: { data:Character[] } = animeCharacters || {};
    const { data:staff }: { data:Staff[] } = animeStaff || {};

    const [loadMoreCharacters,setLoadMoreCharacters] = useState(10);
    const [loadMoreStaff,setLoadMoreStaff] = useState(10);

    const { theme } = useTheme();

  return (
    <div>
        <AnimeDetailsComponent anime={anime} />  
        {characters && staff ? (
            <div className='px-4 pb-4'>
                <h1 className='text-2xl font-bold pb-2'>Characters</h1>
                <div className={`divide-y last:divide-y-0 bg-${theme}-100 p-2 divide-gray-300 mb-4`}>
                    {characters.slice(0,loadMoreCharacters).map((character)=>(
                        <div key={uuidv4()} className="flex  py-2 justify-between">
                            <div className='flex gap-x-2 self-start'>
                                <Image className='rounded-lg' src={character?.character.images.jpg.image_url} width={60} height={70} alt={character.character.name} objectFit="cover" />
                                <div className='space-y-3'>
                                    <p className={`font-semibold text-${theme}-500`}>{character?.character.name}</p>
                                    <p className="text-sm text-gray-500">{character?.role}</p>
                                </div>
                            
                            </div>
                            <div className='space-y-2'>
                                {character?.voice_actors.map((voice_actor)=>(
                                    <div  key={uuidv4()} className="flex gap-x-2 justify-between w-[200px]">
                                        <div className=''>
                                            <p className={`font-semibold text-${theme}-500`}>{voice_actor.person.name}</p>
                                            <p className="text-sm text-gray-500">{voice_actor.language}</p>
                                        </div>
                                        <div>
                                            <Image className='rounded-lg' src={voice_actor.person.images.jpg.image_url} width={60} height={70} alt={voice_actor.person.name} objectFit="cover" />

                                        </div>

                                    </div>
                            
                                ))}
                            </div>

                        </div>

                    ))}
                    
                    <div className='flex justify-center'>
                        
                    
                            <MotionBtn
                                handleClick={()=>
                                    (characters?.length >= loadMoreCharacters)
                                    ? 
                                    setLoadMoreCharacters((prev => prev+=5))
                                    :
                                    setLoadMoreCharacters(10)
                                }
                                string={(characters?.length >= loadMoreCharacters) ? "Load more" : "Show less"}
                            />


                    </div>


                </div>
                <h1 className='text-2xl font-bold pb-2'>Staff</h1>
                <div className={`divide-y  bg-${theme}-100 p-2 space-y-4 divide-gray-300 `}>
                  
                        {staff?.slice(0,loadMoreStaff).map((item)=>(
                            <div key={uuidv4()} className="flex gap-x-2 py-2">
                                <Image src={item.person.images.jpg.image_url} alt={item.person.name} width={60} height={70} objectFit="cover" className='rounded-lg' />
                                <div className='space-y-3'>
                                    <p className={`font-semibold text-${theme}-500`}>{item.person.name}</p>
                                    {item.positions.map((position,i:any)=>(
                                    <span key={uuidv4()} className="font-normal">{`${i  ? "," : ""} ${position}`}</span>
                              ))}
                                </div>
                            </div>
                        ))}
                         <div className='flex justify-center'>
                        
                    
                            <MotionBtn
                                handleClick={()=>
                                    (staff?.length >= loadMoreStaff)
                                    ? 
                                    setLoadMoreStaff((prev => prev+=5))
                                    :
                                    setLoadMoreStaff(10)
                                }
                                string={(staff?.length >= loadMoreStaff) ? "Load more" : "Show less"}
                            />


                        </div>

                 
                </div>
                
            </div>
        ):(
            <div className='h-full w-full grid place-items-center'>
                <Jelly color="#007CEF"  />
  
          </div>
        )}
    </div>
  )
}

export default CharactersPage