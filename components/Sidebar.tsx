import React, { useEffect, useState } from "react";
import { Anime } from "../interface";
import { getAnimeByFilter } from "../pages/api/anime";
import SidebarRow from "./SidebarRow";


export interface ISidebar {
  topAiring: Anime[];
  topUpcoming: Anime[];
}
const Sidebar = () => {
  const [values, setValues] = useState({
    loading: false,
    error: null,
    topAiring: [],
    topUpcoming: [],
    mostPopular: [],
  });

  useEffect(() => {
    const fetchSidebarAnime = async () => {
      setValues({
        ...values,
        loading: true,
      });
      try {
        const _topAiring = await getAnimeByFilter("airing");
        // const _topUpcoming = await getAnimeByFilter("upcoming");
        const _mostPopular = await getAnimeByFilter("bypopularity");

        setValues({
          ...values,
          loading: false,
          topAiring: _topAiring,
          // topUpcoming:_topUpcoming,
          mostPopular: _mostPopular,
        });
      } catch (err: any) {
        setValues({
          ...values,
          error: err,
        });
      } 
    };

    fetchSidebarAnime();
  }, []);

  return (
    <aside className="sticky bottom-0 right-0 top-0 p-4 w-[40%] space-y-12 ">
      <>
        <SidebarRow
          items={values?.topAiring}
          title="Top Airing Anime"
          limit={5}
          loading={values?.loading}
        />
        {/* <SidebarRow items={values?.topUpcoming} title="Top Upcoming Anime" limit={5} loading={values?.loading} /> */}
        <SidebarRow
          items={values?.mostPopular}
          title="Most Popular Anime"
          limit={10}
          loading={values?.loading}
        />
      </>
    </aside>
  );
};

export default Sidebar;
