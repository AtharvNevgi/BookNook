const mongoose = require("mongoose")

const bookSchema = mongoose.Schema({
    image:{
        type:String,
        require:true
    },
    title:{
        type:String,
        require:true
    },
    discription:{
      type:String,
      require:true  
    },
    price:{
        type:Number,
        require:true
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
})

const Book =  new mongoose.model("Book", bookSchema);

module.exports = Book;