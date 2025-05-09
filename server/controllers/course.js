const course = require("../models/course");
const CourseProgress = require("../models/courseProgress");
const categoryschema = require("../models/category");
const userschema = require("../models/user");
const section = require("../models/section");
const subsectionschema = require("../models/subsection");
const { uploader } = require("../utils/cloudinaryuploader");
const mongoose = require("mongoose");
const user = require("../models/user");
const {convertSecondsToDuration} = require('../utils/SectoDuration');

exports.createcourse = async (req, res) => {
  try {
    //fetch data
    const {
      course_name,
      course_description,
      what_you_will_learn,
        courseContent,
      price,
      category,
    } = req.body;
   const thumbnail = req.files.thumbnail;
    //validate karo
    console.log("create course starts");
    console.log(  course_name,
      course_description,
      what_you_will_learn,
        courseContent,
      price,
      category,thumbnail);
    if (
      !course_name ||
      !course_description ||
      !what_you_will_learn ||
      //  !courseContent ||
      !thumbnail ||
      !price ||
      !category
    ) {
      return res.json({
        success: false,
        message: "Please fill all the credentials .",
      });
    }
    //Instructor ko id do ki tumne banay h user ki id
    let Instructordetails = req.user.id;
    Instructordetails = new mongoose.Types.ObjectId(Instructordetails);
    console.log("instructor id is:", Instructordetails);


    // maybe pehle category banega then course banega fir uss category m course ko add kar
    //aab jab sab validation ho jaye thumbnail ko cloudinary m upload kar do
    
    const uploadtocloudinary = await uploader(thumbnail, "Codehelp", 60);
    console.log("image uploaded to cloudinary",uploadtocloudinary);

    //category creation or updation
    let categorie = await categoryschema.findOne({ category: category });
    //filhal ye feature active nahi h 
    if (!categorie) {
      categorie = await categoryschema.create({ category: category });
    }
    console.log("categorie :", categorie);
    const newCourse = await course.create({
      course_name,
      course_description,
      what_you_will_learn,
      Instructor: Instructordetails,
      courseContent,
      thumbnail: uploadtocloudinary.secure_url,
      price,
      category: categorie._id,
    });
    
    console.log("new course created", newCourse);
    console.log("new course created", typeof newCourse._id);

    //add new course to user list
    let newuser = await userschema
      .findByIdAndUpdate(
        { _id: Instructordetails },
        {
          $push: {
            courses: newCourse._id,
          },
        },
        { new: true }
      )
      .exec();
    console.log("user  updated with new course", newuser);

    categoryupdation = await categoryschema.findOneAndUpdate(
      { category },
      {
        $push: { list_of_that_course: newCourse._id },
      },
      { new: true }
    );
    console.log("new category is created", categoryupdation);
    console.log("function is complete");
    return res.json({
      success: true,
      message: "course created successfully",
      data: newCourse,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to create course",
      error: err.message,
    });
  }
};

exports.editCourse = async (req, res) => {
  try {
    let { courseId, updates } = req.body;
    console.log("updation starts");
   
    console.log(typeof courseId,typeof "661fffcd181d0945bc9a9726",courseId,updates)
    
    courseId = new mongoose.Types.ObjectId(courseId);
   // updates.category = new mongoose.Types.ObjectId(updates.category);
    
 //   console.log("category updates conversion",typeof updates.category,typeof courseId);
    const actualCourse = await course.find({_id:courseId});
    console.log(typeof actualCourse);
    console.log("course actual one is:", actualCourse);

    if (!actualCourse) {
      return res.status(404).json({ error: "Course not found" });
    }
    //if thumbnail image is found then ,update it
  
    if (req.files) {
      const response = await uploader("Codehelp", req.files.thumbnail, 50);
      actualCourse.thumbnail = response.secure_url;
    }
    //update only the fields that are present in the request body
    // This code snippet is a loop that goes through each property in the "updates" object. For each property, it checks if it belongs directly to the object (not inherited from a prototype). If the property is either "tag" or "instructions," it converts the value from a string to a JavaScript object using JSON.parse and then assigns it to the corresponding property in the "course" object. If the property is not "tag" or "instructions," it simply assigns the value directly to the corresponding property in the "course" object.
    console.log("loop call");
    for (const key in updates) {
      if (updates.hasOwnProperty(key)) {
        //hasownProperty() checks ki ye object ke aandr ki value h ya prototype chain se inherited h or h hi nahi inshort to check existence or traverse
        console.log(actualCourse[key]);
        if (key === "tag" || key === "instructions") {
          //maybe for the cases like id chahiye jisme naa ki string
          actualCourse[key] = JSON.parse(updates[key]); //convert string to object
        } else {
          actualCourse[key] = updates[key];
        }
      }
    }
    console.log("loop call");
  //  await course.actualCourse.save(updates); // save the course;
const r = await course.findByIdAndUpdate({ _id: courseId },updates) ;

    const updatedCourse = await course
      .findOne({ _id: courseId })
      .populate("category")
      .populate("ratings_and_reviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subsection",
        },
      })
      .exec();
