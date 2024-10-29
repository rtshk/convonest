const User = require("../models/userModel");
const Conversation = require("../models/convoModel");
const Message = require("../models/messageModel");

exports.sendChatItems = async (req, res) => {
  try {
    const userId = req.id;
    const chatItems = await User.find({ _id: { $ne: userId } }).select(
      "-password"
    );
    res.status(200).json(chatItems);
  } catch (error) {
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
    await Promise.all([gotConversation.save(), newMessage.save()]);

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
    console.log("error while running receive message control",error);
  }
};
