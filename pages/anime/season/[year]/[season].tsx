import { Jelly } from '@uiball/loaders';
import { useRouter } from 'next/router';
import React from 'react'
import useSWR from 'swr';
import CardInfo from '../../../../components/CardInfo';
import SeasonalNav from '../../../../components/SeasonalNav'
import fetcher from '../../../../helper/fetcher';
import { AnimeDetailsProps } from '../../../../interface';
import { v4 as uuidv4 } from 'uuid'

const SeasonalPage = () => {
  
  const router = useRouter();
  const { year:yearId ,season:seasonId } = router.query;

  const { data } = useSWR(`https://api.jikan.moe/v4/seasons/${yearId}/${seasonId}`,fetcher);

  const { data:anime }:{ data:AnimeDetailsProps[] } = data || {}
  console.log(data);

  return (
    <div className='max-w-7xl mx-auto p-4'>
      <SeasonalNav />
      {anime ? (
        <div  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4">
          {anime.map((item)=>(
        
              <CardInfo key={uuidv4()} anime={item} />
        
          ))}
        </div>
      ):(
        <div className='h-full w-full grid place-items-center'>
          <Jelly color="#007CEF"  />

    </div>
      )}
    </div>
  )
}

export default SeasonalPage