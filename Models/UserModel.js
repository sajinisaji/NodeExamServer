const mongoose = require("mongoose")


const userSchema = mongoose.Schema({
    firstName:{
        type: String,
        required: true
    },    
    lastName:{
        type: String,
        required: true
    },
    Email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    phoneNumber:{
        type: String,
        required: true
    }

}) 
const users = mongoose.model("user",userSchema)

module.exports = users