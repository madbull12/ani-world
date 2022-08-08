import Image from "next/image";
import Link from "next/link";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { Anime, IRow } from "../interface";
import { useTheme } from '../lib/zustand';


interface IProps extends IRow {
    limit:number;
    loading:boolean;
}

const SidebarRow = ({ items,title,limit,loading }: IProps) => {
    const { theme } = useTheme();
  return (
    <>
    {loading ? (
        <Skeleton count={limit} height={"50px"} style={{ margin:"8px 0" }} />
    ):(
    <section>
        <div className="flex justify-between items-center bg-blue-100 p-2 ">
            <h1 className="text-lg font-bold">{title}</h1>
            <span className=" font-bold" style={{ color:theme }}>
                <Link href="/">More</Link>

            </span>
        </div>
        <div className="space-y-4 p-4 bg-blue-50">
            {items?.slice(0,limit).map((anime,i)=>(
                <Link key={anime.mal_id} href={`/anime/${anime.mal_id}`}>
                    <div  className="flex gap-x-2 cursor-pointer ">
                        <span className="font-bold text-2xl text-gray-500">{i+1}</span>
                        <Image src={anime.images.jpg.image_url} width={80} height={90} alt={anime.title} />
                        <div>
                            <div>
                                <h1 className="font-bold " style={{ color:theme }}>{anime.title}</h1>
                                <p className="text-gray-500 text-sm">{anime.type}, {anime.episodes===null ? 0 : anime.episodes} eps, scored {anime.score === null ? "N/A" : anime.score}</p>
                                <p className="text-gray-500 text-sm">Members: {anime.members.toLocaleString()}</p>

                            </div>
                        </div>
                        <button className="self-start justify-self-end ml-auto  font-semibold" style={{ color:theme }}>add</button>
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