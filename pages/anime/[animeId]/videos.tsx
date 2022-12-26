import { useRouter } from "next/router";
import React from "react";
import ReactPlayer from "react-player/youtube";
import useSWR from "swr";
import { v4 } from "uuid";
import AnimeDetailsComponent from "../../../components/AnimeDetailsComponent";
import fetcher from "../../../helper/fetcher";
import useMediaQuery from "../../../hooks/useMediaQuery";
import { IMusicVideo, IPromo } from "../../../interface";

const VideoPage = () => {
  const router = useRouter();
  const { animeId } = router.query;
  const phone = useMediaQuery("(min-width: 400px)");
  const small = useMediaQuery("(min-width: 640px)");
  const tablet = useMediaQuery("(min-width: 768px)");
  const desktop = useMediaQuery("(min-width: 1024px)");
  const widthMediaQuery = () => {
    if (phone) {
      return 220;
    } else if (small) {
      return 250;
    } else if (tablet) {
      return 280;
    } else {
      return 300;
    }
  };
  const heightMediaQuery = () => {
    if (phone) {
      return 100;
    } else if (small) {
      return 150;
    } else if (tablet) {
      return 180;
    } else if (desktop) {
      return 200;
    }
  };

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
          <div className="grid lg:grid-cols-4 xl:grid-cols-5 grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-4">
            {videos?.promo.map((promo: IPromo) => (
              <div className="w-56 h-44 "  key={v4()}>
                <iframe src={promo.trailer.embed_url} className="w-full h-full"></iframe>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h1 className="text-2xl font-bold">Music Videos</h1>
          <div className="grid-cols-1 grid xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {videos?.music_videos.map((video: IMusicVideo) => (
              <ReactPlayer url={video?.video.url} key={v4()} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPage;
