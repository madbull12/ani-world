import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import useSWR from "swr";
import { v4 } from "uuid";
import fetcher from "../helper/fetcher";
import { addToFavourite, deleteFavourite } from "../helper/functions";
import { Anime, ISavedResp } from "../interface";

const SidebarAnime = ({ anime,i }: { anime: Anime,i:number }) => {
  const router = useRouter();
  const { data:session,status } = useSession();
  const [favourited,setFavourited] = useState(false);
  const { data: favourites } = useSWR(`/api/favorite`, fetcher);

  const addedToFavourites = favourites?.find(
    (favourite: ISavedResp) => favourite.malId === anime.mal_id
  );
  const handleAddFavourite = async () => {
    setFavourited((prev) => !prev)

    await addToFavourite(anime.title, anime.images.jpg.image_url, anime.mal_id);
    router.push("/user/favourites", undefined, { shallow: true });
  };

  const handleDeleteFavourite = async () => {
    setFavourited((prev) => !prev)

    await deleteFavourite(addedToFavourites?.id)
  }

  return (
    <Link key={v4()} href={`/anime/${anime.mal_id}`}>
      <div className="flex gap-x-2 cursor-pointer mb-4 ">
        <span className="font-bold text-2xl text-gray-500">{i + 1}</span>
        <Image
          src={anime.images.jpg.image_url}
          width={80}
          height={90}
          alt={anime.title}
        />
        <div>
          <div>
            <h1 className={`font-bold text-blue-500`}>{anime.title}</h1>
            <p className="text-gray-500 text-sm">
              {anime.type}, {anime.episodes === null ? 0 : anime.episodes} eps,
              scored {anime.score === null ? "N/A" : anime.score}
            </p>
            <p className="text-gray-500 text-sm">
              Members: {anime.members.toLocaleString()}
            </p>
          </div>
        </div>
        <button
          className={`self-start justify-self-end ml-auto  font-semibold text-blue-500`}
          onClick={(e) => {
            e.stopPropagation();
            status === "authenticated"
              ? addedToFavourites ? handleDeleteFavourite() : handleAddFavourite()
              : signIn("google");
          }}
        >
          {(addedToFavourites || favourited) ? "added" : "add"}
        </button>
      </div>
    </Link>
  );
};

export default SidebarAnime;
