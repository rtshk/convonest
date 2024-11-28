const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {

   try {
    const token = req.cookies.token;


    if(!token){
       return res.status(401).json({message : "token not provided"});
    }

    const decode = jwt.verify(token,process.env.JWT_SECRET_KEY);

    if(!decode){
       return res.status(401).json({message : "Invalid token"});
    }
    req.id = decode.id;
    next();
   } catch (error) {
        console.log(error);
        return res.status(401).json({ message: "Authentication failed" });
   }


}

module.exports = authMiddleware;