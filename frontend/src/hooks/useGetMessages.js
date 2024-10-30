import React, { useEffect } from 'react'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setMessages } from '../redux/messageSlice';

const useGetMessages = () => {
    const {currentUser} = useSelector(store => store.user);
    const dispatch = useDispatch();
    useEffect(()=>{
    const fetchMessages = async () => {
       try {
        if (!currentUser?._id) return;
        const res = await axios.get(`http://localhost:8000/user/homepage/receivemessage/${currentUser?._id}`, {withCredentials: true});
        dispatch(setMessages(res.data?.messages));
       } catch (error) {
        console.log(error);
       }
    }
    fetchMessages();
  }, [currentUser, dispatch]);
}

export default useGetMessages