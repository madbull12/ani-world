import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";
import Loader from "../../../components/Loader";
import MangaDetailsComponent from "../../../components/MangaDetailsComponent";
import StatsComponent from "../../../components/StatsComponent";
import fetcher from "../../../helper/fetcher";

const MangaStats = () => {
  const { mangaId } = useRouter().query;
  const { data: manga, error } = useSWR(
    `https://api.jikan.moe/v4/manga/${mangaId}`,
    fetcher
  );
  const { data: mangaStats } = useSWR(
    `https://api.jikan.moe/v4/manga/${mangaId}/statistics`,
    fetcher
  );

  return (
    <div>
      <MangaDetailsComponent manga={manga?.data} />
      {mangaStats ? (
        <div className="px-4 pb-4">
          {/* <CharactersList characters={mangaCharacters?.data as Character[]} /> */}
          <StatsComponent  stats={mangaStats?.data} />
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default MangaStats;
