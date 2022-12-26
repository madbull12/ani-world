import { useRouter } from 'next/router';
import React from 'react'
import useSWR from 'swr';
import MangaDetailsComponent from '../../../components/MangaDetailsComponent';
import ReviewsList from '../../../components/ReviewsList';
import fetcher from '../../../helper/fetcher';

const ReviewManga = () => {
    const { mangaId } = useRouter().query;
    const { data: manga, error } = useSWR(
      `https://api.jikan.moe/v4/manga/${mangaId}`,
      fetcher
    );
    const { data: mangaReviews } = useSWR(
      `https://api.jikan.moe/v4/manga/${mangaId}/reviews`,
      fetcher
    );
  return (
    <div>
      <MangaDetailsComponent manga={manga?.data} />
      <ReviewsList reviews={mangaReviews?.data}/>
        
    </div>
  )
}

export default ReviewManga