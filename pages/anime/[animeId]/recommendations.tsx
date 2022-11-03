import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";
import AnimeDetailsComponent from "../../../components/AnimeDetailsComponent";
import { Recommendation } from "../../../interface";
import { v4 as uuidv4 } from "uuid";
import Poster from "../../../components/Poster";
import { Jelly } from "@uiball/loaders";

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
      {recommendations ? (
        <div className="px-4">
          {recommendations.length === 0 ? (
            <h1 className="text-lg font-semibold">No recommendations</h1>
          ) : (
            <>
              <h1 className="text-2xl font-bold ">Recommendations</h1>
              <div className="grid  gap-4 min-w-0 overflow-x-scroll  auto-cols-max grid-flow-col scrollbar-hide md:scrollbar-default  overflow-y-hidden">
                {recommendations?.slice(0, 10).map((recommendation) => (
                  <div className="flex flex-col" key={uuidv4()}>
                    <div>
                      <Poster anime={recommendation.entry} />
                    </div>

                    <p className="text-lg font-bold">
                      Users:{" "}
                      <span className="font-normal">
                        {recommendation.votes}
                      </span>
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="h-full w-full grid place-items-center">
          <Jelly color="#007CEF" />
        </div>
      )}
    </div>
  );
};

export default RecommendationsPage;
