import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";
import AnimeDetailsComponent from "../../../components/AnimeDetailsComponent";
import { Recommendation } from "../../../interface";
import { v4 as uuidv4 } from "uuid";
import Poster from "../../../components/Poster";
import { Jelly } from "@uiball/loaders";
import RecommendationsList from "../../../components/RecommendationsList";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const RecommendationsPage = () => {
  const router = useRouter();
  const { animeId } = router.query;
  const { data, error } = useSWR(
    `https://api.jikan.moe/v4/anime/${animeId}`,
    fetcher
  );
  const { data: animeRecommendations } = useSWR(
    `https://api.jikan.moe/v4/anime/${animeId}/recommendations`,
    fetcher
  );

  const { data: anime } = data || {};
  const { data: recommendations }: { data: Recommendation[] } =
    animeRecommendations || {};

  console.log(recommendations);
  return (
    <div>
      <AnimeDetailsComponent anime={anime} />
      <RecommendationsList recommendations={recommendations} />
    </div>
  );
};

export default RecommendationsPage;
