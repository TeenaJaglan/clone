const express = require("express")
const userRoutes = express.Router();

//function call
const {SignUp,LogIn,SendOtp,changePassword}= require("../controllers/Auth");
const {resetpasswordToken,resetpassword}= require("../controllers/resetpassword");

//authentication route
userRoutes.post("/SignUp",SignUp); 
userRoutes.post("/SendOtp",SendOtp); 
userRoutes.post("/LogIn",LogIn) ;
userRoutes.put("/ChangePassword",changePassword);

//reset password
userRoutes.put("/ResetPassword",resetpassword);
userRoutes.put("/ResetPasswordToken",resetpasswordToken);

module.exports = userRoutes;