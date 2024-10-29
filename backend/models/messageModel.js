const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    
    senderId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },

    receiverId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
    },
    
    message : {
        type : String
    }


});

module.exports = mongoose.model("Message", userSchema);
