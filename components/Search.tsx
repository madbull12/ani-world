import BackdropModal from "./BackdropModal";
import { motion } from "framer-motion";
import { useSearch, useSetBodyScroll } from "../lib/zustand";
import { IoFilter, IoSearchOutline } from "react-icons/io5";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface IDropdown {
  setCategory: (item: string) => void;
  category: string;
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

const dropDown = {
  enter: {
    opacity: 1,
    y: 0,
    display: "block",
  },
  exit: {
    y: -5,
    opacity: 0,
    transition: {
      duration: 0.3,
      damping: 10,
      stiffness: 500,
    },
    transitionEnd: {
      display: "none",
    },
  },
};

const dropdownItem = ["Anime", "Manga"];

const CategoryDropdown = ({ setCategory, category }: IDropdown) => {
  const [isDropped, setDropDown] = useState<boolean>(false);
  // const [category,setCategory] = useState<string>("anime");

  return (
    <div onClick={() => setDropDown(!isDropped)}>
      <div className="flex items-center gap-x-1 cursor-pointer">
        <span className="capitalize">{category}</span>
        <IoFilter />
      </div>
      {isDropped && (
        <motion.ul
          className="text-black bg-white absolute rounded-sm mt-1"
          variants={dropDown}
          initial="exit"
          animate={isDropped ? "enter" : "exit"}
          exit="exit"
        >
          {dropdownItem.map((item) => (
            <motion.li
              key={uuidv4()}
              whileHover={{
                backgroundColor: "#2563EB",
                color: "#fff",
              }}
              className="px-2 py-1 cursor-default"
              onClick={() => setCategory(item.toLowerCase())}
            >
              {item}
            </motion.li>
          ))}
        </motion.ul>
      )}
    </div>
  );
};

const Search = () => {
  const { setScroll } = useSetBodyScroll();
  const { close:closeSearch } = useSearch();
  const router = useRouter();
  const [term, setTerm] = useState<string>("");
  const [category, setCategory] = useState<string>("anime");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setScroll();

    closeSearch();
    router.push({
      pathname: "/search",
      query: {
        q: term,
        cat: category,
      },
    });
  };

  return (
    <BackdropModal
      onClick={() => {
        closeSearch();
        setScroll();
      }}
    >
      <motion.div
        className="text-white p-2 xs:p-4 bg-primary relative max-w-[500px] rounded-lg"
        onClick={(e) => e.stopPropagation()}
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="flex items-center flex-col xs:flex-row space-x-2 w-full ">
          <CategoryDropdown setCategory={setCategory} category={category} />
          <div className="flex items-center gap-x-1">
            <IoSearchOutline />
            <form onSubmit={handleSubmit} className="relative">
              <input
                onChange={(e) => setTerm(e.target.value)}
                type="text"
                className="bg-transparent outline-none border-b p-2  placeholder:text-gray-300"
                placeholder="Search anime, manga and more..."
              />
            </form>
          </div>
        </div>
      </motion.div>
    </BackdropModal>
  );
};

export default Search;
