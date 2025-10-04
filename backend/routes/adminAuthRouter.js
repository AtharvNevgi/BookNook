const express = require("express");
const {getAdminlogin, postAdminlogin, getAdminDashboard, getAdminLogout} = require("../controllers/adminAuthController");
const auth = require("../middleware/adminAuth");

const adminRouter = express.Router();

adminRouter.get("/", getAdminlogin);

adminRouter.post("/adminlogin", postAdminlogin)

adminRouter.get("/adminDashboard", auth, getAdminDashboard);

adminRouter.get("/logout", getAdminLogout)

module.exports = {adminRouter};