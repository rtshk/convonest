import React, { useEffect } from 'react';
import MainArea from './MainArea';
import Sidebar from './Sidebar';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {

  const navigate = useNavigate();
  const {authUser} = useSelector(store => store.user)

  useEffect(()=>{
    if(!authUser){
      navigate("/login");
    }
  },[authUser])

  return (
    <div className='min-h-screen flex overflow-hidden bg-customGray'>
      <MainArea />
      <Sidebar />
    </div>
  );
};

export default Homepage;
