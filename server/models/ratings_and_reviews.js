const mongoose = require('mongoose');

const ratings_and_reviewsSchema= mongoose.Schema({
    name:{
        type:mongoose.Schema.Types.ObjectId, 
        ref:"userSchema",
        required:true
    },
    rating:{
        type:Number,
        required:true
    },
   to_which_Instructor:{
        type:mongoose.Types.ObjectId,
        ref:"courseSchema",
        required:true
    },
   
    suggestion:{
        type:String,
        required:true
    }

})
//note while saving image it should be in a string as we will save it as an url of the image
module.exports = mongoose.model("ratings_and_reviewsSchema", ratings_and_reviewsSchema);
