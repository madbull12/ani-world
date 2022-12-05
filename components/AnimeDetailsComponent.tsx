import Image from "next/image";
import React, { FC, useEffect, useState } from "react";
import {
  IoAddCircleOutline,
  IoClose,
  IoHeartCircleOutline,
  IoTimeSharp,
} from "react-icons/io5";
import { Anime, AnimeDetailsProps, Genre } from "../interface";
import Backdrop from "./Backdrop";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import MotionBtn from "./MotionBtn";
import BackdropModal from "./BackdropModal";
import { useSetBodyScroll, useTheme } from "../lib/zustand";
import { addToFavourite } from "../helper/functions";
import { signIn, useSession } from "next-auth/react";

interface IDetails {
  anime: AnimeDetailsProps;
  children?: React.ReactNode;
}

const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};

const Synopsis = ({
  text,
  handleClose,
}: {
  text: string;
  handleClose: () => void;
}) => {
  const { setScroll } = useSetBodyScroll();
  const { theme } = useTheme();

  return (
    <BackdropModal
      onClick={() => {
        handleClose();
        setScroll();
      }}
    >
      <motion.div
        className={`bg-${theme}-500 text-white p-4  relative max-w-[500px] rounded-lg`}
        onClick={(e) => e.stopPropagation()}
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <h1 className="font-bold text-2xl">Synopsis</h1>
        <p>{text}</p>
        <IoClose
          className="text-2xl absolute top-2 right-2 cursor-pointer"
          onClick={handleClose}
        />
      </motion.div>
    </BackdropModal>
  );
};

