import React, { useState } from "react";
import useSWR from "swr";
import { v4 } from "uuid";
import Container from "../../../components/Container";
import GenreBox from "../../../components/GenreBox";
import fetcher from "../../../helper/fetcher";
import { IGenre } from "../../../interface";

const AnimeGenrePage = () => {
  const { data: animeGenres } = useSWR(
    `https://api.jikan.moe/v4/genres/anime`,
    fetcher
  );

  const { data: genres }: { data: IGenre[] } = animeGenres || {};
  const [filter, setFilter] = useState<string>("");

  console.log(genres);
  return (
    <Container>
      <h1 className="text-xl  font-bold py-4">Anime Genres</h1>
      <input type="text" placeholder="Search genre" className="my-4 px-2 py-1  border rounded-lg outline-none ring ring-secondary  focus:ring-primary "  onChange={(e) => setFilter(e.target.value)} />
      <div className="grid-cols-1 grid gap-2 min-[300px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 md:grid-cols-4">
        {genres?.filter((genre)=>genre.name.toLowerCase().includes(filter.toLowerCase())).map((genre) => (
          <GenreBox genre={genre} key={v4()} />
        ))}
      </div>
    </Container>
  );
};

export default AnimeGenrePage;
