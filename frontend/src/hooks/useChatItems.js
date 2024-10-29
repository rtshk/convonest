import axios from 'axios'
import React, { useEffect } from 'react'
import {useDispatch} from "react-redux"
import { setChatItems } from '../redux/userSlice'

const useChatItems = () => {
  const dispatch = useDispatch();
  useEffect(()=>{
    const fetchChatItems = async () => {
      try {
        const chatItems = await axios.get(`http://localhost:8000/user/homepage/`,{withCredentials:true});
        dispatch(setChatItems(chatItems.data));
      } catch (error) {
          console.log("frontend error", error);
      }
    }
    fetchChatItems();
  },[])
}

export default useChatItems