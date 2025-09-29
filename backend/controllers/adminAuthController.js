const express = require("express");
const bcrypt = require("bcryptjs");


const getAdminlogin = (req, res) => {
    res.render("admin/adminlogin");
}

module.exports = {getAdminlogin};