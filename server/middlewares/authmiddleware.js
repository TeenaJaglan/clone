const jwt = require("jsonwebtoken");
const  mongoose = require("mongoose");
require("dotenv").config();

//auth 
exports.authmiddleware = async (req,res,next)=>{
    try{
        //req.cookie|| req.body.token||req.header("Authorisation").replace("Bearer","")||
        console.log("middleware starts")
        let token = req.body.token || (req.header("Authorization") && req.header("Authorization").replace("Bearer ", ""));
        console.log(req.body);
        console.log(token);
      //  console.log(req.cookie);
        if(!token){
            return res.json({message:"token is missing."});
        }
        //verify the token 
        const verification =  jwt.verify(token,process.env.JWT_SECRET);
       console.log("verification is :" ,verification);
       //gives the paylooad 
        if(!verification){
            console.log("Verification failed.");
        }
        req.user = verification ;
        console.log("authorisation complete")
        next();
        // return res.json({
        //     success:true,
        //     message:"verification successfull"
        // });
    }catch(err){
        console.log(err);
        return res.json({
            success: false,
            message:"Verification Failed.",
            error:err.message
        });
    }
};

//isStudent 
exports.isStudent = async (req,res,next)=>{
    try{
        const accountType = req.user.accountType ;
        if(accountType!== "Student"){return res.json({message:"Incorrect accountType ."})}
        console.log("student verified");
        next();
    }catch(err){return res.json({success:false,message:err.message});}
}
//isInstructor
exports.isInstructor = async (req,res,next)=>{
    try{
        const accountType = req.user.accountType ;
        if(accountType!=="Instructor"){return res.json({message:"Incorrect accountType ."})}
        console.log("Instructor verified");
        next();
    }catch(err){return res.json({success:false,message:err.message});}
}
//isAdmin
exports.isAdmin = async (req,res,next)=>{
    try{

        const accountType = req.user.accountType ;
        if(accountType!=="Admin"){return res.json({message:"Incorrect accountType ."})}
        console.log("Admin verified");

        next();
    }catch(err){return res.json({success:false,message:err.message});}
}