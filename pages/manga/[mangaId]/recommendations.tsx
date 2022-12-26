import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";
import MangaDetailsComponent from "../../../components/MangaDetailsComponent";
import RecommendationsList from "../../../components/RecommendationsList";
import fetcher from "../../../helper/fetcher";

const MangaRecommendations = () => {
  const { mangaId } = useRouter().query;
  const { data: manga, error } = useSWR(
    `https://api.jikan.moe/v4/manga/${mangaId}`,
    fetcher
  );
  const { data: mangaRecommendations } = useSWR(
    `https://api.jikan.moe/v4/manga/${mangaId}/recommendations`,
    fetcher
  );
  return (
    <div>
      <MangaDetailsComponent manga={manga?.data} />
      <RecommendationsList recommendations={mangaRecommendations?.data} />
    </div>
  );
};

export default MangaRecommendations;
