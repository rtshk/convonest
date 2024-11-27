const User = require("../models/userModel")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup =  async (req, res) => {
    try {
        const {username, password, confirmPassword} = req.body;

    //All feilds are not filled
        if(!username || !password || !confirmPassword){
            return res.status(400).json({message : "All fields are required"});
        }

    // password and confirm password fields does not match
        if(password != confirmPassword){
            return res.status(400).json({ message : "Passwords does not match"});
        }

    //Checking if user already exists in DB
        const user = await User.findOne({username});
        if(user){
            //User already exists
            return res.status(400).json({message : "User already exists"});
        }
    //Create user and Store in DB

        //Hashing password
        const hashedPassword = await bcrypt.hash(password, 10);
        //stor user in DB
        await User.create({
            username : username,
            password : hashedPassword,
            profilePhoto : "https://avatar.iran.liara.run/public/boy"
        })
     
        return res.status(201).json(
            {
                message : "Account created successfully",
                success : true
            }

        )

    } catch (error) {
        console.log("Error occured while signing up", error);
        return res.json({message : "Error while signing up"});
    }
}

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await User.findOne({ username: username });

        if (!user) {
            return res.status(400).json({ message: "User does not exist. Create a new account" });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: "Password does not match" });
        }

        const tokenData = { id: user._id };
        const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });

        return res.status(201).cookie("token", token, {
            httpOnly: true,              // Ensures the cookie is not accessible via JavaScript
            secure: true,  // Use `secure: true` in production (over HTTPS)
            sameSite: 'lax',           // Adjust according to your requirements
            maxAge: 1 * 24 * 60 * 60 * 1000 // 1 day in milliseconds
        }).json({
            username,
            profilePhoto: user.profilePhoto,
            userId: user._id,
        });

    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};


exports.logout = async (req, res) => {
    try {
        return res.clearCookie("token", {
            httpOnly: true,            // Match the options used in `login`
            secure: true,  // Use `secure: true` in production (over HTTPS)
            sameSite: 'lax',
        }).json({
            message: "Logged out successfully",
        });
    } catch (error) {
        return res.json({ error: error.message });
    }
};
