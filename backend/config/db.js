const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/BookNook")
.then(() => {
    console.log("Database Connected");
})
.catch((err) => {
    console.log("Database Connection Failed", err);
})
