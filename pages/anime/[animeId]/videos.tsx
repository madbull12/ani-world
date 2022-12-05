import { useRouter } from "next/router";
import React from "react";
import ReactPlayer from "react-player/youtube";
import useSWR from "swr";
import { v4 } from "uuid";
import AnimeDetailsComponent from "../../../components/AnimeDetailsComponent";
import fetcher from "../../../helper/fetcher";
import { IMusicVideo, IPromo } from "../../../interface";

const VideoPage = () => {
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
      <div className="p-4 space-y-4">
        <div>
          <h1 className="text-2xl font-bold">Trailers</h1>
          <div className="grid grid-cols-4 gap-4">
            {videos?.promo.map((promo: IPromo) => (
              <ReactPlayer url={promo.trailer.url} width={300} height={200} />
            ))}
          </div>
        </div>

        <div>
          <h1 className="text-2xl font-bold">Music Videos</h1>
          <div className="grid grid-cols-4 gap-4">
            {videos?.music_videos.map((video:IMusicVideo) => (
              <ReactPlayer url={video?.video.url} key={v4()} width={300} height={200} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPage;
