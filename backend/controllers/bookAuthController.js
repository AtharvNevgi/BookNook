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

module.exports = { getAddBook, postBook, getUserBooks }