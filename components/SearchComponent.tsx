import React from "react";
import useFavourites from "../hooks/useFavourites";
import { v4 } from "uuid";
import Image from "next/legacy/image";
import { Anime } from "../interface";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import LineOverlay from "./LineOverlay";
const SearchComponent = ({ anime }: { anime: Anime }) => {
  const router = useRouter();
  const {
    handleDeleteFavourite,
    handleAddFavourite,
    addedToFavourites,
    favorited,
  } = useFavourites(anime);
  const { q: term, cat } = router.query;
  const { status } = useSession();

  return (
    <>
    <div key={v4()} className="flex gap-x-2 py-2 ">
      <Image
        objectFit="cover"
        alt={anime.title}
        width={60}
        height={80}
        src={anime.images.jpg.image_url}
      />
      <div>
        <span className="mb-3  items-center gap-x-2 font-bold text-sm md:text-base flex">
          <Link href={`/${cat}/${anime.mal_id}/characters`}>{anime.title}</Link>
          <button
            className="font-normal text-sm text-primary cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              addedToFavourites
                ? handleDeleteFavourite()
                : handleAddFavourite();
            }}
          >
            {status === "authenticated" ? (
              <>{addedToFavourites || favorited ? "added" : "add"}</>
            ) : (
              "add"
            )}
          </button>
        </span>

        <p className="text-gray-500 text-xs md:text-sm">
          <span className=" font-bold">{anime.type}</span> ({anime.episodes}{" "}
          eps)
        </p>
        <p className="text-gray-500 text-xs font-semibold">
          Scored {anime.score}
        </p>
        <p className="text-gray-500 text-xs font-semibold">
          {anime.members.toLocaleString()} members
        </p>
      </div>
    </div>
    <LineOverlay />
    </>
    
  );
};

export default SearchComponent;
