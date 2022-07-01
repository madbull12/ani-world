import Image from "next/image";
import Link from "next/link";
import { Anime, IRow } from "../interface";


// interface IProps {
//     items:Anime[];
//     title:string
// }

const SidebarRow = ({ items,title }:IRow) => {
  return (
    <section >
        <div className="flex justify-between items-center bg-blue-100 p-2">
            <h1 className="text-lg font-bold">{title}</h1>
            <span className="text-blue-600 font-bold">
                <Link href="/">More</Link>

            </span>
        </div>
        <div className="space-y-4 p-4 bg-blue-50">
            {items.slice(0,5).map((anime,i)=>(
                <div key={anime.mal_id} className="flex gap-x-2 ">
                    <span className="font-bold text-2xl text-gray-500">{i+1}</span>
                    <Image src={anime.images.jpg.image_url} width={80} height={90} alt={anime.title} />
                    <div>
                        <div>
                            <h1 className="font-bold text-blue-600">{anime.title}</h1>
                            <p className="text-gray-500 text-sm">{anime.type}, {anime.episodes===null ? 0 : anime.episodes} eps, scored {anime.score === null ? "N/A" : anime.score}</p>
                            <p className="text-gray-500 text-sm">Members: {anime.members.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>

                        </div>
                    </div>
                    <button className="self-start justify-self-end ml-auto text-blue-600 font-semibold">add</button>
                </div>
            ))}
        </div>
    </section>
  )
}

export default SidebarRow