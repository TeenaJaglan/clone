const mongoose = require('mongoose');

const courseSchema= mongoose.Schema({
    course_name:{
        type:String,
        required:true
    },
    course_description:{
        type:String,
        trim:true,  required:true
    },
    Instructor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"userSchema",
        
    },
    level:{
        type:String
    },
    language:{
        type:String
    },
    what_you_will_learn:{
        type:String,
        required:true,
    },
    
    courseContent:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"sectionSchema",
       
    }],
    ratings_and_reviews:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"ratings_and_reviewsSchema",
        
    }],
    price:{
        type:Number
    },
    thumbnail:{
        //url h ye
        type:String,
       
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"categorySchema",
        //required:true
    },
    status:{
       type:String,
       default:"Published",
        enum:[ "Draft","Published"],
    },
    students_enrolled:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"userSchema",
     //   required:true
    }],
   createdAt:{
    type:Date,
    default:Date.now()
   },
   Instructions:[{
    type:String
   }],
   totalDuration:{
    type:String,
    default:"0 s"
   },
   ProgressPercentage:{
    type:String,
    default:"0"
   }


})
//note while saving image it should be in a string as we will save it as an url of the image
module.exports = mongoose.model("courseSchema",courseSchema) ;