const AnimeDetailsComponent = ({ anime, children }: IDetails) => {
  const tabLinks = [
    "videos",
    "episodes",
    "reviews",
    "recommendations",
    "stats",
    "characters",
  ];
  const { unsetScroll } = useSetBodyScroll();
  const { theme } = useTheme();

  // const { user } = useUser();
  const { data:session,status } = useSession()
  const [_link, setLink] = useState("videos");
  const router = useRouter();
  const { animeId } = router.query;
  const [showSynopsis, setShowSynopsis] = useState(false);

  const convertToDate = (x: string) => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const date = new Date(x);

    const year = date.getFullYear();
    let dt: string | number = date.getDate();
    let month = monthNames[date.getMonth()];

    if (dt < 10) {
      dt = "0" + dt;
    }

    if (!x) {
      return "N/A";
    }

    return `${dt} ${month}, ${year}`;
  };

  const handleClose = () => {
    setShowSynopsis(false);
  };

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  const handleAddFavourite = async() => {
    await addToFavourite(
      anime.title,
      anime.images.jpg.image_url,
      anime.mal_id,
    );
    router.push("/user",undefined,{shallow:true})
  }

  return (
    <div>
      {anime && (
        <div>
          <AnimatePresence
            initial={false}
            exitBeforeEnter={true}
            onExitComplete={() => null}
          >
            {showSynopsis && (
              <Synopsis text={anime.synopsis} handleClose={handleClose} />
            )}
          </AnimatePresence>

          <div className="relative">
            <div className="w-full h-96">
              <Image
                alt={anime.title}
                src={anime.images.jpg.large_image_url}
               
                layout="fill"
                objectFit="cover"

              />
            </div>
           
            <div className="absolute z-50 md:-bottom-36  lg:-bottom-40 left-0  pt-4 md:pt-0 px-8 flex flex-col items-start md:flex-row  gap-x-8 w-full gap-y-2">
              <Image
                alt={anime.title}
                src={anime.images.jpg.large_image_url}
                width={220}
                height={300}
                className="rounded-lg  z-[999]"
                objectFit="cover"
              />
              <div className=" md:pt-12  ">
                <div className=" max-w-[250px] md:max-w-full">
                  <h1 className="text-white font-bold text-lg md:text-xl lg:text-2xl">
                    {anime.title}
                  </h1>
                  <p className="text-white font-thin text-sm md:text-base ">
                    {anime.title_japanese}
                  </p>
                </div>
              </div>
              <div className=" md:pt-12 md:ml-auto text-white text-4xl flex self-start">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <IoAddCircleOutline className="text-3xl lg:text-4xl cursor-pointer" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() =>
                    status==="authenticated"
                      ? handleAddFavourite()
                      : signIn("google")
                  }
                >
                  <IoHeartCircleOutline className="text-3xl lg:text-4xl cursor-pointer" />
                </motion.button>
              </div>
            </div>
            <Backdrop color="#1085f1" />
          </div>
          <section className={`bg-${theme}-500 w-full py-4 pr-4 text-white`}>
            <div className="ml-[285px] space-y-3 z-[999] relative">
              <header className="flex justify-between items-center gap-x-3 flex-col md:flex-row">
                <h1 className="lg:text-xl text-base font-bold hidden md:block">
                  Synopsis
                </h1>

                <div className="flex space-x-4">
                  <p className=" font-semibold text-sm md:text-base">
                    Ranked:
                    <span className="font-normal">
                      {" "}
                      #{anime.rank?.toLocaleString() || "N/A"}
                    </span>
                  </p>
                  <p className="font-semibold text-sm md:text-base">
                    Popularity:
                    <span className="font-normal">
                      {" "}
                      #{anime.popularity?.toLocaleString() || "N/A"}
                    </span>
                  </p>
                  <p className="font-semibold text-sm md:text-base">
                    Members:
                    <span className="font-normal">
                      {" "}
                      {anime.members?.toLocaleString() || "N/A"}
                    </span>
                  </p>
                </div>
              </header>
              <div className="md:hidden">
                <MotionBtn
                  handleClick={() => {
                    setShowSynopsis(true);
                  }}
                  unsetScroll={unsetScroll}
                  string="Read Synopsis"
                  scrollToTop={scrollToTop}
                />
              </div>

              <p className="text-sm lg:text-base hidden md:block">
                {anime.synopsis}
              </p>
            </div>
            <div className="p-8 flex gap-x-4 mt-80 md:mt-8">
              <div className="text-white bg-[#FF9901] rounded-full md:rounded-lg w-[50px] h-[50px] md:h-auto md:w-auto grid place-items-center p-2 self-start md:flex md:flex-col md:items-center">
                <span className="font-bold text-xs hidden md:block">SCORE</span>
                <span className="text-base md:text-2xl font-bold">
                  {anime.score || "N/A"}
                </span>
                <span className="text-xs font-normal hidden md:block">
                  {anime.scored_by?.toLocaleString() || "N/A"} users
                </span>
              </div>
              <div className="rounded-lg border-2 border-gray-700 p-3 space-y-2 flex flex-col ">
                <div className="space-x-4">
                  <span className="font-semibold">
                    Type: <span className="font-normal">{anime.type}</span>
                  </span>
                  <span className="font-semibold">
                    Episodes:{" "}
                    <span className="font-normal">
                      {anime.episodes || "N/A"}
                    </span>
                  </span>
                  <span className="font-semibold">
                    Genres:
                    {anime.genres.map((genre: Genre, i: any) => (
                      <span key={uuidv4()} className="font-normal">{`${
                        i ? "," : ""
                      } ${genre.name}`}</span>
                    ))}
                  </span>
                  <span className="font-semibold">
                    Status: <span className="font-normal">{anime.status}</span>
                  </span>
                </div>
                <div className="space-x-4">
                  <span className="font-semibold">
                    Aired:{" "}
                    <span className="font-normal">
                      from {convertToDate(anime.aired.from)} to{" "}
                      {convertToDate(anime.aired.to)}{" "}
                    </span>
                  </span>
                  <span className="font-semibold">
                    <span className="font-normal">
                      Broadcast: {anime.broadcast.string}
                    </span>
                  </span>
                  <span className="font-semibold">
                    Studios:
                    {anime.studios.map((studio: Genre, i: any) => (
                      <span key={uuidv4()} className="font-normal">{`${
                        i ? "," : ""
                      } ${studio.name}`}</span>
                    ))}
                  </span>
                </div>
                <div className="space-x-4">
                  <span className="font-semibold">
                    Duration:{" "}
                    <span className="font-normal">{anime.duration}</span>
                  </span>
                  <span className="font-semibold">
                    Rating: <span className="font-normal">{anime.rating}</span>
                  </span>
                  <span className="font-semibold">
                    Source: <span className="font-normal">{anime.source}</span>
                  </span>
                </div>
              </div>
            </div>
          </section>
          <section className="bg-white p-8 max-7xl mx-auto">
            <nav>
              <ul className="flex justify-between flex-wrap gap-2">
                {tabLinks.map((link, i) => (
                  <Link
                    href={`/anime/${animeId}/${link}`}
                    key={uuidv4()}
                    scroll={false}
                  >
                    <li
                      className={`font-bold pb-2 uppercase text-sm cursor-pointer ${
                        router.pathname.includes(link)
                          ? `border-b-4 border-${theme}-500`
                          : ""
                      }`}
                      onClick={() => setLink(link)}
                    >
                      {link}
                    </li>
                  </Link>
                ))}
              </ul>
            </nav>
            {children}
          </section>
        </div>
      )}
    </div>
  );
};

export default AnimeDetailsComponent;

function setShowSynopsis(arg0: boolean): void {
  throw new Error("Function not implemented.");
}
