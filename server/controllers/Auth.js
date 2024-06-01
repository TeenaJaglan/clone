const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
const OTP = require("../models/otp");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const Profile = require("../models/profile");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const otpgenerator = require("otp-generator");
const mailsender = require("../utils/mailsender");
const SendOtp = require("sendotp");
const cookie = require("cookie");
const {passwordUpdated} = require("../mail-templates/passwordupdate"); 

exports.SignUp = async function (req, res, next) {
  try {
    const {
      firstname,
      lastname,
      email,
      password,
      confirmpassword,
      accountType,
      otp,
    } = req.body;
    console.log(
      firstname,
      lastname,
      email,
      password,
      confirmpassword,
      accountType , otp
    );
    //complete validation
    if (
      !accountType ||
      !firstname ||
      !lastname ||
      !email ||
      !password ||
      !confirmpassword
    ) {
      return res.status(401).json({success:false, message: "Please fill all the fields" });
    }
    if (firstname.charAt(0) < 65 || firstname.charAt(0) > 122) {
      return res
        .status(401)
        .json({ success:false,message: "Please fill the first_name correctly" });
    }
    if (password != confirmpassword) {
      console.log("Password and Confirm_password is not same");
      return res
      .status(401)
      .json({ success:false,message: "password and confirm passwords do not match" });
    
    }
    const checkuser = await User.find({ email: email });
    if (!checkuser) {
      console.log("user already exists");
      return res.json({ success: false, message: "user already esists." });
    }

    //otp verify karo ki mail sahi  h kya nahi
    const otpfetcher = await OTP.findOne({ email: email })
      .sort({ created_at: -1 })
      .limit(1);
    //limit(1) means only one element will be selected .
    console.log("this is db otp:"+otpfetcher);
 console.log(otpfetcher.otp,"otp atual is");
    if (otpfetcher.otp != otp) {
      return res.json({
        success:false,
        message: "incorrect otp. please try again",
      });
    }
let response ;
    //find most recent otp and then validate kro end m jakr password hashhoga aur chize sahi h sirf tabb hi
    //agar  baar baar login karenge toh otp latest wala check karna h
    //converting to hash password and let  saltrounds=10 and hash m wo value aayegi jo store hogi password ke aandr
  
    let hashpassword = await  bcrypt.hash(password, 10);

console.log("hashpassword",hashpassword);
if (!hashpassword) {
    return res.json({
      success: false,
      message: "failed to hash the password .",
    });
  }
  const profileresponse = await Profile.create({
        firstname: firstname,
        lastname: lastname,
        contactNumber: null,
        gender: null,
        About: null,
      });
    response = await User.create({
        accountType,
        firstname,
        lastname,
        email,additionalDetails:profileresponse._id,
        password: hashpassword,
        confirmpassword: hashpassword,
        image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstname} ${lastname}`,
      });

      console.log("response:",response);
      

console.log("profileresponse",profileresponse);
    return res.json({
      success:true,
      status: "success",
      data:response ,
      message:"signup successfull. Please login to continue.",
    });
  } catch (err) {
    console.log("error occurred during SignUp");
    console.log(err);
    return res.json({
      success:false,
      status: "failed",
      message: "error occurred during signup",
      error: err,
    });
  }
};

//login
exports.LogIn = async function (req, res) {
  try {
    let { email, password } = req.body;
  //  const token = req.headers.cookie;
  console.log("backend start");
    console.log(email, password );
    //validation
    if (!email || !password) {
      console.log("Please fill all the credentials.");
      return;
    }
    //checking if not exists
    let checkuser = await User.findOne({ email });
    if (!checkuser) {
      console.log("you have not signed up yet.");
      return res.json({
        success:false,
        message:"you have not signed up yet."
      });
    }
    let user = await User.findById(checkuser._id).populate("additionalDetails");
    const comparison = await bcrypt.compare(
      password,
      checkuser.password,
    );
console.log("bcrypt compare",comparison ,checkuser);
if (!comparison) {
  console.log("incorrect password");
        return res.status(401).send({
          auth: false,
          message:"incorrect password"
        });
}
 console.log(checkuser);
accountType = checkuser.accountType ;
    checkuser = new mongoose.Types.ObjectId(checkuser);
    checkuser.password = undefined;
   
        //create token
        const Payload = {
          email,
           id:checkuser._id,
          accountType:accountType,
        };
        console.log("payload is :",Payload);
        const jwtToken = jwt.sign(Payload, process.env.JWT_SECRET, {
          expiresIn: "24h",
        });
        const data = {
          jwtToken,
        };
        const options = {
          expiresIn: Date.now() * 5 * 24 * 60 * 60 * 1000,
          httponly: true, //client side se access nahi kar payenge
        };
    
    //  return     res.cookie("User-Identification", data, options).status(500).json({
    //       status: "success",
    //       message: "verified Successfully.",
    //       token: jwtToken,
    //       user:checkuser
    //     });
    return res.json({
      success: true,
      token :jwtToken,
      user:user,
      profile :user.additionalDetails,
      message: "Successfully user logged in. Welcome to our platform.",
    });
  } catch (err) {
    console.log("error occurred during LogIn.");
    console.log(err);
  }
};

//sendotp
exports.SendOtp = async function (req, res) {
  try {
    const { email } = req.body;

    //check if user already exists
    const checkuser = await User.findOne({ email });
    console.log(checkuser);
    if(checkuser){
      return res.json({
        success:false,
        message:"user already exists"
      })
    }
    var otp = otpgenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    console.log("otp generated", otp);

    //check if otp is unique or not
    let checkotp = await OTP.findOne({ otp: otp });
    console.log(checkotp, "checkotp");

    while (checkotp) {
      console.log("loop");
      otp = otpgenerator.generate(6, {
        upperCaseAlphabets: false,
        specialChars: false,
      });
      checkotp = await OTP.findOne({ otp: otp });
    }
    console.log(checkotp, "checkotp");
    
    const result = await OTP.create({
      email,
      created_at: Date.now(),
      otp: otp,
    });
    console.log("otp is ", result);

    return res.json({
      success:true,
      message:"otp sent successfully."
    });
  } catch (err) {

    console.log("failed to send otp.");
    console.log(err);

    return res.json({
      success:false,
      message:"couldn't send otp."
    });
  }
};

//passwoord change
exports.changePassword = async function (req, res) {
  try{
  //first verify if it is ok to send it or not
  let { email, password, newpassword, confirmnewpassword } = req.body;
  console.log( email, password, newpassword, confirmnewpassword );
  //validations
  if (!email || !password || !newpassword || !confirmnewpassword) {
    return res.status(422).send({ error: "Please fill all fields" });
  }
  //checking if not exists
  let checkuser = await User.findOne({ email });
  if (!checkuser) {
    console.log("credentials are not correct.");
    return;
  }
  checkuser = checkuser.toObject();
  const comparison = bcrypt.compare(
    password,
    checkuser.password,
  );
  if(!comparison){
    return res.json({message:"incorrect password"})
  }
  console.log("password comparison success.")
  //if everything is fine then go ahead and save the new password
  if (newpassword != confirmnewpassword) {
   return res.json({message:"newpassword and confirmnewpasswords do not match. Please retry."});
  }
 const hash =await  bcrypt.hash(newpassword, 10);
    const newdata = await User.findByIdAndUpdate({ _id:checkuser._id }, { password: hash ,confirmnpassword:hash},{new:true}).exec();
   
    console.log("updated data is",newdata);
  //mail send that it is successfully updated
    const sendmail = await mailsender(
      email,
      "Password changed successfully. ",
      passwordUpdated(email,newdata.firstname)
    ).then(()=>console.log("mail  sent successfully")).catch((err)=>console.log('here comes the error while sending mail ',err));
    return res.json({
      success:true,
      message: "Password is changesd successfully .",
    });
 }
  catch (err) {
    console.log("the error occurred during changing password : ", err);
    return res.json({
      succss:false,
      message: err,
    });
  }
};
