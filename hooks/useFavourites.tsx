import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import useSWR from "swr";
import fetcher from "../helper/fetcher";
import {
  addToFavourite,
  addToWatchLater,
  deleteFavourite,
  deleteWatchLater,
} from "../helper/functions";
import { Anime, ISavedResp } from "../interface";
import { animeTypes } from "../pages/api/anime";
import { api } from "../utils/api";


const useFavourites = (anime: Anime) => {
  const router = useRouter();
  const utils = api.useContext()

  const { status } = useSession();
  const [favorited, setFavorited] = useState(false);

  const { data: favourites } = api.favorite.getFavorites.useQuery();
  const { mutateAsync:addFavorite } = api.favorite.addFavorite.useMutation({
    onSettled: async () => {
      await utils.favorite.getFavorites.invalidate();
    },
  })
  const { mutateAsync:deleteFavorite } = api.favorite.deleteFavourite.useMutation({
    onSettled: async () => {
      await utils.favorite.getFavorites.invalidate();
    },
  })

  console.log(favourites)
  const addedToFavourites = favourites?.find(
    (favourite: ISavedResp) => favourite.malId === anime?.mal_id
  );

  const handleAddFavourite = async () => {
    if (status === "authenticated") {
      setFavorited(true) 
      await addFavorite({ title:anime.title,malId:anime.mal_id,imageUrl:anime.images.jpg.large_image_url,type:anime.type});
      router.push("/user/favourites", undefined, { shallow: true });
    } else {
      signIn("google");
    }
  };

  const handleDeleteFavourite = async () => {
    if (status === "authenticated") {
      setFavorited(false);
      await deleteFavorite({ malId:addedToFavourites?.malId as number });
    } else {
      signIn("google");
    }
  };

  return {
    favorited,
    handleAddFavourite,
    handleDeleteFavourite,
    addedToFavourites,
  };
};

export default useFavourites;
