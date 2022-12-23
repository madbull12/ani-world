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
import { Anime, ISavedResp } from "../interface";
import MotionBtn from "./MotionBtn";

const TopAnimeRow = ({ item }: { item: Anime }) => {
  const { data: watchLater } = useSWR(`/api/watch-later`, fetcher);
  const router = useRouter();
  const addedToWatchLater = watchLater?.find(
    (watchLater: ISavedResp) => watchLater.malId === item.mal_id
  );
  const { status } = useSession();
  const [watchLaterClicked, setWatchLaterClicked] = useState<boolean>(false);

  const handleAddWatchLater = async () => {
    setWatchLaterClicked(true);
    await addToWatchLater(item.title, item.images.jpg.image_url, item.mal_id);
    router.push("/user/watchLater", undefined, { shallow: true });
  };

  const handleDeleteWatchLater = async () => {
    setWatchLaterClicked(false);
    await deleteWatchLater(addedToWatchLater?.id);
  };

  return (
    <tr
      key={uuidv4()}
      className="[&>*]:text-center [&>*]:p-2 [&:nth-child(even)]:bg-blue-50 divide-x"
    >
      <td className="text-gray-400 text-2xl md:text-4xl font-bold">
        {item.rank}
      </td>
      <td className="flex gap-x-2 items-center flex-col xs:flex-row">
        <Image
          alt={item.title}
          src={item.images.jpg.image_url}
          width={60}
          height={80}
        />
        <div className="[&>p]:text-gray-400 [&>p]:text-xs  text-center xs:text-start  ">
          <Link href={`/anime/${item.mal_id}`}>
            <span className="font-bold text-xs  text-blue-500 cursor-pointer hover:text-blue-400">
              {item.title}
            </span>
          </Link>
          <p>
            {item.type} ({item.episodes} eps)
          </p>

          <p>
            {moment(item.aired.from).format("LL")} -{" "}
            {moment(item.aired.to).format("LL")}
          </p>
          <p>{item.members.toLocaleString()} members</p>
        </div>
      </td>
      <td className="text-sm">{item.score}</td>
      <td>
        <MotionBtn
          string={
            watchLaterClicked || addedToWatchLater
              ? "Remove from  list"
              : "Add to list"
          }
          handleClick={() =>
            status === "authenticated"
              ? addedToWatchLater
                ? handleDeleteWatchLater()
                : handleAddWatchLater()
              : signIn("google")
          }
        />
      </td>
    </tr>
  );
};

export default TopAnimeRow;
