import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../redux/userSlice";
import { motion } from "framer-motion";

const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Animation Variants
  const formBoxVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: [1,1.02,1],
      transition: { duration: 0.6, ease: "easeInOut" },
    },
  };

  const inputVariants = {
    hover: { scale: 1.02, borderColor: "#e0e0e0" }, // Minimal scale and border color change
  };

  const buttonVariants = {
    hover: { scale: 1.05,}, // Slight scale and color change on hover
    tap: { scale: 0.95 }, // Slight shrink on tap
  };

  const createAccoutVariants = {
    hover : {scale : 1.02}
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:8000/user/authentication/login`,
        user, {withCredentials : true}
      );
      toast("Logged In sucessfully")
      navigate("/");
      dispatch(setAuthUser(res.data));
    } catch (error) {
      toast(error.response.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="min-h-screen flex flex-col">
        {/* Title */}
        <h1 className="text-[40px] px-10 py-3 bg-lightGray">
          <p className="text-beige inline">convo</p>
          <p className="text-maroon inline">Nest</p>
        </h1>

        <div className="flex-1 flex items-center justify-center bg-lightGray">
          <motion.div
            className="w-[400px] bg-maroon p-8 rounded-[50px]"
            variants={formBoxVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="w-full flex flex-col justify-center mx-auto">
              <h1 className="text-white text-2xl mb-6">Login</h1>

              {/* Username Input */}
              <div className="w-full mb-4">
                <label className="block text-white px-2 mb-2" htmlFor="username">
                  Username
                </label>
                <motion.input
                  className="w-full px-3 py-4 rounded-[30px] bg-beige outline-none"
                  type="text"
                  placeholder="Username"
                  id="username"
                  value={user.username}
                  onChange={(e) => setUser({ ...user, username: e.target.value })}
                  variants={inputVariants}
                  whileHover="hover"
                />
              </div>

              {/* Password Input */}
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
                  onChange={(e) => setUser({ ...user, password: e.target.value })}
                  variants={inputVariants}
                  whileHover="hover"
                />
              </div>

              {/* Submit Button with Hover Animation */}
              <div className="w-full flex justify-between">
                <div className="flex items-center">
                 <p className="text-beige"> new user?<Link to={"/signup"}><motion.p className="inline-block px-1 hover: cursor-pointer hover:text-white" variants={createAccoutVariants} whileHover={"hover"}>create account</motion.p></Link></p>
                </div>
                <motion.button
                  type="submit"
                  className="text-beige bg-lightGray py-3 px-5 mt-3 rounded-[20px] hover:bg-black"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  Login
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </form>
  );
};

export default Login;
