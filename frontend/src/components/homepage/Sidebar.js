import React from "react";
import ChatList from "./ChatList";
import ChatSearchItem from "./ChatSearchItem";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  setAuthUser,
  setChatItems,
  setCurrentUser,
} from "../../redux/userSlice";
import { setMessages } from "../../redux/messageSlice";
import { toast } from "react-toastify";
import {motion} from "framer-motion"

const Sidebar = () => {
  const dispatch = useDispatch();
  const buttonVariants = {
    hover: { scale: 1.05,}, // Slight scale and color change on hover
    tap: { scale: 0.95 }, // Slight shrink on tap
  };
  const handleLogout = async () => {
    try {
      const res = await axios.post(
        `http://localhost:8000/user/authentication/logout`,
        {},
        { withCredentials: true }
      );
      toast(res.data.message);
      dispatch(setAuthUser(null));
      dispatch(setChatItems([]));
      dispatch(setCurrentUser(null));
      dispatch(setMessages([]));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="max-h-screen w-[25%] bg-customGray flex flex-col overflow-hidden">
      <div className="flex flex-col h-[98%] bg-lightGray rounded-[20px] m-2 p-3">
        <h1 className="text-[40px] mb-3 bg-lightGray">
          <p className="text-beige inline">convo</p>
          <p className="text-maroon inline">Nest</p>
        </h1>
        <ChatSearchItem />
        <ChatList />
        <div className="flex justify-end  ">
          <motion.button
            className="bg-beige rounded-[20px] p-2"
            onClick={handleLogout}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            Logout
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
