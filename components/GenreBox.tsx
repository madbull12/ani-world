import React from 'react'
import { IGenre } from '../interface'

const GenreBox = ({ genre }:{ genre:IGenre }) => {
  return (
    <div className='border-blue-500 cursor-pointer text-blue-500 hover:bg-blue-100 border p-4 rounded-xl'>
        {genre.name}
    </div>
  )
}

export default GenreBox