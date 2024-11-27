import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

const Signup = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();
  const {authUser} = useSelector(store => store.user);

  const formBoxVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: [1, 1.02, 1],
      transition: { duration: 0.7, ease: "easeInOut" },
    },
  };

  const inputBoxVariants = {
    hover: { scale: 1.02 },
  };

  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  const headingVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1.5, ease: "easeInOut" } },
  };
  const createAccoutVariants = {
    hover: { scale: 1.02 },
  };
  useEffect(()=>{
    if(authUser != null){
      navigate('/')
    }
  })
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(user.password.length < 8){
        toast.error("password must be 8 characters long");
      }
      else{
        const res = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/user/authentication/signup`,
          user
        );
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="min-h-screen flex flex-col">
          <h1 className="text-[40px] px-10 py-3 bg-lightGray">
            <motion.div
              variants={headingVariants}
              initial="hidden"
              animate="visible"
            >
              <p className="text-beige inline">convo</p>
              <p className="text-maroon inline">Nest</p>
            </motion.div>
          </h1>
          <div className="flex-1 flex items-center justify-center bg-lightGray">
            <motion.div
              className="w-[400px] bg-maroon p-8 rounded-[50px]"
              variants={formBoxVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="w-full flex flex-col ">
                <h1 className="text-white text-2xl mb-6">Signup</h1>
                <div className="w-full mb-4">
                  <label
                    className="block text-white px-2 mb-2"
                    htmlFor="username"
                  >
                    Username
                  </label>
                  <motion.input
                    className="w-full px-3 py-4 rounded-[30px] bg-beige outline-none"
                    type="text"
                    placeholder="Username"
                    id="username"
                    value={user.username}
                    onChange={(e) => {
                      setUser({ ...user, username: e.target.value });
                    }}
                    variants={inputBoxVariants}
                    whileHover="hover"
                  />
                </div>
                <div className="w-full mb-4">
                  <label className="block text-white mb-2" htmlFor="password">
                    Password
                  </label>
                  <motion.input
                    className="w-full px-3 py-4 rounded-[30px] bg-beige outline-none"
                    type="password"
                    placeholder="Password"
                    id="password"
                    value={user.password}
                    onChange={(e) => {
                      setUser({ ...user, password: e.target.value });
                    }}
                    variants={inputBoxVariants}
                    whileHover="hover"
                  />
                </div>
                <div className="w-full mb-4">
                  <label
                    className="block text-white mb-2"
                    htmlFor="confirmPassword"
                  >
                    Confirm Password
                  </label>
                  <motion.input
                    className="w-full px-3 py-4 rounded-[30px] bg-beige outline-none"
                    type="password"
                    placeholder="Confirm Password"
                    id="confirmPassword"
                    value={user.confirmPassword}
                    onChange={(e) => {
                      setUser({ ...user, confirmPassword: e.target.value });
                    }}
                    variants={inputBoxVariants}
                    whileHover="hover"
                  />
                </div>
                <div className="w-full  flex justify-between">
                  <div className="flex items-center">
                    <p className="text-beige">
                      {" "}
                      already have an account?
                      <Link to={"/login"}>
                        <motion.p
                          className="inline-block px-1 hover: cursor-pointer hover:text-white"
                          variants={createAccoutVariants}
                          whileHover={"hover"}
                        >
                          login
                        </motion.p>
                      </Link>
                    </p>
                  </div>
                  <motion.button
                    className="text-beige bg-lightGray py-3 px-5 mt-3 rounded-[20px] hover:bg-black"
                    type="submit"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    Signup
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Signup;
