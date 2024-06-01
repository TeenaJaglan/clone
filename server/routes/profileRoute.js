const express = require("express")
const profileRoutes = express.Router();

//function call
const {updateprofile,deleteprofile,getAllUserDetails,getEnrolledCourses,instructorDashboard,updateDisplayPicture}= require("../controllers/profile");
const {authmiddleware,isStudent,isInstructor,isAdmin} = require( "../middlewares/authmiddleware" );

//route
profileRoutes.put("/Update-Profile",authmiddleware,updateprofile);
profileRoutes.put("/Update-Profile-Pic",authmiddleware,updateDisplayPicture);
profileRoutes.get("/User-details",authmiddleware,getAllUserDetails);
profileRoutes.get("/Enrolled-courses",authmiddleware,isStudent,getEnrolledCourses);
profileRoutes.get("/Instructor-Dashboard",authmiddleware,instructorDashboard);
profileRoutes.delete("/Delete-Profile",authmiddleware,deleteprofile);

module.exports = profileRoutes;