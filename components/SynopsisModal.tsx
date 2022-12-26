import React from 'react'
import { useSetBodyScroll } from '../lib/zustand';
import BackdropModal from './BackdropModal';
import { motion } from 'framer-motion';
import { IoClose } from 'react-icons/io5';
import { dropIn } from '../lib/animationProperties';
const SynopsisModal = ({
    text,
    handleClose,
  }: {
    text: string;
    handleClose: () => void;
  }) => {
    const { setScroll } = useSetBodyScroll();
  
    return (
      <BackdropModal
        onClick={() => {
          handleClose();
          setScroll();
        }}
      >
        <motion.div
          className={`bg-blue-500 text-white p-4  relative max-w-[500px] mx-auto rounded-lg`}
          onClick={(e) => e.stopPropagation()}
          variants={dropIn}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <h1 className="font-bold text-2xl">Synopsis</h1>
          <p className="text-xs xs:text-sm md:text-base">{text}</p>
          <IoClose
            className="text-2xl absolute top-2 right-2 cursor-pointer"
            onClick={handleClose}
          />
        </motion.div>
      </BackdropModal>
    );
  };
export default SynopsisModal