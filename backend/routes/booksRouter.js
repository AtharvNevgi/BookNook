const express = require("express");
const auth = require("../middleware/userAuth");
const {getAddBook, postBook} = require("../controllers/bookAuthController");
const booksRouter = express.Router();

booksRouter.get("/addBook",  getAddBook);

booksRouter.post("/addBook/submit", postBook);

module.exports = {booksRouter}