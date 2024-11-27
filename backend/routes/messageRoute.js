const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {sendChatItems, sendMessage, receiveMessage, searchUser} = require("../controllers/messageController")
const router = express.Router();

router.route("/").get(authMiddleware,sendChatItems);
router.route("/sendmessage/:id").post(authMiddleware,sendMessage);
router.route("/receivemessage/:id").get(authMiddleware,receiveMessage);
router.route("/search").get(authMiddleware, searchUser)

module.exports = router;