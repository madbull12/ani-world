import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { v4 } from "uuid";
import { Anime, IRow } from "../interface";
import { useTheme } from "../lib/zustand";
import Poster from "./Poster";
import "swiper/css";
import "swiper/css/navigation";
import { useSwiper } from "swiper/react";
import { Navigation, EffectCreative } from "swiper";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";



const NavButtons = () => {
  const swiper = useSwiper()
  return (
    <div className="flex items-center h-0  justify-between text-white top-1/2  text-3xl absolute w-full z-[999]">
      <button onClick={()=>swiper.slidePrev()} >
        <IoIosArrowBack />
      </button>
      <button onClick={()=>swiper.slideNext()} >
        <IoIosArrowForward />
      </button>
    </div>
  );
};

const Row = ({ items, title }: IRow) => {
  //view all state to view all of the anime
  const swiper = useSwiper();
  const [viewAll, setViewAll] = useState<boolean>(false);
  const { theme } = useTheme();

  const rowBreakpoints = {
    0: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    375: {
      slidesPerView: 3,
      spaceBetween: 10,
    },
    480: {
      slidesPerView: 4,
      spaceBetween: 10,
    },
    640: {
      slidesPerView: 5,
      spaceBetween: 15,
    },
    768: {
      slidesPerView: 6,
      spaceBetween: 15,
    },
    1024: {
      slidesPerView: 6,
      spaceBetween: 20,
    },
    // 1280:{
    //   slidesPerView:6,
    //   spaceBetween:20,
    // },
  };
  return (
    <section className="space-y-4 ">
      <div className="flex justify-between items-center gap-x-2">
        <h1 className="font-black text-xl text-white whitespace-nowrap capitalize">
          {title}
        </h1>
        <div className="h-[1px] w-full borderOverlay"></div>
        <button
          className={`whitespace-nowrap font-black text-xs hover:border-white hover:text-white transition-all ease-linear border-gray-500 border rounded-sm px-2 py-1 tracking-wide  text-gray-500 uppercase`}
          onClick={() => setViewAll(!viewAll)}
        >
          {viewAll ? "View Less" : "View All"}
        </button>
      </div>
      <div className="flex items-center gap-x-4 text-white relative">
        <Swiper loop modules={[Navigation]} breakpoints={rowBreakpoints}>
          <NavButtons />
          {items?.slice(0, viewAll ? items.length : 8).map((anime) => (
            <SwiperSlide key={v4()}>
              <div className="rounded-tl-[30px]  rounded-br-[30px] overflow-hidden">
                <Poster anime={anime} />
              </div>
            </SwiperSlide>
          ))}

          
        </Swiper>
      </div>
    </section>
  );
};

export default Row;
