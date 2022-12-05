import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { v4 } from "uuid";
import { addToFavourite } from "../helper/functions";
import { Anime } from "../interface";

const SidebarAnime = ({ anime,i }: { anime: Anime,i:number }) => {
  const router = useRouter();
  const { data:sessionm,status } = useSession()
  const handleAddFavourite = async () => {
    await addToFavourite(anime.title, anime.images.jpg.image_url, anime.mal_id);
    router.push("/user", undefined, { shallow: true });
  };
  return (
    <Link key={v4()} href={`/anime/${anime.mal_id}`}>
      <div className="flex gap-x-2 cursor-pointer ">
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
              ? handleAddFavourite()
              : signIn("google");
          }}
        >
          add
        </button>
      </div>
    </Link>
  );
};

export default SidebarAnime;
