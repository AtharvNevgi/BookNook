const express = require("express");
const User = require("../models/userModel");
const Book = require("../models/booksModel");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

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
            
            const token = jwt.sign(
                {id:user._id, role: user.role},
                JWT_SECRET,
                {expiresIn: JWT_EXPIRES_IN}
            );

            res.cookie("token", token, {
                httpOnly:true,
                secure:false,
                maxAge: 24 * 60 * 60 * 1000 
            })

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
    try{
        const user = await User.findById(req.user.id);
        // const book = await Book.find({userId : req.user.id});
        const book = await Book.find({isPublic:true});
        res.render("dashboard", {user, book});
    }
    catch(err){
        console.log(err);
        res.status(500).send("Error Loading Dashboard")
    }
}

const getUserProfile = async(req, res) => {
    try{
        const user = await User.findById(req.user.id);
        res.render("users/userProfile",{user});
    }
    catch(err){
        console.log(err);
        res.status(500).send("Error loading Profile page");
    }
}

const getEditUserProfile = async(req, res) => {
    try{
        const user = await User.findById(req.user.id);
        res.render("users/editProfile", {user});
    }
    catch(err){
        res.status(500).send(err);
    }
}

const updateUserProfile = async(req, res) => {
    try{
        const _id = req.user.id;
        const user = await User.findById(_id);
        if(req.body.password === '' && req.body.confirmPassword === ''){
            req.body.password = user.password
        }
        const updateUserProfile = await User.findByIdAndUpdate(_id, req.body, {new:true});
        // console.log(user.password);
        res.redirect("/user/profile");
    }
    catch(err){
        res.status(500).send(err);
    }
}

const getUserLogout = (req, res) => {
    res.clearCookie("token");
    res.redirect("/user/userlogin");
}


module.exports = {getUserlogin, getUserRegister, postUserRegister, postUserLogin, getUserDashboard, getUserProfile, getUserLogout, getEditUserProfile, updateUserProfile}