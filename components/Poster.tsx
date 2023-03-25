import Image from "next/legacy/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Anime, Recommendation } from "../interface";
import { useTheme } from "../lib/zustand";

interface IProps {
  anime: Anime;
}

const Poster = ({ anime }: IProps) => {
  const [showTitle, setShowTitle] = useState<boolean>(false);
  const { theme } = useTheme();
  const router = useRouter();
  return (
    <Link
      href={`${
        router.pathname.includes("/manga")
          ? `/manga/${anime.mal_id}/characters`
          : `/anime/${anime.mal_id}/videos`
      }`}
    >
      <article
        className="cursor-pointer relative group w-[120px] h-[150px] "
        onMouseEnter={() => setShowTitle(true)}
        onMouseLeave={() => setShowTitle(false)}
      >
        <Image
          alt={anime.title}
          src={anime.images.jpg.image_url}
          layout="fill"
          objectFit="cover"
          className=" ease-in-out duration-150 rounded-tl-[30px] rounded-br-[30px] transition-all group-hover:scale-105 "
        />

        <div className={`${showTitle ? "block" : "hidden"} absolute bottom-0 text-xs`}>
          <h1 className=" text-white  truncate font-bold">{anime.title}</h1>
        </div>
      </article>
    </Link>
  );
};

export default Poster;
