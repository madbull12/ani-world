import { useState } from "react"
import { Anime, IRow } from "../interface"
import Poster from "./Poster"



const Row = ({ items,title }:IRow) => {
    //view all state to view all of the anime
  const [viewAll,setViewAll] = useState<boolean>(false)

  return (
    <section className="space-y-4">
        <div className="flex justify-between items-center gap-x-2">
            <h1 className="font-black text-xl text-gray-700 whitespace-nowrap capitalize">{title}</h1>
            <div className="h-[2px] w-full bg-gray-200"></div>
            <button className="whitespace-nowrap font-black text-sm  text-[#007CEF] uppercase" onClick={()=>setViewAll(!viewAll)}>
                {viewAll ? "View Less" : "View All"}
            </button>
        </div>
        <div className="grid  gap-4 min-w-0 overflow-x-scroll  auto-cols-max grid-flow-col scrollbar-hide md:scrollbar-default  overflow-y-hidden">
            {items?.slice(0,viewAll ? items.length : 8).map((anime)=>(
                <div key={anime.mal_id} className="rounded-lg overflow-hidden">
                    <Poster  anime={anime} />

                </div>
            ))}
        </div>
    
    </section>

  )
}

export default Row