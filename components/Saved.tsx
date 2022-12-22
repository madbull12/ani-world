import Image from "next/legacy/image";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import { BsFillTrashFill } from "react-icons/bs";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";
import { motion } from "framer-motion";
import {  ISavedResp } from "../interface";
import { deleteFavourite, deleteWatchLater } from "../helper/functions";

const Saved = ({ item }: { item: ISavedResp }) => {
  const [showTrash, setShowTrash] = useState<boolean>(false);
  console.log(item.malId)

  const router = useRouter();
  const refreshData = () => {
    router.replace(router.asPath, undefined, { scroll: false });
  };

  const deleteSave = ()=> {
    if(router.pathname==="/user/favourites") {
      deleteFavourite(item.id)
    } else {
      deleteWatchLater(item.id)
    }
    refreshData()
  }


  return (
    <div>
      <div
        className="flex flex-col font-bold cursor-pointer relative space-y-2"
        onMouseEnter={() => setShowTrash(true)}
        onMouseLeave={() => setShowTrash(false)}
      >
        <div className="relative w-64 h-72">
          <Image
            src={item.imageUrl}
            layout="fill"
            className="rounded-lg "
            objectFit={"cover"}
            alt={item.title}
          />
          <div className="absolute top-0 right-0 bottom-0 left-0 bg-[#00000073] overflow-hidden rounded-lg"></div>
        </div>

        <Link href={`/anime/${item.malId}`} className="text-blue-500">
          {item.title}
        </Link>
        {showTrash && (
          <motion.button
            className="text-gray-300 self-center absolute left-2"
            onClick={(e) => {
              e.stopPropagation();
              deleteSave();
            }}
          >
            <BsFillTrashFill className="text-2xl" />
          </motion.button>
        )}
      </div>
    </div>
  );
};

export default Saved;
