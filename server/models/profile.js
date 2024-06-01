const mongoose = require('mongoose');

const profileSchema= mongoose.Schema({
    firstname:{
       type:String
    },
    lastname:{
        type:String
    },
    gender:{
        type:String,
        enum:["Male","Female","Choose not to say","Other"],
    
    },
    Dob:{
        type:Date,
    },
    contactNumber:{
        type:Number,
       
    },
    About:{
        type:String,
        trim:true
    },
    Profession:{
        type:String,

    }
})
//note while saving image it should be in a string as we will save it as an url of the image
module.exports = mongoose.model("profileSchema", profileSchema);