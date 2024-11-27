import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    authUser: null,
    chatItems: null,
    currentUser: null,
    onlineUsers: null,
    searchedUser: "",
    searchedUserList: [],
  },

  reducers: {
    setAuthUser: (state, action) => {
      state.authUser = action.payload;
    },

    setChatItems: (state, action) => {
      state.chatItems = action.payload;
    },

    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    setOnlineUsers : (state, action) => {
        state.onlineUsers = action.payload;
    },
    setSearchedUser : (state, action) => {
      state.searchedUser = action.payload;
    },
    setSearchedUserList : (state, action) => {
      state.searchedUserList = action.payload;
    }
  },
});

export const { setAuthUser, setChatItems, setCurrentUser, setOnlineUsers, setSearchedUser, setSearchedUserList } = userSlice.actions;
export default userSlice.reducer;
