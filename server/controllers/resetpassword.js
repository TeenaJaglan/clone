const user = require("../models/user");
const bcrypt = require("bcrypt");
const mailsender = require("../utils/mailsender");
const crypto = require("crypto");

//resetpassword token  generate krenge taki sirfwhi user use kar paye aur access krne ke liye pass karenge with expiry date

exports.resetpasswordToken = async (req, res) => {
  try {
    const { email} = req.body;
    //validation
    if (!email ) {
      return res.json({ success: "Please fill all the details." });
    }
    //find if the user is correct or not
    const client = await user.findOne({ email });
   
    if (!client) {
      return res.json({ success: "Invalid email id" });
    }

    // const clientproof = bcrypt.compare(password, client.password);
    // if (!clientproof) {
    //   return res.json({ message: "Incorrect password", error: err });
    // }

    //token with expiration time banao then usse url m bhej do simpleeeeeee
    const uniquetoken = crypto.randomUUID();
    const newuser = await user.findOneAndUpdate(
      { email },
      {
        uniquetoken: uniquetoken,
        expiresIn: Date.now()*5*60*60*1000,
      },
      { new: true }
    );

    console.log(newuser);
    //question is ye link kese depend kar raha h expiration time pr ?
    const url = `http://localhost:3000/Update-password/${uniquetoken}`;
    const mailsend = await mailsender(
      email,
      "Reset Password",
      `Reset Password Link : ${url}`
    ).then(() => console.log("mail sent  successfully."));

    return res.json({
      success: true,
      message: "reset passwords token is created",
      token: uniquetoken,
      data: newuser,
    });
  } catch (err) {
    console.log("error occurred whilegenerating resetting token.");
    return res.json({
      success: false,
      message: "error occurrd while generating the reseting token.",
      error: err.message,
    });
  }
};

//reset password in db
exports.resetpassword = async (req, res) => {
  try {
    //frontend in token req m daal dia h
    const { uniquetoken, expiresIn, newpassword, confirmnewpassword } =
      req.body;
      console.log(Date.now());
console.log(expiresIn-Date.now());
    //validations
    if (expiresIn < Date.now()) {
      console.log("time is up. Please try again");
      return res.json({
        success: false,
        message: "time's up. Please try again .",
      });
    }
    let newuser = await user
      .findOne({ uniquetoken })
      .catch((err) => console.log("error while findOne user", err));

    console.log(newuser);
    if (!newuser) {
      console.log("No user is found .");
      return res.json({
        success: false,
        message: "No user is found.",
      });
    }
    if (
      !newpassword ||
      !confirmnewpassword ||
      confirmnewpassword != newpassword
    ) {
      console.log("Invalid credentials or password do not match.");
      return res.json({
        success: false,
        message: "Invalid credentials or password do not match.",
      });
    }

    //entry in db
    let data;
    const hashpassword = bcrypt.hash(
      newpassword,
      10,
      async function (err, hash) {
        if (err) {
          console.log(err);
          return;
        } else {
          data = await user
            .findOneAndUpdate(
              { uniquetoken },
              { password: hash, confirmpassword: hash },
              { new: true }
            )
            .catch((err) =>
              console.log("error while findOneAndUpdate user", err)
            );
          console.log("data", data);
        }
      }
    );
    return res.json({
      success: true,
      message: "password is resetted successfully.",
    });
  } catch (err) {
    console.log("error occurred while resettig the password.");
    return res.json({
      success: false,
      message: "error occurrd while resetting the password.",
      error: err.message,
    });
  }
};
