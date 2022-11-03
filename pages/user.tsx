import { getSession, useUser } from "@auth0/nextjs-auth0";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
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
    router.replace(router.asPath);
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
        )
        .then(() => {
          refreshData();
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Link href={`/anime/${item.malId}`} key={uuidv4()}>
      <div
        className="flex flex-col font-bold cursor-pointer relative space-y-2"
        onMouseEnter={() => setShowTrash(true)}
        onMouseLeave={() => setShowTrash(false)}
      >
        <Image
          src={item.imageUrl}
          height={300}
          width={250}
          className="rounded-lg "
          objectFit={"cover"}
          alt={item.title}
        />
        <p>{item.title}</p>
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
    </Link>
  );
};

const UserPage = () => {
  const { user, isLoading } = useUser();
  console.log(user);

  const { data: favourites } = useSWR(`/api/favorite/${user?.email}`, fetcher);
  console.log(favourites);

  return (
    <main className="flex min-h-[90vh] justify-center items-center p-4">
      {isLoading ? (
        <div className="h-full w-full grid place-items-center">
          <Jelly color="#007CEF" />
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <Image
            src={user?.picture || ""}
            alt="profile-picture"
            width={100}
            height={100}
            className="rounded-full "
            objectFit="cover"
          />
          <div className="mt-2 space-y-2 text-center">
            <p className="text-lg font-semibold">{user?.name}</p>
            <p className="text-sm text-gray-500">{user?.email}</p>
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

export const getServerSideProps = withPageAuthRequired();

export default UserPage;
