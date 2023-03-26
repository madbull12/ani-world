import Image from "next/image";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import { Anime, IRow } from "../interface";
import { useTheme } from "../lib/zustand";
import { addToFavourite, themeConverter } from "../helper/functions";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";
import { v4 } from "uuid";
import SidebarAnime from "./SidebarAnime";

interface IProps extends IRow {
  limit: number;
  loading: boolean;
}

const SidebarRow = ({ items, title, limit, loading }: IProps) => {
  const { theme } = useTheme();
  const { data:session,status } = useSession()
  const router = useRouter();
  console.log(session);


  // const addToFavourite = async(title:string,imageUrl:string,mal_id:number,email:any) => {
  //     try {
  //         await toast.promise(addFavorite(title,imageUrl,mal_id,email),{
  //             loading:"Saving to favorite...",
  //             success:"Saving anime successfully",
  //             error:(err)=>`Something went wrong: ${err.toString()}`
  //         });
  //     } catch(err) {
  //         console.log(err)
  //     }

  // }

  return (
    <>
      {loading ? (
        <Skeleton count={limit} height={"50px"} style={{ margin: "8px 0" }} />
      ) : (
        <section >
          <div
            className={`flex justify-between items-center text-white p-2 `}
          >
            <h1 className="text-lg font-bold">{title}</h1>
            <span className={`text-primary  font-bold `}>
              <Link href="/">More</Link>
            </span>
          </div>
          <div className={`  p-4 border-primary border  rounded-sm`}>
            {items?.slice(0, limit).map((anime, i) => (
              <SidebarAnime  anime={anime} key={v4()} i={i} />
            ))}
          </div>
        </section>
      )}
    </>
  );
};

export default SidebarRow;
