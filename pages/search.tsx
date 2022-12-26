import { Jelly } from "@uiball/loaders";
import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";
import Poster from "../components/Poster";
import { Anime } from "../interface";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";
import Link from "next/link";
import ReactPaginate from "react-paginate";
import Container from "../components/Container";

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
                <div key={uuidv4()} className="flex gap-x-2 py-2 bg-blue-50">
                  <Image
                    objectFit="cover"
                    alt={item.title}
                    width={60}
                    height={80}
                    src={item.images.jpg.image_url}
                  />
                  <div>
                    <span className="mb-3 text-blue-600 items-center gap-x-2 font-bold text-sm md:text-base flex">
                      <Link href={`/${cat}/${item.mal_id}`}>{item.title}</Link>
                      <span className="font-normal text-sm cursor-pointer">
                        add
                      </span>
                    </span>

                    <p className="text-gray-500 text-xs md:text-sm">
                      <span className="text-blue-500">{item.type}</span> (
                      {item.episodes} eps)
                    </p>
                    <p className="text-gray-500 text-xs font-semibold">
                      Scored {item.score}
                    </p>
                    <p className="text-gray-500 text-xs font-semibold">
                      {item.members.toLocaleString()} members
                    </p>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      ) : (
        <div className="h-full w-full grid place-items-center">
          <Jelly color="#007CEF" />
        </div>
      )}
    </Container>
  );
};

export default SearchPage;
