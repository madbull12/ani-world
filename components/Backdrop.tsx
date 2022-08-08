import React, { ReactNode } from 'react'
import { motion } from 'framer-motion'


const Backdrop = ({ color }:{
   color?:string,

}) => {
  return (
    <div className={`backdrop bg-[#007bef93] z-[40]  `}>
    </div>
  )
}

export default Backdrop