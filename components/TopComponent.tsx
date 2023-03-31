import React, { useState } from "react";
import { v4 } from "uuid";
import useLocalStorage from "../hooks/useLocalStorage";
import { Anime } from "../interface";
import TopAnimeRow from "./TopAnimeRow";
import TopNav from "./TopNav";

interface IProps {
    isManga:boolean;
    item:Anime[];
    setFilter:(value:string)=>void;
    filter:string;
    page:number;
    setPage:(value:number)=>void
}
const TopComponent = ({ isManga,item,setFilter,filter,page,setPage }:IProps) => {


  return (
    <>
      <h1 className="text-2xl font-bold ">Top {isManga ? "Manga" : "Anime"}</h1>

      <TopNav filter={filter} setFilter={setFilter} />
      <div className="text-primary  font-bold justify-end my-4 pr-2 flex gap-x-2">
        {page > 1 && (
          <button
            onClick={() => setPage(page - 1)}
            className="hover:text-primary-focus"
          >
            Previous
          </button>
        )}

        <button
          onClick={() => setPage(page + 1)}
          className="hover:text-primary-focus"
        >
          Next
        </button>
      </div>
      {/* <button onClick={()=>setPage((prev)=>prev+1)}>Next page</button> */}
      <table className="w-full mt-2 border ">
        <tbody>
          <tr className="bg-primary text-white md:text-base sm:text-sm text-xs">
            <th>Rank</th>
            <th className="w-[70%]">Title</th>
            <th>Score</th>
            <th>Status</th>
          </tr>
          {item?.map((_item,i) => (
            <TopAnimeRow page={page} i={i}  key={v4()} item={_item} />
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
    </>
  );
};

export default TopComponent;
