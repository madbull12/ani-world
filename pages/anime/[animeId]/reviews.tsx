import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react'
import useSWR from 'swr';
import AnimeDetailsComponent from '../../../components/AnimeDetailsComponent';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import truncate from '../../../helper/truncate';
import { Jelly } from '@uiball/loaders';
const fetcher = (url:string) => fetch(url).then(res=>res.json());

const ReviewPage = () => {
  const router = useRouter();
  const { animeId } = router.query;
  const { data,error } = useSWR(`https://api.jikan.moe/v4/anime/${animeId}`,fetcher);
  const { data:animeReviews } = useSWR(`https://api.jikan.moe/v4/anime/${animeId}/reviews`,fetcher);
  const { data:animeVideos } = useSWR(`https://api.jikan.moe/v4/anime/${animeId}/videos`,fetcher);

  const { data:videos } =  animeVideos || {};
  const { data:reviews } =  animeReviews || {};
  const { data:anime } = data || {};

  return (
    <div>
        <AnimeDetailsComponent anime={anime} />
        {reviews ? (
            <div className='px-4'>
                {reviews.length === 0 ?(
                    <h1 className="text-lg font-semibold">No reviews</h1> 
                ):(
                    <>
                     <h1 className='text-2xl font-bold'>Reviews</h1>
            <div className="space-y-2">
                {reviews?.slice(0,10).map((review:any,i:any)=>(
                    <div key={uuidv4()} className="w-full bg-blue-50 p-2 divide-y divide-gray-300">
                        <div className='flex space-between  '>
                            <div className='flex gap-x-2'>
                                <Image src={review.user.images.jpg.image_url} width={50} height={70} alt={review.user.username} className="rounded-lg" />
                                <div>
                                    <p className='text-blue-500 font-thin'>{review.user.username}</p>
                                    <p className='text-gray-400'><span className='font-bold'>{review.votes}</span> people find this review helpful</p>
                                </div>
                            
                            </div>
                            <div className='ml-auto space-y-2'>
                                <p className='text-sm'>{moment(review.date).format("LL")}</p>
                                <p className='text-sm text-gray-400'>{review.episodes_watched} of {videos?.episodes.length} episodes watched</p>
                                <p>Overall rating: {review.scores.overall}</p>
                            </div>
                        </div>
                        <div>
                            <p className='text-sm py-4'>
                                {truncate(review.review,1000)}
                                <button onClick={()=>{
                                
                                }} className=' font-semibold  text-blue-500 cursor-pointer ml-1'>read more</button>
                            </p>
                        
                            
                        </div>
                    
                    </div>
                ))}
            </div>
                    </>
                )}
           
        </div>
        ):(
            <div className='h-full w-full grid place-items-center'>
                <Jelly color="#007CEF"  />

            </div>
        )}
        
    </div>
        
  )
}

export default ReviewPage