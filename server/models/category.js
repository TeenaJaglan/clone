const mongoose = require('mongoose');

const categorySchema= mongoose.Schema({
    category:{
        type:String,required:true
    },
    description:{
        type:String,
    },
    list_of_that_course:[{
        type:mongoose.Schema.Types.ObjectId, 
        ref:"courseSchema",
        
    }]

});
//send otp to the user  and for pre middle ware to fetch data from email we use like this.email,this.age and for post we will use like doc.email getting doc from the function recently from the function 

//note while saving image it should be in a string as we will save it as an url of the image
module.exports = mongoose.model("categorySchema",categorySchema) ;
