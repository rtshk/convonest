const { Server } = require("socket.io");
const http = require("http");
const express = require("express");

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET"],
  },
});
const userIdToSocketId = (userId) => {
  return userSocketMap[userId];
}

const userSocketMap = {};


io.on("connection", (socket) => {
  console.log("User Connected", socket.id);
  const userId = socket.handshake.query.userId;
  if (userId != undefined) {
    userSocketMap[userId] = socket.id;
  }

  io.emit("onlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("user disconneted", socket.id);
    delete userSocketMap[userId];
    io.emit("onlineUsers", Object.keys(userSocketMap));
  });
});

module.exports = { app, io, server, userIdToSocketId };
