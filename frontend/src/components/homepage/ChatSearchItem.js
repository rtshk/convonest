import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchedUser } from "../../redux/userSlice";

const ChatSearchItem = () => {
  const [user, setUser] = useState("");
  const dispatch = useDispatch();
  dispatch(setSearchedUser(user));
  return (
    <form className="w-full flex justify-center mb-2 pr-3">
      <input
        className="w-full px-3 py-2 rounded-[30px] bg-beige outline-none"
        placeholder="Search"
        type="text"
        value={user}
        onChange={(e) => setUser(e.target.value)}
      />
    </form>
  );
};

export default ChatSearchItem;
