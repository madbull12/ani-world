import React, { useState } from "react";
import { IoClose, IoLogInOutline, IoLogOutOutline } from "react-icons/io5";
import { useSearch, useSetBodyScroll, useToggle } from "../lib/zustand";
import BackdropModal from "./BackdropModal";
import { AnimatePresence, motion } from "framer-motion";
import ColorTheme from "./ColorTheme";
import Link from "next/link";
import Image from "next/legacy/image";
import { signIn, signOut, useSession } from "next-auth/react";
import { getSeason } from "../helper/functions";

const LinkItem = ({ isManga }: { isManga: boolean }) => {
  const [isClicked, setIsClicked] = useState(false);

  const d = new Date();
  let month = d.getMonth();
  const currentYear = d.getFullYear();
  const currentSeason = getSeason((month += 1));
  return (
    <div className="relative ">
      <motion.li
        className=" cursor-pointer text-gray-500"
        onClick={() => setIsClicked(!isClicked)}
      >
        {isManga ? "Manga" : "Anime"}
      </motion.li>
      {isClicked && (
        <AnimatePresence exitBeforeEnter={true} onExitComplete={() => null}>
          <motion.div
            className="flex flex-col items-center text-base gap-y-2 mt-2"
            animate={{ height: "auto" }}
            initial={{ height: 0 }}
            exit={{ height: 0 }}
            transition={{
              type: "spring",
              damping: 10,
              stiffness: 150,
            }}
          >
            <Link href={`${isManga ? "/top-manga" : "/top-anime"}`}>
              {isManga ? "Top Manga" : "Top Anime"}
            </Link>
            {!isManga ? (
              <Link href={`/anime/season/${currentYear}/${currentSeason}`}>
                Seasonal Anime
              </Link>
            ) : null}

            <Link href={`${isManga ? "/genres/manga" : "/genres/anime"}`}>
              {isManga ? "Manga Genres" : "Anime Genres"}
            </Link>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

const ToggleNav = () => {
  const { open } = useSearch();
  const { untoggleNav } = useToggle();
  const { setScroll, unsetScroll } = useSetBodyScroll();
  const handleClose = () => {
    untoggleNav();
    setScroll();
  };

  const showIn = {
    show: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 40,
        stiffness: 300,
      },
    },
    hidden: {
      x: "-100%",
      opacity: 0,
    },
  };

  // const { user } = useUser();
  const { data: session, status } = useSession();
  const d = new Date();
  let month = d.getMonth();
  const currentYear = d.getFullYear();
  const currentSeason = getSeason((month += 1));

  return (
    <BackdropModal onClick={handleClose}>
      <motion.section
        onClick={(e) => e.stopPropagation()}
        variants={showIn}
        initial="hidden"
        exit="hidden"
        animate="show"
        className="min-h-screen fixed flex flex-col top-0 left-0 bg-black min-w-[40vw] z-[999]  p-4 "
      >
        <IoClose
          className="text-2xl self-end mb-4 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            handleClose();
          }}
        />
        {/* <ul className="flex flex-col  gap-y-2 mb-2 md:hidden">
          <LinkItem isManga={false} />
          <LinkItem isManga={true} />
          <li
            className="cursor-pointer"
            onClick={() => {
              unsetScroll();
              open();
              untoggleNav();
            }}
          >
            Search
          </li>
        </ul> */}
        <ul className="menu ">
          <li tabIndex={0}>
            <span>Anime</span>
            <ul className="bg-base-200 rounded-sm text-sm ">
              <li>
                <Link href="/top-anime">Top Anime</Link>
              </li>
              <li>
                <Link href={`/anime/season/${currentYear}/${currentSeason}`}>
                  Seasonal Anime
                </Link>
              </li>
              <li>
                <Link href="/genres/anime">Anime Genres</Link>
              </li>
            </ul>
          </li>
          <li tabIndex={1}>
            <span>Manga</span>
            <ul className="bg-base-200 text-sm rounded-sm">
              <li>
                <Link href="/top-manga">Top Manga</Link>
              </li>
              <li>
                <Link href="/genres/manga">Manga Genres</Link>
              </li>
            </ul>
          </li>
          <li
            tabIndex={2}
            className="cursor-pointer"
            onClick={() => {
              unsetScroll();
              open();
              untoggleNav();
            }}
          >
            <span>Search</span>
          </li>
        </ul>
        {status === "authenticated" ? (
          <li tabIndex={3} >
            <button onClick={() => signOut()}>
              <span className="flex font-semibold items-center gap-x-2  cursor-pointer">
                <IoLogOutOutline />
                Sign out
              </span>
            </button>
          </li>
        ) : null}

        {/* <div className="md:hidden">
          {status === "authenticated" ? (
            <div className="flex justify-between flex-col">
              <button onClick={() => signOut()}>
                <span className="flex font-semibold items-center gap-x-2 text-xl cursor-pointer">
                  <IoLogOutOutline />
                  Sign out
                </span>
              </button>
              <Link href={"/user/favourites"}>
                <div className="gap-x-2 flex items-center mt-4 ">
                  <Image
                    alt="profile"
                    src={session?.user?.image || ""}
                    width={30}
                    height={30}
                    objectFit="cover"
                    className="rounded-full self-end mt-4"
                  />
                  <p className="text-xs">{session?.user?.name}</p>
                </div>
              </Link>
            </div>
          ) : (
            <button onClick={() => signIn("google")}>
              <span className="flex font-semibold  items-center gap-x-2 text-xl cursor-pointer">
                <IoLogInOutline />
                Sign in
              </span>
            </button>
          )}
        </div> */}
        {/* <ColorTheme /> */}
      </motion.section>
    </BackdropModal>
  );
};

export default ToggleNav;
