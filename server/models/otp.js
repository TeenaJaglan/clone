const mongoose = require('mongoose');
const mailsender =require('../utils/mailsender');
const otpSchema= mongoose.Schema({
    email:{
        type:String,required:true
    },
    created_at:{
        type:String,
    },
   otp:{
        type:String,
        default:Date.now(),
        expires:5*60,
        required:true
    }

})
//function for verification of email
//hum html ki body m otp bhejenge
async function sendVerificationEmail(email,otp){
    try{
      const verify =   await mailsender(email,"verification otp is here",otp);
      console.log("Email sent successfully",verify);
    }catch(err){
        console.log(err);
        throw err;
    }
}

otpSchema.pre("save",async function(next){
    try{
        await sendVerificationEmail(this.email,this.otp);
        next();
    }catch(err){
        console.log("error while sendimg email:" ,err);
        throw err;
    }
});
module.exports = mongoose.model("otpSchema", otpSchema);