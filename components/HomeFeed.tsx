import { useState } from "react";
import { Anime } from "../interface"
import Poster from "./Poster"
import Row from "./Row";
import Sidebar from "./Sidebar";


interface IProps {
  seasonsNow:Anime[];
  seasonYear:Anime[]
}
const HomeFeed = ({ seasonsNow,seasonYear }:IProps) => {
  console.log(seasonYear);

  return (
    <section className="max-w-7xl mx-auto p-4 space-y-4 relative ">

        <div className="max-w-5xl border-r px-3">
          <Row items={seasonsNow} title="Current Season" />
          <Row items={seasonYear} title={`${seasonYear[0].season} ${seasonYear[0].year}`} />
        </div>
        <Sidebar />


 
    </section>
  )
}

export default HomeFeed