import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const Message = ({ currentUser, message }) => {
  if (!currentUser || !message) return null;
  const isSender = message?.senderId === currentUser?._id;

  return (
    <div
      className={`my-3 mx-5 flex ${
      isSender? "justify-start" : "justify-end"
      }`}
    >
      <p
        className={`max-w-[300px] rounded-[20px] inline-block p-2 bg-${
          message.senderId === currentUser?._id ? "hoverRed" : "beige"
        } text-black`}
      >
        {message?.message}
      </p>
    </div>
  );
};  

export default Message;
