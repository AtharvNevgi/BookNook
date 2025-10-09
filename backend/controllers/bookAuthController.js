const Books = require("../models/booksModel")
const User = require("../models/userModel");

const getAddBook = (req, res) => {
    res.render("books/addForm");
}

const postBook = async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
        console.log(user)
        const addBooks = new Books({
            image: req.body.image,
            title: req.body.title,
            discription: req.body.discription,
            price: req.body.price,
            userid: req.user.id
        })
        const booksAdded = await addBooks.save();
        res.status(200).send("books added");
    }
    catch (err) {
        res.status(400).send(err);
        console.log(err);
    }
}

module.exports = { getAddBook, postBook }