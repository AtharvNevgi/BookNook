const express = require("express");
const auth = require("../middleware/userAuth");
const {getAddBook, postBook, getUserBooks} = require("../controllers/bookAuthController");
const booksRouter = express.Router();

booksRouter.get("/addBook",  getAddBook);

booksRouter.post("/addBook/submit", postBook);

booksRouter.get("/myBooks", getUserBooks);

module.exports = {booksRouter, getUserBooks}