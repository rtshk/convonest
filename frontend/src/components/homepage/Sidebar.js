import React from "react";
import ChatList from "./ChatList";
import ChatSearchItem from "./ChatSearchItem";
import { motion } from "framer-motion";

const Sidebar = ({profileHandler}) => {
  const chatInfoVariants = {
    initial: { opacity: 0, scale: 0.9 },
    final: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.2, ease: "easeInOut" },
    },
  };
  return (
    <div className="max-h-screen w-[25%] min-w-[300px] bg-customGray flex flex-col overflow-hidden">
      <motion.div
        className="flex flex-col h-[98%] bg-lightGray rounded-[20px] m-2 p-3"
        variants={chatInfoVariants}
        initial="initial"
        animate="final"
      >
        <h1 className="text-[40px] mb-3 bg-lightGray flex justify-between">
          <div>
            <p className="text-beige inline">convo</p>
            <p className="text-maroon inline">Nest</p>
          </div>
          <div onClick={profileHandler} className="pr-6 flex items-center opacity-50 hover:opacity-100 cursor-pointer">
            <img className="h-[40px]" src="https://avatar.iran.liara.run/public/boy"/>
          </div>
        </h1>
        <ChatSearchItem />
        <ChatList />
      </motion.div>
    </div>
  );
};

export default Sidebar;
