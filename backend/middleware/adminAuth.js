const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const adminAuth = async (req, res, next) => {
    
    const token = req.cookies.token || req.headers["authorization"];

    if(!token){
        return res.redirect("/user/userlogin");
    }

    try{
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch(err){
        console.error(err);
        res.status(500).json({msg: "Internal server error"});
        }
}

module.exports = adminAuth