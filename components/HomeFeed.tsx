import useMediaQuery from "../hooks/useMediaQuery";
import { IMain } from "../interface";

import Row from "./Row";
import Sidebar from "./Sidebar";

const HomeFeed = ({ seasonsNow, seasonYear, seasonsUpcoming }: IMain) => {
  // console.log(seasonYear);
  const matches = useMediaQuery("(min-width: 1024px)");
  return (
    <section className=" md:p-4 mx-auto flex p-2 max-w-7xl  relative ">
      <div className=" space-y-8 px-3 w-full lg:max-w-[60%] z-50">
        <Row
          items={seasonsNow}
          title={`${seasonsNow[0]?.season}, ${seasonsNow[0]?.year}`}
        />
        <Row
          items={seasonYear}
          title={`Top Anime`}
        />
        <Row items={seasonsUpcoming} title="Upcoming Season" />
        {/* <NewsRow /> */}
      </div>
      {matches ? <Sidebar /> : null}
    </section>
  );
};

export default HomeFeed;
