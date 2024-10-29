import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../../redux/userSlice";
import {motion} from "framer-motion";

const ChatItem = ({ chatItem }) => {
  const dispatch = useDispatch();
  const {currentUser} = useSelector(store => store.user);

  const chatItemVariant = {
    hover : {scale : 1.02},
  }
  const currentUserHandler = (chatItem) => {
    dispatch(setCurrentUser(chatItem));
  };

  return (
    <motion.div
      onClick={() => currentUserHandler(chatItem)}
      className={`w-[95%] flex ${currentUser?.username === chatItem?.username? 'bg-hoverRed' : 'bg-maroon' }  h-[70px] px-4 py-2 rounded-[10px] items-center my-1 hover:bg-hoverRed`}
      variants={chatItemVariant}
      whileHover={"hover"}
    >
      <img className="h-[90%]" src={chatItem?.profilePhoto} />
      <p className="mx-2 text-beige">{chatItem?.username}</p>
    </motion.div>
  );
};

export default ChatItem;
