const mongoose = require('mongoose');

const subsectionSchema= mongoose.Schema({
    title:{
        type:String
        
    },
    description:{
        type:String,
        trim:true
    },
   time_duration:{
        type:String,
    },
    video_url:{
        type:String,
      
    },

})
//note while saving image it should be in a string as we will save it as an url of the image
module.exports = mongoose.model("subsectionSchema", subsectionSchema);
