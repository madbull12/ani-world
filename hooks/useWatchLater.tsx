import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";

import { Anime, ISavedResp } from "../interface";
import { api } from "../utils/api";
import { toast } from "react-hot-toast";


const useWatchLater = (anime: Anime) => {
  // const { data: watchLater } = useSWR(`/api/watch-later`, fetcher);
  const { data: watchLater } = api.watchLater.getWatchLater.useQuery();
  const utils = api.useContext();
  const router = useRouter();
  const addedToWatchLater = watchLater?.find(
    (watchLater: ISavedResp) => watchLater.malId === anime?.mal_id
  );
  const { status } = useSession();
  const [watchLaterClicked, setWatchLaterClicked] = useState<boolean>(false);

  const { mutateAsync:addWatchLater } = api.watchLater.addWatchLater.useMutation({
    onSettled: async () => {
      await utils.watchLater.getWatchLater.invalidate();
    },
  })
  const { mutateAsync:deleteWatchLater } = api.watchLater.deleteWatchLater.useMutation({
    onSettled: async () => {
      await utils.watchLater.getWatchLater.invalidate();
    },
  })

  const handleAddWatchLater = async () => {
    if (status === "authenticated") {
      setWatchLaterClicked(true);
      await toast.promise(addWatchLater({ title:anime.title,malId:anime.mal_id,imageUrl:anime.images.jpg.large_image_url,type:anime.type}),{
        loading:"Adding to watch later",
        success:"Added to watch later",
        error:(err)=>"Ooops somethin went wrong..." + err
      })
      // await addWatchLater({ title:anime.title,malId:anime.mal_id,imageUrl:anime.images.jpg.large_image_url,type:anime.type});
      router.push("/user/watchLater", undefined, { shallow: true });
    } else {
      signIn("google");
    }
  };

  const handleDeleteWatchLater = async () => {
    if (status === "authenticated") {
      setWatchLaterClicked(false);
      await toast.promise( deleteWatchLater({ malId:addedToWatchLater?.malId as number }),{
        loading:"Deleting from watch later",
        success:"Deleted from watch later",
        error:(err)=>"Ooops somethin went wrong..." + err
      })
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
