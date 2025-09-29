const express = require("express");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs")

const getUserlogin = (req, res) => {
    res.render("users/userlogin");
}

const getUserRegister = (req, res) => {
    res.render("users/userRegister")
}

const postUserRegister = async (req, res) => {
    try{
        const password = req.body.password;
        const cpassword = req.body.confirmpassword;

        if(password === cpassword){
            const register = new User({
                firstname : req.body.firstname,
                lastname : req.body.lastname,
                email: req.body.email,
                gender:req.body.gender,
                phone: req.body.phone,
                age: req.body.age,
                password: password,
            })
            const registered = await register.save();
            res.status(200).render("users/userlogin");
        }
    }
    catch(err){
        res.status(404).send(err);
    }
}

const postUserLogin = async (req, res) => {
    try{
        const email = req.body.email;
        const password = req.body.password;

        const user = await User.findOne({email:email});

        if(!user){
            res.send("No user Found Please Register");
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(isMatch){
            res.cookie("userId", user.id.toString(), {
                maxAge: 1000 * 60 * 600,
            });
            res.redirect("dashboard");
        }
        else{
            res.send("Invalid Email or Password")
        }
    }
    catch(err){
        res.status(404).send("Invalid Email", err);
        console.log(err)
    }
}

const getUserDashboard = async(req, res) => {
    res.render("dashboard", {user: req.user.firstname});
}

const getUserLogout = (req, res) => {
    res.clearCookie("userId");
    res.redirect("/user/userlogin");
}


module.exports = {getUserlogin, getUserRegister, postUserRegister, postUserLogin, getUserDashboard, getUserLogout}