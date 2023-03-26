import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import useSWR from "swr";
import { v4 } from "uuid";
import fetcher from "../helper/fetcher";
import { addToFavourite, deleteFavourite } from "../helper/functions";
import useFavourites from "../hooks/useFavourites";
import { Anime, ISavedResp } from "../interface";

const SidebarAnime = ({ anime,i }: { anime: Anime,i:number }) => {
  const router = useRouter();
  const { status } = useSession()

  const {
    handleDeleteFavourite,
    handleAddFavourite,
    addedToFavourites,
    favorited,
  } = useFavourites(anime);

  return (
    <Link key={v4()} href={`/anime/${anime.mal_id}/videos`}>
      <div className="flex gap-x-2  cursor-pointer mb-4 ">
        <span className="font-bold text-2xl text-gray-500">{i + 1}</span>
        <Image
          src={anime.images.jpg.image_url}
          width={80}
          height={90}
          alt={anime.title}
        />
        <div>
          <div>
            <h1 className={`font-bold text-white`}>{anime.title}</h1>
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
          className={`self-start justify-self-end ml-auto  font-semibold text-primary`}
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault()
            addedToFavourites ? handleDeleteFavourite() : handleAddFavourite()
          }}
        >
          {status==="authenticated" ? (
            <>
          {(addedToFavourites || favorited) ? "added" : "add"}

            </>
          ):"add"}
        </button>
      </div>
    </Link>
  );
};

export default SidebarAnime;
