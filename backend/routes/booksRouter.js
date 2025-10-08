const express = require("express");
const auth = require("../middleware/userAuth");
const {getAddBook} = require("../controllers/bookAuthController");
const booksRouter = express.Router();

booksRouter.get("/addBook", auth, getAddBook);

module.exports = {booksRouter}