const mongoose = require("mongoose");
 require("dotenv").config();
const dbconnection = function(){
    
        mongoose.connect(process.env.DATABASE_URL
            , {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                serverSelectionTimeoutMS: 10000,
              }
        ).then(()=>{
         console.log("db connection successfully established .");

        }).catch((err)=>{
            console.log("db connection failed.");
           console.log(err);
        process.exit(1);
    //process.exit()->means to terminate the function  execution if any error occurs in db connection 
    //process.exit(0)->terminate without any kind of error showing
    //process.exit(1)->terminate the process with showing the error
});
        
}
module.exports=dbconnection;
