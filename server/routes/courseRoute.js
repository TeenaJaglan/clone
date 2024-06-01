const express = require("express")
const courseRoutes = express.Router();

//function call
const {createcourse,showAllCourses,getCourseDetails,editCourse,getFullCourseDetails,getInstructorDetails,deleteCourse}= require("../controllers/course");
const {markAsCompleted} = require("../controllers/courseProgress");
const {createcategory,showAllcategory,categoryPageDetails} = require('../controllers/category');
const {createsection,updatesection,deletesection}= require("../controllers/section");
const {createsubsection,updatesubsection,deletesubsection,getsubsection}= require("../controllers/subsection");
const {createRatings,getAllRatings,getAverageRating, getcourseRatings}= require("../controllers/ratings");
const {authmiddleware,isStudent,isInstructor,isAdmin} = require( "../middlewares/authmiddleware" );

//course related api's

//post 
courseRoutes.post("/CreateCourse",authmiddleware ,isInstructor ,createcourse);
courseRoutes.post("/CreateCourseCategory",authmiddleware ,isInstructor ,createcategory);
courseRoutes.post("/CreateSection",authmiddleware,isInstructor,createsection);
courseRoutes.post("/CreateSubSection",authmiddleware,isInstructor,createsubsection);
courseRoutes.post("/createRatings",authmiddleware,isStudent,createRatings);
courseRoutes.post("/GetCategoryPageDetails",categoryPageDetails);
courseRoutes.post("/Markascompleted",authmiddleware,isStudent,markAsCompleted);

//put
courseRoutes.put("/UpdateSection",authmiddleware,isInstructor,updatesection);
courseRoutes.put("/UpdateSubSection",authmiddleware,isInstructor,updatesubsection);
courseRoutes.put("/UpdateCourse",authmiddleware,isInstructor,editCourse);


//get
courseRoutes.get("/ShowAllCourses",authmiddleware,isAdmin,showAllCourses);
courseRoutes.get("/GetInstructorDetails",authmiddleware,getInstructorDetails);
courseRoutes.post("/GetFullCourseDetails",authmiddleware,getFullCourseDetails);
courseRoutes.post("/GetCourseDetails",getCourseDetails);
courseRoutes.get("/ShowAllCategory",showAllcategory);
courseRoutes.get("/GetAllRatings",getAllRatings);
courseRoutes.get("/GetAverageratings",getAverageRating);
courseRoutes.get("/GetCourseratings",getcourseRatings);
courseRoutes.get("/GetSubsection",getsubsection);

//delete 
courseRoutes.delete("/DeleteSection",authmiddleware,isInstructor,deletesection);
courseRoutes.delete("/DeleteSubSection",authmiddleware,isInstructor,deletesubsection);
courseRoutes.delete("/DeleteCourse",authmiddleware,isInstructor,deleteCourse);

module.exports = courseRoutes;