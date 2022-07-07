import { Jelly } from '@uiball/loaders';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import useSWR from 'swr';
import AnimeDetailsComponent from '../../../components/AnimeDetailsComponent';
import { Character, Staff } from '../../../interface';
import { v4 as uuidv4 } from 'uuid';
import Image from 'next/image';
import { motion } from 'framer-motion';


const fetcher = (url:string) => fetch(url).then(res=>res.json());
const CharactersPage = () => {
    const router = useRouter();
    const { animeId } = router.query;
    const { data,error } = useSWR(`https://api.jikan.moe/v4/anime/${animeId}`,fetcher);
    const { data:animeCharacters } = useSWR(`https://api.jikan.moe/v4/anime/${animeId}/characters`,fetcher);
    const { data:animeStaff } = useSWR(`https://api.jikan.moe/v4/anime/${animeId}/staff`,fetcher);
    console.log(animeCharacters)

    const { data:anime } = data || {};
    const { data:characters }: { data:Character[] } = animeCharacters || {};
    const { data:staff }: { data:Staff[] } = animeCharacters || {};

    const [loadMore,setLoadMore] = useState(10);
    

  return (
    <div>
        <AnimeDetailsComponent anime={anime} />  
        {characters ? (
            <div className='px-4 pb-4'>
                <h1 className='text-2xl font-bold pb-2'>Characters</h1>
                <div className="divide-y last:divide-y-0 bg-blue-100 p-2 divide-gray-300">
                    {characters.slice(0,loadMore).map((character)=>(
                        <div key={uuidv4()} className="flex   justify-between">
                            <div className='flex gap-x-2 self-start'>
                                <Image className='rounded-lg' src={character?.character.images.jpg.image_url} width={60} height={70} alt={character.character.name} objectFit="cover" />
                                <div className='space-y-3'>
                                    <p className='font-semibold text-blue-500'>{character?.character.name}</p>
                                    <p className="text-sm text-gray-500">{character?.role}</p>
                                </div>
                            
                            </div>
                            <div className='space-y-2'>
                                {character?.voice_actors.map((voice_actor)=>(
                                    <div  key={uuidv4()} className="flex gap-x-2 justify-between w-[200px]">
                                        <div className=''>
                                            <p className='font-semibold text-blue-500'>{voice_actor.person.name}</p>
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
                        {characters?.length >= loadMore ? (
                            <motion.button 
                                className='bg-blue-200 shadow-md  px-4 py-2 rounded-lg font-bold text-blue-500 mt-2' 
                                onClick={()=>setLoadMore((prev)=>prev+=5)}
                                whileHover={{
                                    scale: 1.1,
                                    
                                  }}
                                whileTap={{ scale: 0.9 }}
                            >
                                Load more
                            </motion.button>

                        ):(
                            <button className='bg-blue-200  px-4 py-2 rounded-lg font-bold text-blue-500 mt-2' onClick={()=>setLoadMore(10)}>Load less</button>

                        )}

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