import React from 'react'
import { Anime } from '../../../interface'
import { getSeasonNowAnime } from '../../api/anime'

const SeasonPage = ({ data }:any) => {
  return (
    <div>
        {data.map((anime:Anime)=>(
            <h1 key={anime.mal_id}>{anime.title}</h1>
        ))}
    </div>
  )
}

export const getStaticProps = async()=>{
    const data = await getSeasonNowAnime();


    return {
        props:{
            data
        }
    }
}

export default SeasonPage