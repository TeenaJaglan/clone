const cloudinary = require('cloudinary').v2
const CloudinaryConnection = function(){
    try{
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME , 
  api_key: process.env.API_KEY ,
  api_secret: process.env.API_SECRET 
});
console.log("cloudinary connection successfully established");}
catch(err){
    return res.json({
        status:"fail",
        message:"cloudinary connection failed ." ,
        error:err.message
    })
}
}

module.exports = CloudinaryConnection;