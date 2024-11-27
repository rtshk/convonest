const User = require("../models/userModel");
const Conversation = require("../models/convoModel");
const Message = require("../models/messageModel");
const { io, userIdToSocketId } = require("../socket/socket");

exports.sendChatItems = async (req, res) => {
  try {
    const userId = req.id;
    const chatItems = await Conversation.find({
      participants: userId,
    }).populate("participants");
    const otherUsers = chatItems.map((conversation) => {
      const otherUser = conversation.participants.filter((otherUserId) => {
        return userId != otherUserId._id;
      });
      return otherUser[0];
    });
    res.status(200).json(otherUsers);
  } catch (error) {
    console.log("helo")
    console.log(error);
  }
};

exports.sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const senderId = req.id;
    const receiverId = req.params.id;

    let gotConversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!gotConversation) {
      gotConversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = await Message.create({
      message,
      senderId,
      receiverId,
    });

    if (newMessage) {
      gotConversation.messages.push(newMessage._id);
    }
    const sender = await User.findOne({_id : senderId})

    await Promise.all([gotConversation.save(), newMessage.save()]);
    const receiverSocketId = userIdToSocketId(receiverId);
    // console.log("socket",receiverSocketId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage, sender);
    }
    return res.status(201).json({ newMessage });
  } catch (error) {
    console.log(error);
  }
};

exports.receiveMessage = async (req, res) => {
  try {
    const receiverId = req.id;
    const senderId = req.params.id;

    const getConversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    }).populate("messages");

    return res.status(200).json(getConversation);
  } catch (error) {
    console.log("error while running receive message control", error);
  }
};
exports.searchUser = async (req, res) => {
  try {
    const userId = req.id;
    const { searchedUser } = req.query;
    if(!searchedUser) return res.status(200).json([]);

    const user = await User.find({ username: {$regex : `^${searchedUser}`} });
    if (user.length == 0) {
      return res.status(404).json({ message: "no user found" });
    }
    const filteredUser = user.filter((user)=>{ return user._id != userId}); 

    return res.status(200).json(filteredUser);
  } catch (error) {
    console.log(error)
  }
};
