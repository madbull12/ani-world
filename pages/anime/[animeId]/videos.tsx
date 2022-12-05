import { useRouter } from 'next/router';
import React from 'react'
import useSWR from 'swr';
import AnimeDetailsComponent from '../../../components/AnimeDetailsComponent';
import fetcher from '../../../helper/fetcher';

const VideoPage = () => {
    const router = useRouter()
  const { animeId } = router.query;

    const { data, error } = useSWR(
        `https://api.jikan.moe/v4/anime/${animeId}`,
        fetcher
      );
    //   const { data: animeVideos } = useSWR(
    //     `https://api.jikan.moe/v4/anime/${animeId}/videos`,
    //     fetcher
    //   );
    
    //   const { data: videos } = animeVideos || {};
      const { data: anime } = data || {};
  return (
    <div>
        <AnimeDetailsComponent anime={anime} />
    </div>
  )
}

export default VideoPage