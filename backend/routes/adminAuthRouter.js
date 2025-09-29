const express = require("express");
const {getAdminlogin} = require("../controllers/adminAuthController");
const adminRouter = express.Router();

adminRouter.get("/", getAdminlogin);

module.exports = {adminRouter};