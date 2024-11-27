import axios from 'axios'
import React, { useEffect } from 'react'
import {useDispatch, useSelector} from "react-redux"
import { setChatItems } from '../redux/userSlice'

const useChatItems = () => {
  const dispatch = useDispatch();
  const {searchedUser} = useSelector(store => store.user);
  useEffect(()=>{
    const fetchChatItems = async () => {
      try {
        const chatItems = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/homepage/`,{withCredentials:true});
        dispatch(setChatItems(chatItems.data));
      } catch (error) {
          console.log(error);
      }
    }
    fetchChatItems();
  },[searchedUser])
}

export default useChatItems