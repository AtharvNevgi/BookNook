const express = require("express");
require("../config/db");
const path = require("path");
const ejs = require("ejs")
const methodOverride  = require("method-override");
const port = process.env.PORT || 3000;
require("dotenv").config({quiet:true});
const cookieParser = require("cookie-parser");
const app = express();

// routes
const {authRouter} = require("../routes/userAuthRouter");
const {adminRouter} = require("../routes/adminAuthRouter");
const {booksRouter} = require("../routes/booksRouter");

// authentication
const auth = require("../middleware/userAuth");

// middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(methodOverride("_method"));

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

// books route
app.use("/books", auth, booksRouter);

app.listen(port, () => {
    console.log(`Listening on Port:${port}`);
})