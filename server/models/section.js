const mongoose = require('mongoose');

const sectionSchema= mongoose.Schema({
    section_name:{
        type:String  
    },
    subsection:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"subsectionSchema"
    }]
   

})
//note while saving image it should be in a string as we will save it as an url of the image
module.exports = mongoose.model("sectionSchema", sectionSchema);
