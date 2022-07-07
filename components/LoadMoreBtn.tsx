import React from 'react'
import { motion } from 'framer-motion'

interface IBtn {
    handleClick:()=>void;
    string:string
}

const LoadMoreBtn = ({
    handleClick,
    string
}:IBtn) => {
  return (
  <motion.button 
    className='bg-blue-200 shadow-md  px-4 py-2 rounded-lg font-bold text-blue-500 mt-2' 
    onClick={handleClick}
    whileHover={{
        scale: 1.1,
        
    }}
    whileTap={{ scale: 0.9 }}
>
    {string}
</motion.button>
  )
}

export default LoadMoreBtn