import React, { useState } from "react";
import { IoClose, IoLogInOutline, IoLogOutOutline } from "react-icons/io5";
import { useSetBodyScroll, useToggle } from "../lib/zustand";
import BackdropModal from "./BackdropModal";
import { AnimatePresence, motion } from "framer-motion";
import ColorTheme from "./ColorTheme";
import { useUser } from "@auth0/nextjs-auth0";
import Link from "next/link";
import Image from "next/image";

const LinkItem = () => {
  const [isClicked, setIsClicked] = useState(false);
  return (
    <div className="relative ">
      <motion.li
        whileHover={{
          scale: 1.2,
          borderBottom: "2px solid black",
          fontWeight: "bold",
        }}
        className=" cursor-pointer"
        onClick={() => setIsClicked(!isClicked)}
      >
        Anime
      </motion.li>
      {isClicked && (
        <AnimatePresence exitBeforeEnter={true} onExitComplete={() => null}>
          <motion.div
            className="flex flex-col items-center"
            animate={{ height: "auto" }}
            initial={{ height: 0 }}
            exit={{ height: 0 }}
            transition={{
              type: "spring",
              damping: 10,
              stiffness: 150,
            }}
          >
            <p>fdfs</p>
            <p>fdfs</p>
            <p>fdfs</p>
            <p>fdfs</p>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

const ToggleNav = () => {
  const { untoggleNav } = useToggle();
  const { setScroll } = useSetBodyScroll();
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
        damping: 20,
        stiffness: 200,
      },
    },
    hidden: {
      x: "100%",
      opacity: 0,
    },
  };

  const { user } = useUser();

  return (
    <BackdropModal onClick={handleClose}>
      <motion.section
        onClick={(e) => e.stopPropagation()}
        variants={showIn}
        initial="hidden"
        exit="hidden"
        animate="show"
        className="min-h-screen fixed top-0 right-0 bg-white min-w-[30vw] z-[999] text-gray-700 p-4 "
      >
        <IoClose
          className="text-2xl cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            handleClose();
          }}
        />
        <ul className="flex flex-col text-xl items-center gap-y-2 mb-2 md:hidden">
          <LinkItem />

          <li className="cursor-pointer">Manga</li>
        </ul>
        <ColorTheme />
        <div className="md:hidden">
          {user ? (
            <div className="flex items-center justify-between">
              <Link href="/api/auth/logout">
                <span className="flex font-semibold items-center gap-x-2 text-xl cursor-pointer">
                  <IoLogOutOutline />
                  Sign out
                </span>
              </Link>
              <Image
                alt="profile"
                src={user?.picture || ""}
                width={30}
                height={30}
                objectFit="cover"
                className="rounded-full"
              />
            </div>
          ) : (
            <Link href="/api/auth/login">
              <span className="flex font-semibold items-center gap-x-2 text-xl cursor-pointer">
                <IoLogInOutline />
                Sign in
              </span>
            </Link>
          )}
        </div>
      </motion.section>
    </BackdropModal>
  );
};

export default ToggleNav;
