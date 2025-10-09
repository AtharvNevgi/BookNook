const mongoose = require("mongoose")

const bookSchema = mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    author:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:true
    },
    description:{
        type:String,
        require:true  
    },
    condition:{
        type:String,
        require:true
    },
    category:{
        type:String,
        require:true
    },
    image:{
        type:String,
        require:true
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
})

const Book =  new mongoose.model("Book", bookSchema);

module.exports = Book;