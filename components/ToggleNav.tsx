import React from 'react'
import { IoClose } from 'react-icons/io5'
import { useSetBodyScroll, useToggle } from '../lib/zustand';
import BackdropModal from './BackdropModal';
import { motion } from 'framer-motion'
import ColorTheme from './ColorTheme';

const ToggleNav = () => {
    const { untoggleNav } = useToggle();
    const { setScroll } = useSetBodyScroll();
    const handleClose = () => {
        untoggleNav();
        setScroll();
    };

    const showIn = {
        show:{
            x:0,
            opacity:1,
            transition:{
                type:"spring",
                damping:20,
                stiffness:200
            }
        },
        hidden:{
            x:"100%",
            opacity:0
        }
    }
     
  return (
 
    <BackdropModal
        onClick={handleClose}
    > 
        <motion.section variants={showIn} initial="hidden" exit="hidden" animate="show" className='min-h-screen fixed top-0 right-0 bg-white min-w-[30vw] z-[999] text-gray-700 p-4 '>
            <IoClose className='text-2xl cursor-pointer' onClick={(e)=>{
                e.stopPropagation();
                handleClose()
            }} />
            <ColorTheme />
        </motion.section>
    </BackdropModal>

  )
}

export default ToggleNav