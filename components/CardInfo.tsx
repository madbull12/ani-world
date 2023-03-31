import moment from "moment";
import Link from "next/link";
import React, { useState } from "react";
import { IoPeople, IoPlay, IoStar } from "react-icons/io5";
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";
import { AnimeDetailsProps, ISavedResp } from "../interface";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";
import truncate from "../helper/truncate";
import { useRouter } from "next/router";

import useWatchLater from "../hooks/useWatchLater";
import LineOverlay from "./LineOverlay";

interface IProps {
  anime: AnimeDetailsProps;
}
const CardInfo = ({ anime }: IProps) => {
  const [expand, setExpand] = useState<boolean>(false);
  const router = useRouter();
  const {
    handleAddWatchLater,
    watchLaterClicked,
    addedToWatchLater,
    handleDeleteWatchLater,
  } = useWatchLater(anime);

  return (
    <article className="border p-2">
      <p className="text-sm md:text-base h-[80px] grid place-items-center py-2 cursor-pointer text-primary hover:text- font-bold text-center ">
        <Link
          href={`${
            router.pathname.includes("/anime")
              ? `/anime/${anime.mal_id}`
              : `/manga/${anime.mal_id}`
          }/characters`}
        >
          {anime.title}
        </Link>
      </p>
        <LineOverlay />
      <div className=" px-4 py-3 flex items-center gap-x-3 sm:gap-x-4 md:gap-x-8 ">
        {router.pathname.includes("/manga") ? (
          <div className="flex justify-center w-full gap-x-2 text-[10px] font-semibold sm:text-xs items-center text-gray-400 ">
            <p>
              {anime.type}, {anime.published.prop.from.year}
            </p>
            <p>{anime.status}</p>
            <p>
              {anime.volumes ?? "?"} vols, {anime.chapters ?? "?"} chp
            </p>
          </div>
        ) : null}
        {router.pathname.includes("/anime") ? (
          <div className="w-6 text-white xs:text-sm text-xs h-6 rounded-full bg-primary grid place-items-center">
            <a
              rel="noopener noreferrer"
              href={anime.trailer.url}
              target="_blank"
            >
              <IoPlay className="cursor-pointer" />
            </a>
          </div>
        ) : null}
        {router.pathname.includes("/anime") ? (
          <div className="text-sm divide-x-2 text-gray-400 flex gap-x-2">
            <span>{moment(anime.aired.from).format("ll")}</span>
            <span className="pl-2">
              {anime.episodes ? anime.episodes : "?"} eps {anime.duration}
            </span>
          </div>
        ) : null}
      </div>
      <LineOverlay />
      <div className=" text-primary justify-center p-2 flex gap-x-2 text-xs">
        {anime.genres.slice(0, 3).map((genre) => (
          <p key={uuidv4()} className="cursor-pointer hover:text-primary-focus">
            {genre.name}
          </p>
        ))}
      </div>
      <div className="flex relative gap-x-2 h-[200px] w-full overflow-y-scroll overflow-x-hidden">
        <div className="w-1/2 h-full relative  ">
          <Image
            src={anime.images.jpg.image_url}
            layout="fill"
            objectFit="cover"
            alt={anime.title}
          />
        </div>

        <div className="w-1/2 ">
          <p className="text-xs md:text-sm text-ellipsis ">
            {expand ? anime.synopsis : truncate(anime.synopsis, 250)}
          </p>
          <div className="grid place-items-center text-2xl ">
            {!expand ? (
              <IoMdArrowDropdown
                className="cursor-pointer animate-bounce"
                onClick={() => setExpand(true)}
              />
            ) : (
              <IoMdArrowDropup
                className="cursor-pointer animate-bounce"
                onClick={() => setExpand(false)}
              />
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center [&>*]:flex [&>*]:items-center [&>*]:gap-x-2 text-xs xs:text-sm text-primary mt-2">
        <div>
          <IoStar />
          {anime.score}
        </div>
        <div>
          <IoPeople />
          {anime.members}
        </div>
        <button
          onClick={() => {
            addedToWatchLater
              ? handleDeleteWatchLater()
              : handleAddWatchLater();
          }}
          className="bg-primary text-white font-bold px-4 py-2 rounded-lg hover:bg-primary-focus"
        >
          {addedToWatchLater || watchLaterClicked
            ? "Remove from list"
            : "Add to list"}
        </button>
      </div>
    </article>
  );
};

export default CardInfo;
