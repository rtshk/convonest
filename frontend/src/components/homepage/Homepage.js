import React, { useEffect, useState } from "react";
import MainArea from "./MainArea";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Profile from "./Profile";
import useSocketMessage from '../../hooks/useSocketMessage';

const Homepage = () => {
  const navigate = useNavigate();
  const { authUser } = useSelector((store) => store.user);
  const [viewProfile, setviewProfile] = useState(false);
  useSocketMessage();
  const profileHandler = () => {
    if (!viewProfile) {
      setviewProfile(true);
    } else {
      setviewProfile(false);
    }
  };

  useEffect(() => {
    if (!authUser) {
      navigate("/login");
    }
  }, [authUser]);

  return (
    <div className="min-h-screen w-full flex overflow-hidden bg-customGray">
      <MainArea />
      {viewProfile ? (
        <Profile viewProfile={viewProfile} profileHandler={profileHandler} />
      ) : (
        <Sidebar viewProfile={viewProfile} profileHandler={profileHandler} />
      )}
    </div>
  );
};

export default Homepage;
