const express = require("express");
require("../config/db");
const path = require("path");
const ejs = require("ejs")
const port = process.env.PORT || 3000;
require("dotenv").config({quiet:true});
const cookieParser = require("cookie-parser");
const app = express();

// routes
const {authRouter} = require("../routes/userAuthRouter");
const {adminRouter} = require("../routes/adminAuthRouter");

// middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

// static paths
const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");


// view engine
app.use(express.static(static_path));
app.set("view engine", "ejs")
app.set("views", template_path);

// index route
app.get("/", (req, res) => {
    res.render("index");
})

// user route
app.use("/user", authRouter);

// admin route
app.use("/admin", adminRouter);

app.listen(port, () => {
    console.log(`Listening on Port:${port}`);
})