import {createSlice} from "@reduxjs/toolkit"


const userSlice = createSlice({
    name : "user",
    initialState : {
        authUser : null,
        chatItems : null,
        currentUser: null,
    },

    reducers : {
        setAuthUser :(state,action) => {
            state.authUser = action.payload;
        },

        setChatItems : (state, action) => {
            state.chatItems = action.payload;
        },

        setCurrentUser : (state, action) => {
            state.currentUser = action.payload;
        }
    }
})

export const {setAuthUser, setChatItems, setCurrentUser} = userSlice.actions;
export default userSlice.reducer;