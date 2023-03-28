import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";
import { v4 as uuidv4 } from "uuid";
import AnimeDetailsComponent from "../../../components/AnimeDetailsComponent";
import Container from "../../../components/Container";
import fetcher from "../../../helper/fetcher";

const EpisodePage = () => {
  const router = useRouter();
  const { animeId } = router.query;
  const { data, error } = useSWR(
    `https://api.jikan.moe/v4/anime/${animeId}`,
    fetcher
  );
  const { data: animeVideos } = useSWR(
    `https://api.jikan.moe/v4/anime/${animeId}/videos`,
    fetcher
  );

  const { data: videos } = animeVideos || {};
  const { data: anime } = data || {};

  return (
    <div>
      <AnimeDetailsComponent anime={anime} />
      <Container>
        {videos ? (
          <>
            {videos?.episodes.length === 0 ? (
              <h1 className="text-lg font-semibold ">No episodes added</h1>
            ) : (
              <>
                <h1 className="text-2xl font-bold mb-4">Episode Lists</h1>
                <div className=" gap-4 grid grid-cols-1 md:grid-cols-2">
                  {videos?.episodes?.map((_episode: any) => (
                    <div
                      key={uuidv4()}
                      className="flex  items-start border-b-2  border-primary rounded-sm p-2 gap-x-2"
                    >
                      <Image
                        src={
                          _episode.images.jpg.image_url ||
                          "https://images.wondershare.com/repairit/aticle/2021/07/resolve-images-not-showing-problem-1.jpg"
                        }
                        width={100}
                        height={100}
                        alt={_episode.title}
                        className="rounded-lg"
                      />
                      <div>
                        <h1 className="font-bold text-base sm:text-lg">
                          {_episode.episode}
                        </h1>
                        <p className="text-xs sm:text-sm">{_episode.title}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <p>Theres an error</p>
        )}
      </Container>
    </div>
  );
};

export default EpisodePage;
