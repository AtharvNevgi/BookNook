const express = require("express");
const {getAdminlogin, postAdminlogin, getAdminDashboard} = require("../controllers/adminAuthController");
const auth = require("../middleware/userAuth");

const adminRouter = express.Router();

adminRouter.get("/", getAdminlogin);

adminRouter.post("/adminlogin", postAdminlogin)

adminRouter.get("/adminDashboard", auth, getAdminDashboard);

module.exports = {adminRouter};