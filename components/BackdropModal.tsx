import React, { ReactNode } from "react";
import { motion } from "framer-motion";

interface IProps {
  children: ReactNode;
  onClick: () => void;
}

const BackdropModal = ({ children, onClick }: IProps) => {
  return (
    <>
      <motion.div
        className="backdrop bg-[#00000076] backdrop-blur-md "
        onClick={onClick}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {children}
      </motion.div>
    </>
  );
};

export default BackdropModal;
