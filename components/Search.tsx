import BackdropModal from "./BackdropModal";
import { motion } from 'framer-motion'
import { useOpenSearch, useSetBodyScroll } from "../lib/zustand";

const dropIn = {
    hidden:{
        y:"-100vh",
        opacity:0,
    },
    visible:{
        y:"0",
        opacity:1,
        transition: {
            duration:0.1,
            type:"spring",
            damping:25,
            stiffness:500
        }
    },
    exit:{
        y:"100vh",
        opacity:0
    }
}

const Search = () => {

    const { setScroll } = useSetBodyScroll(); 
    const { closeSearch } = useOpenSearch();

   

   return (
       <BackdropModal
           onClick={()=>{
               closeSearch();
               setScroll();
           }}

       >           
        <motion.div
            className='text-white p-4 bg-blue-600 relative max-w-[500px] rounded-lg'
            onClick={(e)=>e.stopPropagation()}
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit='exit'
        >
            <input type="text" className="" placeholder="Search anime..." />

            </motion.div>
       </BackdropModal>
   )
}

export default Search