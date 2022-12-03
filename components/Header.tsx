import Link from "next/link";
import { IoMenu, IoSearchCircle } from "react-icons/io5";
import {
  useSearch,
  useSetBodyScroll,
  useTheme,
  useToggle,
} from "../lib/zustand";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import Image from "next/image";
import { signOut,signIn, useSession } from 'next-auth/react'
import useLocalStorage from "../hooks/useLocalStorage";

const showIn = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.1,
    },
  },
  exit: {
    opacity: 0,
  },
};

interface ILink {
  title: string;
  isManga: boolean;
}

const LinkItem = ({ title, isManga }: ILink) => {
  function getSeason(month: number) {
    if (month >= 3 && month <= 5) {
      return "spring";
    }

    if (month >= 6 && month <= 8) {
      return "summer";
    }

    if (month >= 9 && month <= 11) {
      return "fall";
    }

    // Months 12, 01, 02
    return "winter";
  }
  const [isHovered, setIsHovered] = useState<boolean>();
  const d = new Date();
  let month = d.getMonth();
  const currentYear = d.getFullYear();
  const currentSeason = getSeason((month += 1));

  return (
    <div
      className="relative"
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <li className="cursor-pointer capitalize">{title}</li>
      <AnimatePresence
        initial={false}
        exitBeforeEnter={true}
        onExitComplete={() => null}
      >
        {isHovered && (
          <motion.div
            variants={showIn}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute rounded-md  text-sm flex flex-col shadow-md whitespace-nowrap -bottom-20 z-[999] text-blue-500 font-semibold bg-blue-50"
          >
            <div className="hover:bg-blue-500 px-4 flexflex-col py-2 hover:text-white cursor-pointer ease-in duration-100 transition-all ">
              <Link href="/top-anime" className="hover:text-blue-400">
                <span>Top {isManga ? "Manga" : "Anime"}</span>
              </Link>
            </div>

            {!isManga && (
              <div className="px-4 py-2 hover:bg-blue-500 hover:text-white cursor-pointer ease-in duration-100 transition-all ">
                <Link href={`/anime/season/${currentYear}/${currentSeason}`}>
                  Seasonal Anime
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Header = () => {
  const { openSearch } = useSearch();
  const { unsetScroll } = useSetBodyScroll();
  const { toggleNav } = useToggle();
  const { theme } = useTheme();

  const { data:session,status } = useSession()
  //   useEffect(()=>{
  //      setTheme(window.localStorage.getItem("theme")?.slice(1,-1))
  //   },[theme])

  //   console.log(theme)

  return (
    // header component
    <header className={` p-4 text-white bg-[${theme}] `}>
      <div className="max-w-7xl mx-auto">
        <nav className="flex justify-between items-center">
          <span className="font-bold text-2xl whitespace-nowrap">
            <Link href="/">アニワルド</Link>
          </span>
          <ul className="space-x-2  items-center hidden md:flex ml-auto">
            <LinkItem isManga={false} title="anime" />

            <LinkItem isManga={true} title="manga" />
            {status==='authenticated' ? (
              <button onClick={()=>signOut()}>Sign out</button>
            ) : (
              <button onClick={()=>signIn("google")}>Sign in</button>
            )}
            <IoSearchCircle
              className="text-3xl cursor-pointer"
              onClick={() => {
                openSearch();
                unsetScroll();
                window.scrollTo(0, 0);
              }}
            />
            {status==="authenticated" && (
              <Link href="/user">
                <Image
                  alt={"profile"}
                  src={session?.user?.image || ""}
                  width={30}
                  height={30}
                  className="rounded-full ml-2 cursor-pointer"
                />
              </Link>
            )}
          </ul>
          <IoMenu
            className=" text-xl cursor-pointer ml-2"
            onClick={() => {
              toggleNav();
              unsetScroll();
            }}
          />
        </nav>
      </div>
    </header>
  );
};

export default Header;
