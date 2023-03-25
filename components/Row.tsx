import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { v4 } from "uuid";
import { Anime, IRow } from "../interface";
import { useTheme } from "../lib/zustand";
import Poster from "./Poster";
import "swiper/css";
import 'swiper/css/navigation';
import { Navigation,EffectCreative } from "swiper";
const Row = ({ items, title }: IRow) => {
  //view all state to view all of the anime
  const [viewAll, setViewAll] = useState<boolean>(false);
  const { theme } = useTheme();

  const rowBreakpoints = {
    0:{
      slidesPerView:2,
      spaceBetween:10
    },
    480:{
      slidesPerView:3,
      spaceBetween:10
    },
    768:{
      slidesPerView:4,
      spaceBetween:15,
    },
    1024:{
      slidesPerView:5,
      spaceBetween:15,
    },
    1280:{
      slidesPerView:6,
      spaceBetween:20,
    },
  }
  return (
    <section className="space-y-4 ">
      <div className="flex justify-between items-center gap-x-2">
        <h1 className="font-black text-xl text-white whitespace-nowrap capitalize">
          {title}
        </h1>
        <div className="h-[1px] w-full borderGradient"></div>
        <button
          className={`whitespace-nowrap font-black text-xs hover:border-white hover:text-white transition-all ease-linear border-gray-500 border rounded-sm px-2 py-1 tracking-wide  text-gray-500 uppercase`}
          onClick={() => setViewAll(!viewAll)}
        >
          {viewAll ? "View Less" : "View All"}
        </button>
      </div>
      <Swiper  modules={[Navigation]}  navigation breakpoints={rowBreakpoints}>
        {items?.slice(0, viewAll ? items.length : 8).map((anime) => (
          <SwiperSlide key={v4()}>
            <div className="rounded-tl-[30px]  rounded-br-[30px] overflow-hidden">
              <Poster anime={anime} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Row;
