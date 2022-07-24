import React from 'react'
import { motion } from 'framer-motion'

interface IBtn {
    handleClick:()=>void;
    string:string;
    scrollToTop?:()=>void;
    unsetScroll?:()=>void;

}

const LoadMoreBtn = (props:IBtn) => {
    
  return (
        <motion.button 
            className='bg-blue-200 shadow-md z-50  px-4 py-2 rounded-lg font-bold text-blue-500 mt-2' 
            onClick={()=>{
                props.handleClick();
                props.unsetScroll?.();
                props.scrollToTop?.();
            }}
            whileHover={{
                scale: 1.1,
                
            }}
            whileTap={{ scale: 0.9 }}
        >
             {props.string}
        </motion.button>
   
  


  )
}

export default LoadMoreBtn