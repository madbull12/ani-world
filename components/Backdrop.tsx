import React, { ReactNode } from 'react'

const Backdrop = ({ color }:{ color:string }) => {
  return (
    <div className={`absolute top-0 right-0 left-0 bottom-0 w-full h-full z-40 bg-[#000000be] `}>
      
    </div>
  )
}

export default Backdrop