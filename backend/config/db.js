const mongoose = require("mongoose");

const connectDB = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("connected to MongoDB sucessfully");
    } catch (error) {
        console.log("error in connecting to MongoDB", error);
    }
}

module.exports = connectDB;
