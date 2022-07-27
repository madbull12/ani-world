import { Jelly } from '@uiball/loaders';
import { useRouter } from 'next/router';
import React from 'react'
import useSWR from 'swr';
import SeasonalNav from '../../../../components/SeasonalNav'
import fetcher from '../../../../helper/fetcher';
import { Anime } from '../../../../interface';


const SeasonalPage = () => {
  
  const router = useRouter();
  const { year:yearId ,season:seasonId } = router.query;

  const { data } = useSWR(`https://api.jikan.moe/v4/seasons/${yearId}/${seasonId}`,fetcher);

  const { data:anime }:{ data:Anime[] } = data || {}
  console.log(data);

  return (
    <div className='max-w-7xl mx-auto p-4'>
      <SeasonalNav />
      {anime ? (
        <div>{JSON.stringify(anime)}</div>
      ):(
        <div className='h-full w-full grid place-items-center'>
          <Jelly color="#007CEF"  />

    </div>
      )}
    </div>
  )
}

export default SeasonalPage