import { Jelly } from "@uiball/loaders";
import { useRouter } from "next/router";
import React, { useState } from "react";
import useSWR from "swr";
import AnimeDetailsComponent from "../../../components/AnimeDetailsComponent";
import { Character, Staff } from "../../../interface";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";
import { motion } from "framer-motion";
import MotionBtn from "../../../components/MotionBtn";
import { useTheme } from "../../../lib/zustand";
import Loader from "../../../components/Loader";
import fetcher from "../../../helper/fetcher";
import CharacterComponent from "../../../components/CharacterComponent";
import CharactersList from "../../../components/CharactersList";

const CharactersPage = () => {
  const router = useRouter();
  const { animeId } = router.query;
  const { data, error } = useSWR(
    `https://api.jikan.moe/v4/anime/${animeId}`,
    fetcher
  );
  const { data: animeCharacters } = useSWR(
    `https://api.jikan.moe/v4/anime/${animeId}/characters`,
    fetcher
  );
  const { data: animeStaff } = useSWR(
    `https://api.jikan.moe/v4/anime/${animeId}/staff`,
    fetcher
  );

  const { data: anime } = data || {};
  const { data: characters }: { data: Character[] } = animeCharacters || {};
  const { data: staff }: { data: Staff[] } = animeStaff || {};

  const [loadMoreCharacters, setLoadMoreCharacters] = useState(10);
  const [loadMoreStaff, setLoadMoreStaff] = useState(10);

  const { theme } = useTheme();

  return (
    <div>
      <AnimeDetailsComponent anime={anime} />
      {characters && staff ? (
        <div className="px-4 pb-4">
          <h1 className="text-2xl font-bold pb-2">Characters</h1>
          <CharactersList characters={characters} />
          <h1 className="text-2xl font-bold pb-2">Staff</h1>
          <div
            className={`divide-y  bg-blue-100 p-2 space-y-4 divide-gray-300 `}
          >
            {staff?.slice(0, loadMoreStaff).map((item) => (
              <div key={uuidv4()} className="flex gap-x-2 py-2">
                <Image
                  src={item.person.images.jpg.image_url}
                  alt={item.person.name}
                  width={60}
                  height={70}
                  objectFit="cover"
                  className="rounded-lg"
                />
                <div className="space-y-3">
                  <p className={`font-semibold text-blue-500`}>
                    {item.person.name}
                  </p>
                  {item.positions.map((position, i: any) => (
                    <span key={uuidv4()} className="font-normal">{`${
                      i ? "," : ""
                    } ${position}`}</span>
                  ))}
                </div>
              </div>
            ))}
            <div className="flex justify-center">
              <MotionBtn
                handleClick={() =>
                  staff?.length >= loadMoreStaff
                    ? setLoadMoreStaff((prev) => (prev += 5))
                    : setLoadMoreStaff(10)
                }
                string={
                  staff?.length >= loadMoreStaff ? "Load more" : "Show less"
                }
              />
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default CharactersPage;
