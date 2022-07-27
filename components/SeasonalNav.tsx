import React from 'react'
import useSWR from 'swr';
import { IoEllipsisHorizontal } from 'react-icons/io5'
import Link from 'next/link';
import { v4 as uuidv4 } from 'uuid'
import { Jelly } from '@uiball/loaders';
import { useRouter } from 'next/router';

interface ISeason {
    seasons:string[];
    year:number;
}

const fetcher = (url:string)=>fetch(url).then(res=>res.json());
const SeasonalNav = () => {
    const { data } = useSWR("https://api.jikan.moe/v4/seasons",fetcher);

    const router = useRouter();
    const { year:yearId,season:seasonId } = router.query;
    const { data:items }: { data:ISeason[] } = data || {};

    console.log(items);
    console.log(router.query)


  return (
    <header className='max-w-7xl mx-auto p-4'>
        <h1 className='font-bold text-2xl '>Seasonal Anime</h1>
        {items ? (
            <nav className='p-2'>
            <ul className='space-x-4 flex items-center text-blue-500'>
                <IoEllipsisHorizontal className='cursor-pointer hover:bg-blue-500 hover:text-white duration-100 ease-in p-1 text-3xl ' />
                {items[1]?.seasons?.map((season)=>(
                    <Link key={uuidv4()} href={`/anime/season/${season}/${items[1].year}`}>
                        <span className={`${(Number(yearId) === items[1].year && seasonId === season) ? "bg-blue-500":""}  capitalize cursor-pointer hover:bg-blue-500 p-1 hover:text-white duration-100 ease-in`}>
                            {season} {items[1]?.year}
                        </span>
                    </Link>
                ))}
                <IoEllipsisHorizontal className='cursor-pointer hover:bg-blue-500 hover:text-white duration-100 ease-in p-1 text-3xl  ' />

            </ul>
        </nav>
        ):(
            <div className='h-full w-full grid place-items-center'>
                <Jelly color="#007CEF"  />

        </div>
        )}

    </header>
  )
}

export default SeasonalNav