const Books = require("../models/booksModel")
const User = require("../models/userModel");

const getAddBook = (req, res) => {
    res.render("books/addForm");
}

const postBook = async (req, res) => {
    try {
        // const user = await User.findById(req.user.id)
        // console.log(user.id)
        const addBooks = new Books({
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            description: req.body.description,
            condition: req.body.condition,
            category: req.body.category,
            image: req.body.image,
            userId: req.user.id
        })
        const booksAdded = await addBooks.save();
        res.redirect("/user/dashboard");
    }
    catch (err) {
        res.status(400).send(err);
        console.log(err);
    }
}

const getUserBooks = async (req, res) => {
    try{
        const books = await Books.find({userId: req.user.id});
        res.render("books/myBooks", {books});
    }
    catch(err){
        console.log(err);
        res.status(500).send("Error Loading My-Books")
    }
}

const getEditBook = async (req, res) => {
    try {
        const id = req.params.id;
        const book = await Books.findById({_id:id});
        // console.log(book.title);
        res.render("books/editBook", {book});
    } 
    catch(err){
        res.status(500).send(err);
    }
}

const updateUserBook = async (req, res) => {
    try{
        const _id = req.params.id;
        const updateUserBook = await Books.findByIdAndUpdate(_id, req.body, {new:true});
        res.redirect("/books/myBooks");
    }
    catch(err){
        res.status(500).send(err);
    }
}

const deleteUserBook = async (req, res) => {
    try{
        const deleteUserBook = await Books.findByIdAndDelete(req.params.id);
        if(!req.params.id){
            res.status(400).send();
        }
        res.redirect("/books/myBooks");
    }
    catch(err){
        res.status(500).send(err);
    }
}

const getBookDetails = async (req, res) => {
    try{
        const id = req.params.id;
        const book = await Books.findById({_id:id});
        const userId = book.userId;
        const user = await User.findById({_id:userId})
        res.render("books/bookDetails", {book, user})
    }
    catch(err){
        res.status(500).send(err);
    }
}

const bookStatus = async (req, res) => {
    try{
        const status = req.params.status;
        console.log(status);
        res.redirect("/books/myBooks")
    }
    catch(err){

    }
}

module.exports = { getAddBook, postBook, getUserBooks, getEditBook, updateUserBook, deleteUserBook, getBookDetails, bookStatus }