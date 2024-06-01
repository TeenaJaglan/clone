const mongoose = require('mongoose');

const courseProgreesSchema= mongoose.Schema({
    course_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"courseSchema"
    },
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"userSchema"
    },
    completed_videos:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"subsectionSchema"
    }],
    //user id ko bhi introdue karo 
    
})
//note while saving image it should be in a string as we will save it as an url of the image
module.exports = mongoose.model("courseProgreesSchema", courseProgreesSchema);