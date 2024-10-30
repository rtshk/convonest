const express = require("express");
const env = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const userRoute = require("./routes/userRoute");
const messageRoute = require("./routes/messageRoute");
const cookieParser = require("cookie-parser");
const { app, server } = require("./socket/socket");
//setting up middlewares
app.use(
  cors({
    origin: "http://localhost:3000", // Replace with your frontend URL
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

//initalizing variables
env.config({});
const PORT = process.env.PORT || 8000;

//connecting to MongoDB
connectDB();

// routes
app.use("/user/authentication", userRoute);
app.use("/user/homepage", messageRoute);

server.listen(PORT, () => {
  console.log(`server listening to port ${PORT}`);
});
