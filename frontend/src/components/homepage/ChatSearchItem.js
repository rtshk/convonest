import React from "react";

const ChatSearchItem = () => {
  return (
    <form className="w-full flex justify-center mb-2 pr-3">
      <input
        className="w-full px-3 py-2 rounded-[30px] bg-beige outline-none"
        placeholder="Search"
        type="text"
      />
    </form>
  );
};

export default ChatSearchItem;
