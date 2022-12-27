import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import useSWR from "swr";
import fetcher from "../helper/fetcher";
import { addToWatchLater, deleteWatchLater } from "../helper/functions";
import { Anime, ISavedResp } from "../interface";


const useWatchLater = (anime: Anime) => {
  const { data: watchLater } = useSWR(`/api/watch-later`, fetcher);
  const router = useRouter();
  const addedToWatchLater = watchLater?.find(
    (watchLater: ISavedResp) => watchLater.malId === anime?.mal_id
  );
  const { status } = useSession();
  const [watchLaterClicked, setWatchLaterClicked] = useState<boolean>(false);

  const handleAddWatchLater = async () => {
    if (status === "authenticated") {
      setWatchLaterClicked(true);
      addToWatchLater(
        anime.title,
        anime.images.jpg.image_url,
        anime.mal_id,
        anime.type
      );
      router.push("/user/watchLater", undefined, { shallow: true });
    } else {
      signIn("google");
    }
  };

  const handleDeleteWatchLater = async () => {
    if (status === "authenticated") {
      setWatchLaterClicked(false);
      await deleteWatchLater(addedToWatchLater?.id);
    } else {
      signIn("google");
    }
  };

  return {
    watchLaterClicked,
    handleDeleteWatchLater,
    handleAddWatchLater,
    addedToWatchLater,
  };
};

export default useWatchLater;
