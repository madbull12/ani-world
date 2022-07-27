import Link from "next/link"
import { IoMenu, IoSearchCircle } from 'react-icons/io5'
import { useSearch, useSetBodyScroll } from "../lib/zustand"
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from "react"

const showIn = {
    hidden:{
        opacity:0
    },
    visible:{
        opacity:1,
        transition: {
            duration:0.1,
          
        }
    },
    exit:{
        opacity:0
    }
}


const Header = () => {
    const { openSearch } = useSearch();
    const { unsetScroll } = useSetBodyScroll();
    const [isHovered,setIsHovered] = useState<boolean>();

    const d =new Date();
    let month = d.getMonth();
    const currentYear = d.getFullYear();
   const currentSeason = getSeason(month+=1);



    function getSeason(month:number) {

        if (month >= 3 && month <= 5) {
            return 'spring';
        }
    
        if (month >= 6 && month <= 8) {
            return 'summer';
        }
    
        if (month >= 9 && month <= 11) {
            return 'fall';
        }
    
        // Months 12, 01, 02
        return 'winter';
    }

  return (
    // header component 
    <header className=" p-4 text-white bg-blue-500 " >
        <div className="max-w-7xl mx-auto">
            <nav className="flex justify-between items-center">
                <span className="font-bold text-2xl whitespace-nowrap">
                    <Link href="/" >アニワルド</Link>

                </span>
                <ul className="space-x-2  items-center hidden md:flex">
                    <div className="relative" onMouseOver={()=>setIsHovered(true)} onMouseLeave={()=>setIsHovered(false)}>
                        <Link href="/">
                            Anime
                        </Link>
                        <AnimatePresence
                            initial={false}
                            exitBeforeEnter={true}
                            onExitComplete={()=>null}

                        >
                            {isHovered && (
                                <motion.div 
                                    variants={showIn}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    className="absolute rounded-md  text-sm flex flex-col shadow-md whitespace-nowrap -bottom-20 z-[999] text-blue-500 font-semibold bg-blue-50"
                                >
                                    <div className="hover:bg-blue-500 px-4 py-2 hover:text-white cursor-pointer ease-in duration-100 transition-all ">
                                        <Link href="/top-anime" className="hover:text-blue-400" >Top Anime</Link>
        
                                    </div>
                                    <div className="px-4 py-2 hover:bg-blue-500 hover:text-white cursor-pointer ease-in duration-100 transition-all ">
                                        <Link href={`/anime/season/${currentYear}/${currentSeason}`}  >Seasonal Anime</Link>
        
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                        
              
                   
                    </div>
               
                    <Link href="/">
                        Manga
                    </Link>
                    <IoSearchCircle className="text-3xl cursor-pointer"  onClick={()=>{
                        openSearch()
                        unsetScroll()
                        window.scrollTo(0, 0)
                        
                    }} />
                </ul>
                <IoMenu className="md:hidden text-xl cursor-pointer" />
                

            </nav>

        </div>
    </header>

  )
}

export default Header