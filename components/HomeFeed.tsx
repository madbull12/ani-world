import { useState } from "react";
import { Anime, IMain } from "../interface";
import NewsRow from "./NewsRow";
import Poster from "./Poster";
import Row from "./Row";
import Sidebar from "./Sidebar";

const HomeFeed = ({ seasonsNow, seasonYear, seasonsUpcoming }: IMain) => {
  // console.log(seasonYear);

  return (
    <section className="max-w-7xl mx-auto p-4 space-y-4 relative ">
      <div className="max-w-[800px] space-y-8 px-3 z-50">
        <Row
          items={seasonsNow}
          title={`${seasonsNow[0]?.season}, ${seasonsNow[0]?.year}`}
        />
        <Row
          items={seasonYear}
          title={`${seasonYear[0]?.season}, ${seasonYear[0]?.year}`}
        />
        <Row items={seasonsUpcoming} title="Upcoming Season" />
        {/* <NewsRow /> */}
      </div>
      <Sidebar />
    </section>
  );
};

export default HomeFeed;
