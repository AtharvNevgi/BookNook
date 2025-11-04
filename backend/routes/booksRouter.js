const express = require("express");
const auth = require("../middleware/userAuth");
const {getAddBook, postBook, getUserBooks, getEditBook, updateUserBook, deleteUserBook, getBookDetails, bookStatus} = require("../controllers/bookAuthController");
const booksRouter = express.Router();

booksRouter.get("/addBook",  getAddBook);

booksRouter.post("/addBook/submit", postBook);

booksRouter.get("/myBooks", getUserBooks);

booksRouter.get("/edit/:id", getEditBook);

booksRouter.patch("/edit/:id", updateUserBook);

booksRouter.delete("/delete/:id", deleteUserBook);

booksRouter.get("/details/:id", getBookDetails);

booksRouter.get("/myBooks/:status", bookStatus)

module.exports = {booksRouter}