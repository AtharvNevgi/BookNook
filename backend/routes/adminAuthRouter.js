const express = require("express");
const {getAdminlogin, postAdminlogin} = require("../controllers/adminAuthController");
const adminRouter = express.Router();

adminRouter.get("/", getAdminlogin);

adminRouter.post("/adminlogin", postAdminlogin)

module.exports = {adminRouter};