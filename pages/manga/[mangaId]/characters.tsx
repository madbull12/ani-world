import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";
import CharactersList from "../../../components/CharactersList";
import Loader from "../../../components/Loader";
import MangaDetailsComponent from "../../../components/MangaDetailsComponent";
import fetcher from "../../../helper/fetcher";
import { Character, Manga } from "../../../interface";

const MangaCharacter = () => {
  const { mangaId } = useRouter().query;
  const { data: manga, error } = useSWR(
    `https://api.jikan.moe/v4/manga/${mangaId}`,
    fetcher
  );
  const { data: mangaCharacters } = useSWR(
    `https://api.jikan.moe/v4/manga/${mangaId}/characters`,
    fetcher
  );

  console.log(mangaCharacters);
  return (
    <div>
      <MangaDetailsComponent manga={manga?.data} />
      {mangaCharacters ? (
        <div className="px-4 pb-4">
          <CharactersList characters={mangaCharacters?.data as Character[]} />
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default MangaCharacter;
