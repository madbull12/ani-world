

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import useSWR from "swr";
import fetcher from "../helper/fetcher";
import { addToFavourite, addToWatchLater, deleteWatchLater } from "../helper/functions";
import { Anime, ISavedResp } from "../interface";

const useFavourites = (anime:Anime) => {
    const { data: watchLater } = useSWR(`/api/watch-later`, fetcher);
    const router = useRouter();
    const addedToWatchLater = watchLater?.find(
      (watchLater: ISavedResp) => watchLater.malId === anime.mal_id
    );
    const { status } = useSession();
    const [favorited, setFavorited] = useState(false);

const { data: favourites } = useSWR(`/api/favorite`, fetcher);

const addedToFavourites = favourites?.find(
  (favourite: ISavedResp) => favourite.malId === anime.mal_id
);

const handleAddFavourite = async () => {
    if(status==="authenticated") {
        await addToFavourite(anime.title, anime.images.jpg.image_url, anime.mal_id);
        router.push("/user/favourites", undefined, { shallow: true });
    } else {
        signIn("google")
    }

};
  
const handleDeleteFavourite = async () => {
    if(status==="authenticated") {
        setFavorited(false);
        await deleteWatchLater(addedToWatchLater?.id);
    } else {
        signIn("google")

    }

};
  


    return {favorited,handleAddFavourite,handleDeleteFavourite,addedToFavourites}
}

export default useFavourites