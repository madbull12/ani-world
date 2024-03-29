import moment from "moment";
import { signIn, useSession } from "next-auth/react";
import Image from "next/legacy/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import useSWR from "swr";
import { v4 as uuidv4 } from "uuid";
import fetcher from "../helper/fetcher";
import {
  addToFavourite,
  addToWatchLater,
  deleteWatchLater,
} from "../helper/functions";
import useFavourites from "../hooks/useFavourites";
import useLocalStorage from "../hooks/useLocalStorage";
import useWatchLater from "../hooks/useWatchLater";
import { Anime, ISavedResp } from "../interface";
import LineOverlay from "./LineOverlay";
import MotionBtn from "./MotionBtn";

const TopAnimeRow = ({
  item,
  i,
  page,
}: {
  item: Anime;
  i: number;
  page: number;
}) => {
  // const { data: watchLater } = useSWR(`/api/watch-later`, fetcher);

  const {
    handleAddWatchLater,
    watchLaterClicked,
    addedToWatchLater,
    handleDeleteWatchLater,
  } = useWatchLater(item);
  console.log(watchLaterClicked);
  const {
    handleDeleteFavourite,
    handleAddFavourite,
    addedToFavourites,
    favorited,
  } = useFavourites(item);
  // const addedToWatchLater = watchLater?.find(
  //   (watchLater: ISavedResp) => watchLater.malId === item.mal_id
  // );
  // const { status } = useSession();
  // const [watchLaterClicked, setWatchLaterClicked] = useState<boolean>(false);

  // const handleAddWatchLater = async () => {
  //   setWatchLaterClicked(true);
  //   await addToWatchLater(item.title, item.images.jpg.image_url, item.mal_id);
  //   router.push("/user/watchLater", undefined, { shallow: true });
  // };

  // const handleDeleteWatchLater = async () => {
  //   setWatchLaterClicked(false);
  //   await deleteWatchLater(addedToWatchLater?.id);
  // };
  const router = useRouter();
  return (
    <tr key={uuidv4()} className="[&>*]:text-center [&>*]:p-2   divide-x">
      <td className="text-gray-400 text-2xl md:text-4xl font-bold">
        {page >= 2 ? i + 1 + 25 * (page - 1) : i + 1}
      </td>
      <td>
        <div className="flex gap-x-2 items-center flex-col xs:flex-row py-4 px-2">
          <Image
            alt={item.title}
            src={item.images.jpg.image_url}
            width={60}
            height={80}
          />
          <div className="[&>p]:text-gray-400 [&>p]:text-xs  text-center xs:text-start  ">
            <Link
              href={`/${router.pathname === "/top-anime" ? "anime" : "manga"}/${
                item.mal_id
              }/characters`}
            >
              <span className="font-bold text-xs hover:text-primary-focus text-primary cursor-pointer ">
                {item.title}
              </span>
            </Link>
            <p>
              {item.type} ({item.episodes} eps)
            </p>

            {/* <p>
            {moment(item.aired.from).format("LL")} -{" "}
            {moment(item.aired.to).format("LL")}
          </p> */}
            <p>{item.members.toLocaleString()} members</p>
          </div>
        </div>
        <LineOverlay />
      </td>
      <td className="text-sm">{item.score || "-"}</td>
      <td>
        <MotionBtn
          string={
            watchLaterClicked || addedToWatchLater
              ? "Remove from  list"
              : "Add to list"
          }
          handleClick={() =>
            addedToWatchLater ? handleDeleteWatchLater() : handleAddWatchLater()
          }
        />
      </td>
    </tr>
  );
};

export default TopAnimeRow;
