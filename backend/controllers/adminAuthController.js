const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel")
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

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
            const token = jwt.sign(
                {id:user._id, role:user.role},
                JWT_SECRET,
                {expiresIn:JWT_EXPIRES_IN}
            );

            res.cookie("token", token, {
                httpOnly:true,
                secure:false,
                maxAge: 24* 60 * 60 * 1000
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
    try{
        const user = await User.findById(req.user.id);
        res.render("admin/adminDashboard", {user: user.firstname});
    }
    catch(err){
        console.log(err);
        res.status(500).send("Error Loading Dashboard");
    }
}

const getAdminLogout = async (req, res) => {
    res.clearCookie("userId");
    res.redirect("/admin");
}

module.exports = { getAdminlogin, postAdminlogin, getAdminDashboard, getAdminLogout };