import React, { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '../lib/zustand'


const Backdrop = ({ color }:{
   color?:string,

}) => {
  const { theme } = useTheme();
  return (
    <div className={`backdrop bg-${theme}-500 opacity-50 z-[40]  `}>
    </div>
  )
}

export default Backdrop