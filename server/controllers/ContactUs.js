
const {contactUsEmail} = require("../mail-templates/contactFormRes");
const mailsender = require("../utils/mailsender");
exports.contactus = async (req,res)=>{
    try{
const {email,
    firstname,
    lastname,
    message,
    phoneNo,
    countrycode} = req.body;
    console.log(email,
      firstname,
      lastname,
      message,
      phoneNo,
      countrycode);
      await mailsender(email,"Your data sent successfully",contactUsEmail(email,
        firstname,
        lastname,
        message,
        phoneNo,
        countrycode))
   await mailsender("uieteceteena2125@kuk.ac.in","your query has reached to us",contactUsEmail(email,
        firstname,
        lastname,
        message,
        phoneNo,
        countrycode));

        return res.json({
            success: true,
            message: "Email send successfully",
          })
    }
    catch(err){
      console.log("the error is:"+err);
        return res.json({
            success: false,
            message: "Something went wrong...",
            error:err.message
          })
    }
}