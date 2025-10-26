const express = require("express");
const mongoose = require("mongoose");
const auth = require("../middleware/userAuth")
const {getUserlogin, getUserRegister, postUserRegister, postUserLogin, getUserDashboard, getUserProfile, getUserLogout} = require("../controllers/userAuthController");
const authRouter = express.Router();


authRouter.get("/userlogin", getUserlogin);

authRouter.get("/userRegister", getUserRegister);

authRouter.post("/userRegister", postUserRegister);

authRouter.post("/userlogin", postUserLogin);

authRouter.get("/dashboard", auth, getUserDashboard);

authRouter.get("/profile", auth, getUserProfile);

authRouter.get("/logout", getUserLogout);

module.exports = {authRouter}