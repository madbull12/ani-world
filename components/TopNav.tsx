import React from 'react'
import { v4 } from 'uuid';

type Link = {
    name:string;
    slug:string;
}

interface IProps {
    filter:string;
    setFilter:(values:string)=>void;
}

const TopNav = ({ filter,setFilter }:IProps) => {

    const links:Link[] =[{
        name:"Top airing",
        slug:"airing"
    },{
        name:"Top upcoming",
        slug:"upcoming"
    },{
        name:"Most Popular",
        slug:"bypopularity"
    },{
        name:"Most Favorited",
        slug:"favorite"
    }]
  return (
    <ul className='flex items-center sm:gap-x-2 gap-x-1'>
        {links.map((link:Link)=>(
            <li className={`${link.slug === filter ? "text-white px-2 py-1 bg-blue-500" : "text-blue-500"} cursor-pointer `}  onClick={()=>setFilter(link.slug)}  key={v4()}>{link.name}</li>
        ))}
    </ul>
  )
}

export default TopNav