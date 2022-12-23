import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { Anime } from "../interface";
import { v4 as uuidv4 } from "uuid";
import MotionBtn from "../components/MotionBtn";
import Image from "next/image";
import Link from "next/link";
import moment from "moment";
import useLocalStorage from "../hooks/useLocalStorage";
import fetcher from "../helper/fetcher";
import TopAnimeRow from "../components/TopAnimeRow";
import TopNav from "../components/TopNav";

const TopAnimePage = () => {
  const [page, setPage] = useLocalStorage("page", 1);
  const [filter,setFilter]=useState("")
  const { data: topAnime } = useSWR(
    `https://api.jikan.moe/v4/top/anime?page=${page}&filter=${filter}`,
    fetcher
  );

  const { data: anime }: { data: Anime[] } = topAnime || {};
  const { items, last_visible_page: pageCount } = topAnime?.pagination || {};
  // const [itemOffset, setItemOffset] = useState(0);

  console.log(topAnime);
  

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold p-2">Top Anime</h1>
      <TopNav setFilter={setFilter} filter={filter} />
      <div className="text-blue-500 font-bold justify-end my-4  flex gap-x-2">
        {page > 1 && (
          <button
            onClick={() => setPage(page - 1)}
            className="hover:text-blue-400"
          >
            Previous
          </button>
        )}

        <button
          onClick={() => setPage(page + 1)}
          className="hover:text-blue-400"
        >
          Next
        </button>
      </div>
      {/* <button onClick={()=>setPage((prev)=>prev+1)}>Next page</button> */}
      <table className="w-full mt-2 border ">
        <tbody>
          <tr className="bg-blue-500 text-white md:text-base sm:text-sm text-xs">
            <th>Rank</th>
            <th className="w-[70%]">Title</th>
            <th>Score</th>
            <th>Status</th>
          </tr>
          {anime?.map((item,i) => (
            <TopAnimeRow i={i} key={uuidv4()} item={item} />
          ))}
        </tbody>
      </table>
      <div className="text-blue-500 font-bold justify-center my-4  flex gap-x-2">
        {page > 1 && (
          <button
            onClick={() => setPage(page - 1)}
            className="hover:text-blue-400"
          >
            Previous
          </button>
        )}

        <button
          onClick={() => setPage(page + 1)}
          className="hover:text-blue-400"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TopAnimePage;
