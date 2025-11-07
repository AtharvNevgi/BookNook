const express = require("express");
const mongoose = require("mongoose");
const auth = require("../middleware/userAuth")
const {getUserlogin, getUserRegister, postUserRegister, postUserLogin, getUserDashboard, getUserProfile, getUserLogout, getEditUserProfile, updateUserProfile} = require("../controllers/userAuthController");
const authRouter = express.Router();


authRouter.get("/userlogin", getUserlogin);

authRouter.get("/userRegister", getUserRegister);

authRouter.post("/userRegister", postUserRegister);

authRouter.post("/userlogin", postUserLogin);

authRouter.get("/dashboard", auth, getUserDashboard);

authRouter.get("/profile", auth, getUserProfile);

authRouter.get("/profile/edit", auth, getEditUserProfile)

authRouter.patch("/profile/edit", auth, updateUserProfile)

authRouter.get("/logout", getUserLogout);

module.exports = {authRouter}