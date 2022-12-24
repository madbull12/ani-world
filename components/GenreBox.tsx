import Link from "next/link";
import React from "react";
import { IGenre } from "../interface";

const GenreBox = ({ genre }: { genre: IGenre }) => {
  return (
    <Link href={`/genres/anime/${genre.mal_id}`}>
      <div className="border-blue-500 flex flex-col cursor-pointer text-blue-500 hover:bg-blue-100 border p-4 rounded-xl">
        <p>{genre.name}</p>
        <p>{genre.count}</p>
      </div>
    </Link>
  );
};

export default GenreBox;
