import { Jelly } from "@uiball/loaders";
import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";
import Poster from "../components/Poster";
import { Anime } from "../interface";
import { v4 as uuidv4, v4 } from "uuid";
import Image from "next/image";
import Link from "next/link";
import ReactPaginate from "react-paginate";
import Container from "../components/Container";
import SearchComponent from "../components/SearchComponent";
import Loader from "../components/Loader";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const SearchPage = () => {
  const router = useRouter();
  const { q: term, cat } = router.query;
  const { data: animeItem } = useSWR(
    `https://api.jikan.moe/v4/${cat}?q=${term}`,
    fetcher
  );
  const { data: anime }: { data: Anime[] } = animeItem || {};

  return (
    <Container>
      <h1 className="text-2xl text-center my-2 font-bold">Search results</h1>
      {anime ? (
        <div className="mt-4 space-y-2 ">
          {anime.length === 0 ? (
            <h1 className="text-xl font-semibold">No anime found</h1>
          ) : (
            <>
              {anime.map((item) => (
                <SearchComponent key={v4()} anime={item} />
              ))}
            </>
          )}
        </div>
      ) : (
        <div className="h-full w-full grid place-items-center">
          <Loader />
        </div>
      )}
    </Container>
  );
};

export default SearchPage;
