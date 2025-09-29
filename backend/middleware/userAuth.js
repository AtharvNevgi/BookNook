const User = require("../models/userModel");

const auth = async (req, res, next) => {
    try{
        const userId = req.cookies.userId;

        if(!userId){
            return res.status(401).json({msg: "Not Authenticated"});
        }

        const user = await User.findById(userId);

        if(!user){
            return res.status(401).json({msg: "User not found"});
        }

        req.user = user;

        next();
    }
    catch(err){
        console.error(err);
        res.status(500).json({msg: "Internal server error"});
    }
}

module.exports = auth