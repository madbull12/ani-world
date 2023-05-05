import React from "react";
import BackdropModal from "./BackdropModal";
import { useSetBodyScroll, useTheme, useThemeModal } from "../lib/zustand";
import { motion } from "framer-motion";
import { dropIn } from "../lib/animationProperties";
import useLocalStorage from "../hooks/useLocalStorage";

const ColorTheme = ({ color,value }: { color: string,value:string }) => {
    const [theme,setTheme] = useLocalStorage<string>("theme","")
  return <div className={`${color} rounded-full h-8 w-8 cursor-pointer`} onClick={()=>setTheme(value)}></div>;
};

const ThemeChangerModal = () => {
  const { setScroll } = useSetBodyScroll();
  const { close: closeThemeModal } = useThemeModal();
  return (
    <BackdropModal
      onClick={() => {
        setScroll();
        closeThemeModal();
      }}
    >
      <motion.div
        className="text-white p-2 xs:p-4 bg-neutral-900  relative max-w-[500px] rounded-lg"
        onClick={(e) => e.stopPropagation()}
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <h1 className="text-center text-white font-bold text-2xl">
          Change color theme
        </h1>
        <div className="flex gap-2 items-center mt-4">
          <ColorTheme color="bg-[#FF0077]" value="pinkTheme" />

          <ColorTheme color="bg-[#8A33E1]" value="purpleTheme" />
        </div>
      </motion.div>
    </BackdropModal>
  );
};

export default ThemeChangerModal;
