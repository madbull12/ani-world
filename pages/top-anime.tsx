import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import { Anime } from '../interface';
import { v4 as uuidv4 } from 'uuid'
import MotionBtn from '../components/MotionBtn';
import Image from 'next/image';
import Link from 'next/link';
import moment from 'moment';
import useLocalStorage from '../hooks/useLocalStorage';
import fetcher from '../helper/fetcher';

const TopAnimePage = () => {
    const [page,setPage] = useLocalStorage("page",1);
    const { data:topAnime } = useSWR(`https://api.jikan.moe/v4/top/anime?page=${page}`,fetcher);

    const { data:anime }: { data:Anime[] } = topAnime || {};
    const { items,last_visible_page: pageCount } = topAnime?.pagination || {};
    // const [itemOffset, setItemOffset] = useState(0);

    console.log(topAnime)


  return (
    <div className='max-w-7xl mx-auto'>
      <h1 className='text-2xl font-bold pt-2'>Top Anime</h1>
      <div className='text-blue-500 font-bold justify-end my-4  flex gap-x-2'>
          {page > 1 &&  <button onClick={()=>setPage(page-1)} className="hover:text-blue-400">Previous</button>}
          
          <button onClick={()=>setPage(page+1)} className="hover:text-blue-400">Next</button>

        </div>
        {/* <button onClick={()=>setPage((prev)=>prev+1)}>Next page</button> */}
        <table className='w-full mt-2 border'>
          <tbody>
          <tr className='bg-blue-500 text-white '>
            <th>Rank</th>
            <th className='w-[70%]'>Title</th>
            <th>Score</th>
            <th>Status</th>
          </tr>
          {anime?.map((item)=>(
            <tr key={uuidv4()} className="[&>*]:text-center [&>*]:p-2 [&:nth-child(even)]:bg-blue-50 divide-x">
              <td className='text-gray-400 text-4xl font-bold'>{item.rank}</td>
              <td className='flex gap-x-2'>
                <Image alt={item.title} src={item.images.jpg.image_url} width={60} height={80} />
                <div className='[&>p]:text-gray-400 [&>p]:text-xs text-start '>
                  <Link href={`/anime/${item.mal_id}`}>
                    <span className='font-bold text-blue-500 cursor-pointer hover:text-blue-400'>{item.title}</span>

                  </Link>
                  <p>{item.type} ({item.episodes} eps)</p>

                  <p>{moment(item.aired.from).format("LL")} - {moment(item.aired.to).format("LL")}</p>
                  <p>{item.members.toLocaleString()} members</p>
                </div>
            

              </td>
              <td>{item.score}</td>
              <td><MotionBtn 
                string="Add to list"
                handleClick={()=>console.log("clicked")} 
              /></td>
            </tr>
          ))}
          </tbody>
          
        
        </table>
        <div className='text-blue-500 font-bold justify-center my-4  flex gap-x-2'>
          {page > 1 &&  <button onClick={()=>setPage(page-1)} className="hover:text-blue-400">Previous</button>}
          
          <button onClick={()=>setPage(page+1)} className="hover:text-blue-400">Next</button>

        </div>
      

    </div>
  )
}

export default TopAnimePage