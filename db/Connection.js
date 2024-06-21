const mongoose = require("mongoose")
const connetcion_string = process.env.CONNECTION_STRING


mongoose.connect(connetcion_string).then((res)=>{
    console.log("MongoDB Atlas connected with user serve");
}).catch((err)=>{
    console.log("conncetion failed");
    console.log(err);
})