const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstname:{
        type:String,required:true
    },
    lastname:{
        type:String ,
    },
    email:{
        type:String, required:true
    },
    password:{
        type:String, required:true
    },
    confirmpassword:{
        type:String, required:true
    },
    accountType:{
        type:String,
        enum:["Admin","Student","Instructor"],
        required:true,
    },
    additionalDetails:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"profileSchema",
        
    },
    courses:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"courseSchema"
        }
    ] ,
    courseProgress:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"courseProgressSchema"
        }
    ],
    token:{
        type:String
    },
    image:{
        type:String
    },
    uniquetoken:{
        type:String //for reset password and generating unique link with expiration time  :expiresIn
    },
    expiresIn:{
        type:Number
    },
})
//note while saving image it should be in a string as we will save it as an url of the image
module.exports = mongoose.model("userSchema", userSchema);
