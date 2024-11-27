import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import { setSearchedUserList } from '../redux/userSlice';

const useSearchedUser = () => {
  const {searchedUser} = useSelector(store => store.user);
  const dispatch = useDispatch();
  useEffect(()=>{
    const getSearchedUser = async() => {
        try {
            const gotUser = await axios.get("http://localhost:8000/user/homepage/search",{
                params: { searchedUser }, // Pass the search query
                withCredentials: true,   // Include credentials (cookies)
              })
              dispatch(setSearchedUserList(gotUser.data));
        } catch (error) {
            console.log(error);
            dispatch(setSearchedUserList([]));
            
        }
    }
    getSearchedUser();
  },[searchedUser])

}

export default useSearchedUser