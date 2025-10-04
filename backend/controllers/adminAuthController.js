const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel")

const getAdminlogin = (req, res) => {
    res.render("admin/adminlogin");
}

const postAdminlogin = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const user = await User.findOne({ email: email });

        if (!user) {
            res.send("No Such User Found");
        }
        if (user.role !== "admin") {
            console.log(user.role)
            res.send("Not a admin login please login through user login or register");
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            res.cookie("userId", user.id.toString(), {
                maxAge: 1000 * 60 * 600,
            })
            res.redirect("adminDashboard");
        }
        else {
            res.send("Invalid Login credentials");
        }
    }
    catch (err) {
        res.status(404).send("Invalid Email", err);
        console.log(err)
    }
}

const getAdminDashboard = async (req, res) => {
    res.render("admin/adminDashboard", {user: req.user.firstname});
}

module.exports = { getAdminlogin, postAdminlogin, getAdminDashboard };