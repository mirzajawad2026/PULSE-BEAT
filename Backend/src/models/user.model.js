const mongoose = require("mongoose");


const newSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    role : {
        type : String,
        enum : ["user", "artist"],
        default : "user"
        }

})

const userModel = mongoose.model("register", newSchema);

module.exports = userModel