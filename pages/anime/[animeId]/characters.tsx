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
import StaffList from "../../../components/StaffList";

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

  return (
    <div>
      <AnimeDetailsComponent anime={anime} />
      {characters && staff ? (
        <div className="px-4 pb-4">
          <CharactersList characters={characters} />
          <StaffList staff={staff} />
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default CharactersPage;
