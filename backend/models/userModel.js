const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userRegisterSchema = new mongoose.Schema({
    firstname:{
        type:String,
        require:true,
    },
    lastname:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    gender:{
        type:String,
        require:true
    },
    phone:{
        type:Number,
        require:true,
        unique:true
    },
    age:{
        type:Number,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    role:{
        type:String,
        require:true,
        default:"user"
    }
})

// Middleware for hashing password before storing into database
userRegisterSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hashSync(this.password, 10);
    }
    next();
})

const User = new mongoose.model("User", userRegisterSchema);

module.exports = User;