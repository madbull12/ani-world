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
        className="cursor-pointer relative  group w-[120px] h-[150px] "
        onMouseEnter={() => setShowTitle(true)}
        onMouseLeave={() => setShowTitle(false)}
      >
        <Image
          alt={anime.title}
          src={anime.images.jpg.image_url}
          layout="fill"
          objectFit="cover"
          className=" ease-in-out duration-150  rounded-tl-[30px] rounded-br-[30px] transition-all group-hover:scale-105 "
        />

        <div className={`z-50  text-xs  `}>
          <h1 className=" text-white w-24  group-hover:opacity-100 bg-[#00000056] ease-linear text-xs delay-150 transition-all opacity-0 absolute top-2  left-4 truncate font-bold">
            {anime.title}
          </h1>
          <button className="border  group-hover:opacity-100 opacity-0 delay-300 px-2 py-1 absolute bottom-2 left-2 border-primary btnOverlay text-primary z-50  rounded-sm">
            add
          </button>
        </div>

        <div className="absolute w-full h-full bottom-0 right-0 left-0 bg-gradient-to-t  from-[#100014] "></div>
      </article>
    </Link>
  );
};

export default Poster;
