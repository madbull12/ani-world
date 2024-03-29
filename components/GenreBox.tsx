import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { IGenre } from "../interface";

const GenreBox = ({ genre }: { genre: IGenre }) => {
  const router = useRouter();
  return (
    <Link
      href={`${
        router.pathname.includes("/anime")
          ? `/genres/anime/${genre.mal_id}`
          : `/genres/manga/${genre.mal_id}`
      }`}
    >
      <div className="border-primary flex flex-col cursor-pointer text-primary hover:btnOverlay border p-4 rounded-xl">
        <p>{genre.name}</p>
        <p>{genre.count}</p>
      </div>
    </Link>
  );
};

export default GenreBox;
