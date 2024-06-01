const mongoose = require("mongoose");
const userchema = require("../models/user");
const courseschema = require("../models/course");
const CourseProgressschema = require("../models/courseProgress");
const categoryschema = require("../models/category");
const userschema = require("../models/user");
const sectionschema = require("../models/section");
const subsectionschema = require("../models/subsection");
const user = require("../models/user");


exports.markAsCompleted = async(req,res)=>{
    try{
      const {courseId,subsectionId} = req.body;
      const id = req.user.id;
      //validation 
      const subsection = await subsectionschema.findById({_id:subsectionId});
      if(!subsection){
        return res.json({
          success: false,
          message: "subsection do not exist", 
        })
      }
console.log("subsection is",subsection);
const check = await CourseProgressschema.findOne({course_id:courseId,user_id:id});
if(check.completed_videos.includes(courseId)){
  return res.status(500).json({
    success: false,
    message: "Already marked as completed",
    
  })
}
      const courseProgress = await CourseProgressschema.findOneAndUpdate({course_id:courseId,user_id:id},{
        $push:{
          completed_videos:subsection._id
        }
      });

console.log("courseProgress is",courseProgress);
        return res.json({
            success: true,
            message: "successfully to mark the part of the course completed",
            data :courseProgress
          });
    }catch(err){ return res.status(500).json({
        success: false,
        message: "Failed to mark the part of the course completed",
        error: err.message,
      });}
}