import React, { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface IProps {
  children: ReactNode;
  onClick: () => void;
}

const BackdropModal = ({ children, onClick }: IProps) => {
  return (
    <>
      <motion.div
        className="backdrop bg-[#000000e1] "
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
