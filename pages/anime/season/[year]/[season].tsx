import { Jelly } from '@uiball/loaders';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import useSWR from 'swr';
import CardInfo from '../../../../components/CardInfo';
import SeasonalNav from '../../../../components/SeasonalNav'
import fetcher from '../../../../helper/fetcher';
import { AnimeDetailsProps } from '../../../../interface';
import { v4 as uuidv4 } from 'uuid'

const SeasonalPage = () => {
  const router = useRouter();
  const { year:yearId ,season:seasonId } = router.query;
  const[page,setPage] = useState(1);


  const { data } = useSWR(`https://api.jikan.moe/v4/seasons/${yearId}/${seasonId}?page=${page}`,fetcher);

  const { data:anime }:{ data:AnimeDetailsProps[] } = data || {}


  return (
    <div className='max-w-7xl mx-auto p-4'>
          <SeasonalNav />

      {anime ? (
        <>

          <div className='text-blue-500 font-bold justify-end my-4  flex gap-x-2'>
            {page > 1 &&  <button onClick={()=>setPage(page-1)} className="hover:text-blue-400">Previous</button>}
            
            <button onClick={()=>setPage(page+1)} className="hover:text-blue-400">Next</button>

          </div>
          <div  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4">
            {anime.map((item)=>(

                <CardInfo key={uuidv4()} anime={item} />

            ))}
          </div>
          <div className='text-blue-500 font-bold justify-center my-4  flex gap-x-2'>
            {page > 1 &&  <button onClick={()=>setPage(page-1)} className="hover:text-blue-400">Previous</button>}
            
            <button onClick={()=>setPage(page+1)} className="hover:text-blue-400">Next</button>

          </div>
        </>
       
      ):(
        <div className='h-full w-full grid place-items-center'>
          <Jelly color="#007CEF"  />

    </div>
      )}
    </div>
  )
}

export default SeasonalPage