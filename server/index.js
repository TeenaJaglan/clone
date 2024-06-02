const express = require('express');
require("dotenv").config();
const app = express();
const userRoutes = require("./routes/userRoute")
const profileRoutes = require("./routes/profileRoute")
const contactRoutes = require("./routes/contactRoute")
const courseRoutes = require("./routes/courseRoute")
const paymentRoutes = require("./routes/paymentRoute")
const cookieparser = require("cookie-parser");
const cors = require("cors");//for middleware connection 
const CloudinaryConnection = require("./config/cloudinary");
const dbconnection = require("./config/database");
const fileUpload = require("express-fileupload")
const  port = process.env.PORT ||4000;

//setup
dbconnection();
CloudinaryConnection();

//since mene controller m req pass ki h therefore i need middleware to convert to json file 
app.use(express.json());
app.use(
	fileUpload({ 
		useTempFiles:true,                     //this middeare is for fileupload in local media;
		tempFileDir:"/tmp",
	})
)
app.use(cookieparser());
app.use(cors({
    // origin:"http://localhost:3000" ,
    origin: 'https://studynotionclone-mzrtsno12-teenas-projects-ab872839.vercel.app',
    //means ye url humari frontend ka h jise entertain karna h most imp.
    Credentials:true
})); //eq:frontend-3000 port ,backend-4000 port if we want our backend to entertain our frontend requests then we need cors();

//importing routes from files 
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/reach", contactRoutes);

//default route
app.get("/",(req,res)=>{
    return res.json({message:"Welcome to the StudyNotion Backend frame."});  
})
//app started
app.listen(port,()=>{
    console.log(port+":port number");
console.log("Server started successfully .");
});
