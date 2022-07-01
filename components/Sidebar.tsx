import React, { useEffect, useState } from 'react'
import { Anime } from '../interface'
import { getAnimeByFilter } from '../pages/api/anime';
import SidebarRow from './SidebarRow'

export interface ISidebar {
    topAiring:Anime[];
    topUpcoming:Anime[]
}
const Sidebar = () => {
  const [values,setValues] = useState({
    loading:false,
    error:null,
    topAiring:[],
    topUpcoming:[]
  });

  useEffect(()=>{
    const fetchSidebarAnime = async() => {
      setValues({
        ...values,loading:true
      })
      try {
        const _topAiring = await getAnimeByFilter("airing");
        const _topUpcoming = await getAnimeByFilter("upcoming");
  
        setValues({
          ...values,
          topAiring:_topAiring,
          topUpcoming:_topUpcoming
  
        });
      } catch(err:any) {
        setValues({
          ...values,
          error:err
        })
      }
    
    }

    fetchSidebarAnime();
  },[])

  return (
    <aside className='absolute right-0 top-0 p-4  w-[420px] space-y-6'>

        <SidebarRow items={values?.topAiring} title="Top Airing Anime" />
        <SidebarRow items={values?.topUpcoming} title="Top Upcoming Anime" />
    </aside>
  )
}

export default Sidebar