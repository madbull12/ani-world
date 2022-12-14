
import { Jelly } from "@uiball/loaders";
import Image from "next/image";
import React, { useState } from "react";
import useSWR from "swr";
import fetcher from "../helper/fetcher";
import Poster from "../components/Poster";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";
import { BsFillTrashFill } from "react-icons/bs";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

interface IFavourite {
  id: number;
  title: string;
  imageUrl: string;
  userEmail: string;
  malId: number;
}

const Favourite = ({ item }: { item: IFavourite }) => {
  const [showTrash, setShowTrash] = useState<boolean>(false);

  const router = useRouter();
  const refreshData = () => {
    router.replace(router.asPath, undefined,{ scroll:false });
  };

  const deleteSave = async (id: number) => {
    try {
      await toast
        .promise(
          fetch(`/api/favorite/${id}`, {
            headers: {
              "Content-type": "application/json",
            },
            method: "DELETE",
          }),
          {
            loading: "Removing from favourites",
            success: "Anime successfully removed",
            error: "There's an error removing anime",
          }
        ).then(()=>refreshData())

      
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div  key={uuidv4()}>
      <div
        className="flex flex-col font-bold cursor-pointer relative space-y-2"
        onMouseEnter={() => setShowTrash(true)}
        onMouseLeave={() => setShowTrash(false)}
      >
        <div className="relative w-72 h-72">
          <Image
            src={item.imageUrl}
            layout="fill"
            className="rounded-lg "
            objectFit={"cover"}
            alt={item.title}
          />
          <div className="absolute top-0 right-0 bottom-0 left-0 bg-[#00000073] overflow-hidden rounded-lg" ></div>
        </div>
        
        <Link href={`/anime/${item.malId}`} className="text-blue-500">{item.title}</Link>
        {showTrash && (
          <motion.button
            className="text-gray-300 self-center absolute left-2"
            onClick={(e) => {
              e.stopPropagation();
              deleteSave(item.id);
            }}
          >
            <BsFillTrashFill className="text-2xl" />
          </motion.button>
        )}
      </div>
    </div>
  );
};

const UserPage = () => {
  const { data:session }:any = useSession()

  const { data: favourites } = useSWR(`/api/favorite`, fetcher);
  console.log(favourites);

  return (
    <main className="flex min-h-[90vh] justify-center items-center p-4">
      {!favourites ? (
        <div className="h-full w-full grid place-items-center">
          <Jelly color="#007CEF" />
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <Image
            src={session?.user?.image || ""}
            alt="profile-picture"
            width={100}
            height={100}
            className="rounded-full "
            objectFit="cover"
          />
          <div className="mt-2 space-y-2 text-center">
            <p className="text-lg font-semibold">{session?.user?.name}</p>
            <p className="text-sm text-gray-500">{session?.user?.email}</p>
          </div>
          <div className="justify-self-start mt-4">
            <>
              {favourites?.length !== 0 ? (
                <>
                  <h1 className="text-xl font-bold">Favourite Anime</h1>
                  <div className="grid gap-4 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 grid-cols-1">
                    {favourites?.map((item: IFavourite) => (
                      <Favourite item={item} key={uuidv4()} />
                    ))}
                  </div>
                </>
              ) : (
                <p>No pins yet</p>
              )}
            </>
          </div>
        </div>
      )}
    </main>
  );
};


export default UserPage;
