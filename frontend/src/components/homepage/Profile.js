import React from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  setAuthUser,
  setChatItems,
  setCurrentUser,
} from "../../redux/userSlice";
import { setMessages } from "../../redux/messageSlice";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch } from "react-redux";

const Profile = ({profileHandler}) => {
  const dispatch = useDispatch();
  const { authUser } = useSelector((store) => store.user);

  const profileVariants = {
    initial: { opacity: 0, x: 400 },
    final: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  };
  const buttonVariants = {
    hover: { scale: 1.05 }, // Slight scale and color change on hover
    tap: { scale: 0.95 }, // Slight shrink on tap
  };

  const handleLogout = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/user/authentication/logout`,
        {},
        { withCredentials: true }
      );
      toast.success(res.data.message);
      dispatch(setAuthUser(null));
      dispatch(setChatItems([]));
      dispatch(setCurrentUser(null));
      dispatch(setMessages([]));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-h-screen min-w-[300px] w-[25%] bg-customGray  overflow-hidden">
      <motion.div
        className="flex flex-col h-[98%] bg-lightGray rounded-[20px] m-2 p-5"
        variants={profileVariants}
        initial="initial"
        animate="final"
      >
        <div
          onClick={profileHandler}
          className="text-beige flex items-center opacity-50 hover:opacity-100 cursor-pointer"
        >goBack</div>
        <h1>
          <div className="text-beige text-[40px]">Profile</div>
        </h1>
        <div className="flex flex-col justify-start items-center">
          <img src={authUser?.profilePhoto} className="h-[140px] m-[30px]" />
        </div>
        <div className="mb-[20px]">
          <h2 className="text-gray-400">User name</h2>
          <div>
            <p className="text-white">{authUser?.username}</p>
            <button></button>
          </div>
        </div>

        
        <motion.button
          className="bg-beige rounded-[20px] p-2"
          onClick={handleLogout}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          Logout
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Profile;