console.log("the final ans are",updatedCourse);

    res.json({
      success: true,
      message: "Course updated successfully",
      data: updatedCourse,
      
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.showAllCourses = async function (req, res) {
  try {
    const courseList = await course.find({});
    return res.status(500).json({
      success: true,
      message: "The list of courses is : ",
      data: courseList,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to ShowAll course",
      error: err,
    });
  }
};

exports.getCourseDetails = async function (req, res) {
  try {
    let { courseId } = req.body;
    courseId = new mongoose.Types.ObjectId(courseId);
    console.log(courseId);
    const coursedetails = await course
      .find({ _id: courseId })
      .populate({
        path: "courseContent",
        populate: {
          path: "subsection",
        },
      }).populate({path:"Instructor",
      
        populate:{
          
          path:"additionalDetails"
        }
      }).populate({path:"Instructor",
      
      populate:{
        
        path:"courses"
      }
    }).populate("ratings_and_reviews")
      .exec();
    console.log("get course details output is ",coursedetails);
    //validaton
    if (!coursedetails) {
      return res.json({
        success: false,
        message: "Could not find course ",
      });
    }

    return res.json({
      success: true,
      message: " course details are fetched successfully .",
      data: coursedetails,
    });
  } catch (err) {
    return res.json({
      success: false,
      message: "Could not get course details.",
      error: err.message,
    });
  }
};

exports.getFullCourseDetails = async (req, res) => {
  try {
    let { courseId } = req.body;
    let userId = req.user.id;
    courseId = new mongoose.Types.ObjectId(courseId);
    userId = new mongoose.Types.ObjectId(userId);

    const response = await course
      .findById({ _id: courseId })
      .populate("Instructor")
      .populate("category")
      .populate("ratings_and_reviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subsection",
        },
      })
      .exec();
    console.log(response);

    let courseProgCount = await CourseProgress.findOne({
      course_id: courseId,
      user_id: userId,
    });
    console.log("course Progress count is:",courseProgCount);

    if (!response) {
      return res.status(400).json({
        success: false,
        message: `Could not find course with id: ${courseId}`,
      });
    }

    //convert total time seconds to time duration completely
    console.log("time counting");
      let totalDurationInSeconds = 0;
      response.courseContent.forEach((content) => {
        content.subsection.forEach((subSection) => {
         
         const  timeDurationInSeconds = parseInt(subSection.time_duration)||0;
          console.log(timeDurationInSeconds);
          totalDurationInSeconds += timeDurationInSeconds
        })
      })

      const totalDuration = convertSecondsToDuration(totalDurationInSeconds);
     const  completedVideos = (courseProgCount?.completed_videos) ? courseProgCount.completed_videos : [];
     console.log("conversion is:",totalDuration);
     console.log("conversion:",completedVideos);

    // console.log(totalDuration);
    return res.status(200).json({
      success: true,
      data: {
        response,
        timeduration:totalDuration,
       completedVideos
      },
    });
  } catch (err) {
    return res.json({
      success: false,
      message: "failed to fetch all the course details.",
      error: err,
    });
  }
};

exports.getInstructorDetails = async (req, res) => {
  try {
    let instructorId = req.user.id; // Get the instructor ID from the authenticated user or request body
    instructorId = new mongoose.Types.ObjectId(instructorId);
    console.log("Instructor id", instructorId, typeof instructorId);
    const allcourses = await course
      .find({ Instructor: instructorId })
      .sort({ createdAt: -1 }).populate({
        path:"courseContent",
      populate:{
        path:"subsection"
      }});
    console.log("allcourses", allcourses);
    const other = await userschema
      .findById({ _id: instructorId })
      .populate("courses")
      .exec();
    console.log(" others", other);

    res.status(200).json({
      // Return the instructor's courses
      success: true,
      data: allcourses,
      instructor: other,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve instructor courses",
      error: error.message,
    });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    console.log("deletion starts");
    let { courseId } = req.body;
     courseId = new mongoose.Types.ObjectId(courseId);
    console.log("course id", courseId);
    const Course = await course
      .findById({ _id: courseId })
      .populate("students_enrolled")
      .exec();
    if (!Course) {
      return res.status(404).json({ message: "Course not found" });
    }
    console.log(Course, "course to be deleted");
    //ist need to remove that course from students list
    const enrolledstudents = Course.students_enrolled ;
    if(enrolledstudents){
    for(const studentId of enrolledstudents ){
      const response = await userschema.findOneAndUpdte({_id:studentId},{$pull:{courses:courseId}},{new:true});
    } }
    //delete section and subsection
    for (let sectionId of Course.courseContent) {
        let id = new mongoose.Types.ObjectId(sectionId._id);
      const Section = await section.findById({ _id:id });
      for (const subsectionId of Section.subsection) {
        let subid = new mongoose.Types.ObjectId(subsectionId._id);
        await subsectionschema.findByIdAndDelete({ _id: subid });
      }
      await section.findByIdAndDelete({ _id: id });
    }

    const del = await course.findByIdAndDelete({ _id: courseId });
    console.log("del", del);
    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
