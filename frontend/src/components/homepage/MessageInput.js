import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../../redux/messageSlice";
import { motion } from "framer-motion";

const MessageInput = ({ currentUser, messages }) => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const buttonVariants = {
    tap: { scale: 0.95 }, // Slight shrink on tap
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (message) {
        const res = await axios.post(
          `http://localhost:8000/user/homepage/sendmessage/${currentUser?._id}`,
          { message },
          { withCredentials: true }
        );
        dispatch(setMessages([...messages, res?.data?.newMessage]));
        setMessage("");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form
      className="bg-lightGray rounded-[20px] h-[60px] flex"
      onSubmit={onSubmitHandler}
    >
      <input
        type="text"
        placeholder="Message"
        className="w-[90%] text-beige bg-lightGray h-full rounded-[20px] px-4 outline-none"
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      />
      <motion.button
        className="bg-beige w-[10%] rounded-[20px]"
        type="submit"
        variants={buttonVariants}
        whileTap={"tap"}
      >
        Send
      </motion.button>
    </form>
  );
};

export default MessageInput;
