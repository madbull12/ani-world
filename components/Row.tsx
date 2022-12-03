import { useState } from "react";
import { Anime, IRow } from "../interface";
import { useTheme } from "../lib/zustand";
import Poster from "./Poster";

const Row = ({ items, title }: IRow) => {
  //view all state to view all of the anime
  const [viewAll, setViewAll] = useState<boolean>(false);
  const { theme } = useTheme();

  return (
    <section className="space-y-4 ">
      <div className="flex justify-between items-center gap-x-2">
        <h1 className="font-black text-xl text-gray-700 whitespace-nowrap capitalize">
          {title}
        </h1>
        <div className="h-[2px] w-full bg-gray-200"></div>
        <button
          className={`whitespace-nowrap font-black text-sm  text-${theme}-500 uppercase`}
          onClick={() => setViewAll(!viewAll)}
        >
          {viewAll ? "View Less" : "View All"}
        </button>
      </div>
      <div className={`grid  gap-4 min-w-0 pb-4 scrollbar-thumb-rounded-full  scrollbar scrollbar-track-transparent scrollbar-thumb-blue-500 overflow-x-scroll  auto-cols-max grid-flow-col  overflow-y-hidden `}>
        {items?.slice(0, viewAll ? items.length : 8).map((anime) => (
          <div key={anime.mal_id} className="rounded-lg overflow-hidden">
            <Poster anime={anime} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Row;
