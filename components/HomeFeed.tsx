import useMediaQuery from "../hooks/useMediaQuery";
import { IMain } from "../interface";

import Row from "./Row";
import Sidebar from "./Sidebar";

const HomeFeed = ({ seasonsNow, seasonYear, seasonsUpcoming }: IMain) => {
  // console.log(seasonYear);
  const matches = useMediaQuery("(min-width: 1024px)");
  return (
    <section className=" md:p-4 mx-auto p-2 max-w-7xl space-y-4 relative ">
      <div className="min-[1024px]:max-w-[600px] min-[1030px]:max-w-[650px] min-[1150px]:max-w-[800px] space-y-8 px-3 z-50">
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
      {matches ? <Sidebar /> : null}
    </section>
  );
};

export default HomeFeed;
