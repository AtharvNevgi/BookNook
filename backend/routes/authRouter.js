const express = require("express");
const mongoose = require("mongoose");
const auth = require("../middleware/auth")
const {getUserlogin, getUserRegister, postUserRegister, postUserLogin, getUserDashboard, getUserLogout} = require("../controllers/authController");
const authRouter = express.Router();


authRouter.get("/userlogin", getUserlogin);

authRouter.get("/userRegister", getUserRegister);

authRouter.post("/userRegister", postUserRegister);

authRouter.post("/userlogin", postUserLogin);

authRouter.get("/dashboard", auth, getUserDashboard);

authRouter.get("/logout", getUserLogout);

module.exports = {authRouter}