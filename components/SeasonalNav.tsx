import React, { useState } from "react";
import useSWR from "swr";
import { IoEllipsisHorizontal } from "react-icons/io5";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import { Jelly } from "@uiball/loaders";
import { useRouter } from "next/router";
import fetcher from "../helper/fetcher";

interface ISeason {
  seasons: string[];
  year: number;
}

const SeasonalNav = () => {
  const { data } = useSWR("https://api.jikan.moe/v4/seasons", fetcher);

  const router = useRouter();
  const { year: yearId, season: seasonId } = router.query;
  const { data: items }: { data: ISeason[] } = data || {};

  const [index, setIndex] = useState<number>(0);

  return (
    <header>
      <h1 className="font-bold text-2xl ">Seasonal Anime</h1>
      {items ? (
        <nav className="p-2">
          <ul className="space-x-4 gap-2 flex flex-wrap  items-center text-blue-500">
            <IoEllipsisHorizontal
              onClick={() => setIndex((prev) => prev + 1)}
              className="cursor-pointer hover:bg-blue-500 hover:text-white duration-100 ease-in p-1 text-3xl "
            />
            {items[1]?.seasons?.map((season) => (
              <Link
                key={uuidv4()}
                
                href={`/anime/season/${items[index].year}/${season}`}
              >
                <span
                  className={`${
                    Number(yearId) === items[index].year && seasonId === season
                      ? "bg-blue-500 text-white"
                      : ""
                  }  capitalize whitespace-nowrap cursor-pointer hover:bg-blue-500 p-1 hover:text-white duration-100 ease-in`}
                >
                  {season} {items[index]?.year}
                </span>
              </Link>
            ))}

            <IoEllipsisHorizontal
              onClick={() => setIndex(index === 0 ? index : index - 1)}
              className="cursor-pointer hover:bg-blue-500 hover:text-white duration-100 ease-in p-1 text-3xl  "
            />
          </ul>
        </nav>
      ) : (
        <></>
      )}
    </header>
  );
};

export default SeasonalNav;
