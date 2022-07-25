import BackdropModal from "./BackdropModal";
import { motion } from 'framer-motion'
import { useSearch, useSetBodyScroll } from "../lib/zustand";
import {  IoSearchOutline } from "react-icons/io5";
import { useRouter } from "next/router";
import { useState } from "react";

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
    const { closeSearch } = useSearch();
    const router = useRouter();
    const [term,setTerm] = useState<string>("")

    const handleSubmit = (e:any) => {
        e.preventDefault();
        router.push({
            pathname:"/search",
            query:{ q:term}
        })
    }

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
            <div className="flex items-center space-x-2">
                <IoSearchOutline />
                <form onSubmit={handleSubmit}>
                    <input onChange={(e)=>setTerm(e.target.value)} type="text" className="bg-transparent outline-none border-b p-2  placeholder:text-gray-300" placeholder="Search anime..." />

                </form>
            </div>
      

            </motion.div>
       </BackdropModal>
   )
}

export default Search