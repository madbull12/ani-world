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
import { toast } from "react-hot-toast";


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
      await toast.promise(addFavorite({ title:anime.title,malId:anime.mal_id,imageUrl:anime.images.jpg.large_image_url,type:anime.type}),{
        loading:"Adding to favorites",
        success:"Added to favorites",
        error:(err)=>"Ooops somethin went wrong..." + err
      })
      router.push("/user/favourites", undefined, { shallow: true });
    } else {
      signIn("google");
    }
  };

  const handleDeleteFavourite = async () => {
    if (status === "authenticated") {
      setFavorited(false);
      await toast.promise(deleteFavorite({ malId:addedToFavourites?.malId as number }),{
        loading:"Deleting from favorites",
        success:"Deleted from favorites",
        error:(err)=>"Ooops somethin went wrong..." + err
      })
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
