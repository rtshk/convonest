import React from "react";
import Header from "./Header";
import MessageArea from "./MessageArea";
import MessageInput from "./MessageInput";
import { useSelector } from "react-redux";
import useGetMessages from "../../hooks/useGetMessages";

const MainArea = () => {
  useGetMessages();
  const { currentUser } = useSelector((store) => store.user);
  const { messages = [] } = useSelector((store) => store.messages);
  return (
    <div className="min-h-screen max-h-screen flex flex-col justify-between w-[75%] rounded-[20px] px-2 py-3">
      {currentUser ? (
        <>
          <Header currentUser={currentUser} />
          <MessageArea  currentUser={currentUser} messages={messages} />
          <MessageInput currentUser={currentUser} messages={messages} />
        </>
      ) : (
        <>
          <div className="text-beige h-full w-full flex justify-center items-center text-lg" ><p>Hey!!, Let's start a conversation</p></div>
        </>
      )}
    </div>
  );
};

export default MainArea;
