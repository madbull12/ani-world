import React, { useState } from 'react'
import useSWR from 'swr'
import { Anime } from '../interface';

const fetcher = (url:string) => fetch(url).then((res)=>res.json())
const TopAnimePage = () => {
    const [page,setPage] = useState<number>(1)
    const { data:topAnime } = useSWR(`https://api.jikan.moe/v4/top/anime?page=${page}`,fetcher);

    const { data:anime }: { data:Anime[] } = topAnime || {};
  return (
    <div>
        <button onClick={()=>setPage((prev)=>prev+1)}>Next page</button>
        {anime?.map((item)=>(
            <h1 key={item.mal_id}>{item.title}</h1>
        ))}
    </div>
  )
}

export default TopAnimePage