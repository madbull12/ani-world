import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import useSWR from "swr";
import AnimeDetailsComponent from "../../../components/AnimeDetailsComponent";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import truncate from "../../../helper/truncate";
import { Jelly } from "@uiball/loaders";
import fetcher from "../../../helper/fetcher";
import { Review } from "../../../interface";
import { BiConfused } from 'react-icons/bi'
import Loader from "../../../components/Loader";
import ReviewsList from "../../../components/ReviewsList";



const ReviewPage = () => {
  const router = useRouter();
  const { animeId } = router.query;
  const { data, error } = useSWR(
    `https://api.jikan.moe/v4/anime/${animeId}`,
    fetcher
  );
  const { data: animeReviews } = useSWR(
    `https://api.jikan.moe/v4/anime/${animeId}/reviews`,
    fetcher
  );

  const { data: reviews }: { data: Review[] } = animeReviews || {};
  const { data: anime } = data || {};
  console.log(reviews);

  return (
    <div>
      <AnimeDetailsComponent anime={anime} />
      <ReviewsList reviews={reviews}/>
    </div>
  );
};

export default ReviewPage;
