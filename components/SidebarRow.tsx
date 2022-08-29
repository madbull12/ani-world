import Image from "next/image";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import { Anime, IRow } from "../interface";
import { useTheme } from '../lib/zustand';
import { useUser } from "@auth0/nextjs-auth0";
import { addToFavourite } from "../helper/functions";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

interface IProps extends IRow {
    limit:number;
    loading:boolean;
}

const SidebarRow = ({ items,title,limit,loading }: IProps) => {
    const { theme } = useTheme();
    const { user } = useUser();
    const router = useRouter();

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
        <Skeleton count={limit} height={"50px"} style={{ margin:"8px 0" }} />
    ):(
    <section>
        <div className={`flex justify-between items-center bg-${theme}-100 p-2 `}>
            <h1 className="text-lg font-bold">{title}</h1>
            <span className={`text-${theme}-500 font-bold `}>
                <Link href="/">More</Link>

            </span>
        </div>
        <div className={`space-y-4 p-4 bg-${theme}-50`}>
            {items?.slice(0,limit).map((anime,i)=>(
                <Link key={anime.mal_id} href={`/anime/${anime.mal_id}`}>
                    <div  className="flex gap-x-2 cursor-pointer ">
                        <span className="font-bold text-2xl text-gray-500">{i+1}</span>
                        <Image src={anime.images.jpg.image_url} width={80} height={90} alt={anime.title} />
                        <div>
                            <div>
                                <h1 className={`font-bold text-${theme}-500`} >{anime.title}</h1>
                                <p className="text-gray-500 text-sm">{anime.type}, {anime.episodes===null ? 0 : anime.episodes} eps, scored {anime.score === null ? "N/A" : anime.score}</p>
                                <p className="text-gray-500 text-sm">Members: {anime.members.toLocaleString()}</p>

                            </div>
                        </div>
                        <button  className={`self-start justify-self-end ml-auto  font-semibold text-${theme}-500`} onClick={(e)=>{
                            e.stopPropagation()
                            user 
                            ? 
                            addToFavourite(anime.title,anime.images.jpg.large_image_url,anime.mal_id,user?.email)
                            :
                            router.push("/api/auth/login")
                        }} >add</button>
                    </div>
                </Link>
                
            ))}
        </div>
    </section>
    )}
    
    </>
    
  )
}

export default SidebarRow