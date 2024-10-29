const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {sendChatItems, sendMessage, receiveMessage} = require("../controllers/messageController")
const router = express.Router();

router.route("/").get(authMiddleware,sendChatItems);
router.route("/sendmessage/:id").post(authMiddleware,sendMessage);
router.route("/receivemessage/:id").get(authMiddleware,receiveMessage);

module.exports = router;