import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react'
import useSWR from 'swr';
import { v4 as uuidv4 } from 'uuid';
import AnimeDetailsComponent from '../../../components/AnimeDetailsComponent';


const fetcher = (url:string) => fetch(url).then(res=>res.json());
const EpisodePage = () => {
    const router = useRouter();
    const { animeId } = router.query;
    const { data,error } = useSWR(`https://api.jikan.moe/v4/anime/${animeId}`,fetcher);
    const { data:animeVideos } = useSWR(`https://api.jikan.moe/v4/anime/${animeId}/videos`,fetcher);

    const { data:videos } =  animeVideos || {};
    const { data:anime } = data || {};

    console.log(videos);

  return (
    <div>
        
        <AnimeDetailsComponent anime={anime} />
        <div>
            {videos ? (
                <>
                {videos?.episodes.length === 0 ? (
            <h1 className='text-lg font-semibold'>No episodes added</h1>
        ):(
            <>
                <h1 className='text-2xl font-bold'>Episode Lists</h1>
                <div className=' gap-4 grid grid-cols-2'>
                    {videos?.episodes?.map((_episode:any)=>(
                        <div key={uuidv4()} className="flex bg-gray-100 p-2 gap-x-2">
                            <Image src={_episode.images.jpg.image_url || "https://images.wondershare.com/repairit/aticle/2021/07/resolve-images-not-showing-problem-1.jpg"} width={100} height={100} alt={_episode.title} className="rounded-lg" />
                            <div>
                                <h1 className='font-bold text-lg'>{_episode.episode}</h1>
                                <p>{_episode.title}</p>
                            </div>
                            
                        </div>
                    ))}
                </div>
            </>
        )}
                </>
            ):(
                <p>Theres an error</p>
            )}
        </div>
  
        

    </div>
  )
}

export default EpisodePage