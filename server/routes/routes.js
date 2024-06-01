// const express = require("express")
// const routes = express.Router();

// //import all routes
// const {SignUp,LogIn,SendOtp,changePassword}= require("../controllers/Auth");
// const {createcategory,showAllcategory,categoryPageDetails}= require("../controllers/category");
// const {createcourse,showAllCourses,getCourseDetails}= require("../controllers/course");
// const {capturedProduct,verifySignature}= require("../controllers/payments");
// const {updateprofile,deleteprofile}= require("../controllers/profile");
// const {createRatings,getAllRatings,getAverageRating}= require("../controllers/ratings");
// const {resetpasswordToken,resetpassword}= require("../controllers/resetpassword");
// const {createcategory,showAllcategory,categoryPageDetails} = require('../controllers/category');
// const {createsection,updatesection,deletesection}= require("../controllers/section");
// const {createsubsection,updatesubsection,deletesubsection}= require("../controllers/subsection");
// const {authmiddleware,isStudent,isInstructor,isAdmin} = require( "../middlewares/authmiddleware" );
// //setup all routes 
// routes.post("/SignUp",SignUp); 
// routes.post("/SendOtp",SendOtp); 
// routes.post("/LogIn",LogIn) ;
// routes.put("/ChangePassword",changePassword);

// routes.post("/CreateCourse",authmiddleware ,isInstructor ,createcourse);
// routes.get("/ShowAllCourses",showAllCourses);
// routes.get("/GetCourseDetails",getCourseDetails);

// routes.post("/createCategory",createcategory);
// routes.get("/showAllCategory",showAllcategory);
// routes.get("/CategoryPageDetails",categoryPageDetails);

// routes.put("/updateprofile",updateprofile);
// routes.delete( "/deleteprofile",deleteprofile);

// routes.post("/createRatings",createRatings);
// routes.get("/getAllRatings",getAllRatings);
// routes.get("/getAvergeRating",getAverageRating);

// routes.put("/resetpassword",resetpassword);
// routes.put("/resetpasswordtoken",resetpasswordToken);

// routes.post("/createSection",createsection);
// routes.put('/updateSection', updatesection);
// routes.delete("/DeleteSection",deletesection);

// routes.post( '/CreateSubSection', createsubsection );
// routes.put('/UpdateSubSection', updatesubsection );
// routes.delete("/deleteSection",deletesubsection);

// module.exports = routes;
