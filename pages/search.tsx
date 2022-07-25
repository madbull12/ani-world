import { Jelly } from '@uiball/loaders';
import { useRouter } from 'next/router';
import React from 'react'
import useSWR from 'swr';
import Poster from '../components/Poster';
import { Anime } from '../interface';
import { v4 as uuidv4 } from 'uuid';


const fetcher = (url:string) => fetch(url).then(res=>res.json());

const SearchPage = () => {
    const router=useRouter();
    const { q:term,cat } = router.query;
    const { data:animeItem } = useSWR(`https://api.jikan.moe/v4/${cat}?q=${term}`,fetcher);
    const { data:anime }:{ data:Anime[] } = animeItem || {};



  return (
    <main className="max-w-7xl mx-auto">
        <h1 className='text-2xl text-center my-2 font-bold'>Search results</h1>
        {anime ? (
            <div >
                {anime.map((item)=>(
                    <h1 key={uuidv4()}>{item.title}</h1>
                ))}
            </div>
        ):(
            <div className='h-full w-full grid place-items-center'>
                <Jelly color="#007CEF"  />

            </div>
        )}
    </main>
  )
}

export default SearchPage