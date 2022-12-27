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

const animeTypes = ["tv", "movie", "ova", "special", "ona", "music"];

const bookTypes = [
  "manga",
  "novel",
  "lightnovel",
  "oneshot",
  "doujin",
  "manhwa",
  "manhua",
];

const useFavourites = (anime: Anime) => {
  const router = useRouter();

  const { status } = useSession();
  const [favorited, setFavorited] = useState(false);

  const { data: favourites } = useSWR(`/api/favorite`, fetcher);

  const addedToFavourites = favourites?.find(
    (favourite: ISavedResp) => favourite.malId === anime.mal_id
  );

  const handleAddFavourite = async () => {
    if (status === "authenticated") {
      console.log(animeTypes.includes(anime?.type));

      await addToFavourite(
        anime.title,
        anime.images.jpg.image_url,
        anime.mal_id,
        anime.type
      );
      router.push("/user/favourites", undefined, { shallow: true });
    } else {
      signIn("google");
    }
  };

  const handleDeleteFavourite = async () => {
    if (status === "authenticated") {
      setFavorited(false);
      await deleteFavourite(addedToFavourites?.id);
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
