const user = require("../models/user");
const profile = require("../models/profile");
const { uploader } = require("../utils/cloudinaryuploader");
const mongoose = require("mongoose");
const convertSecondsToDuration = require("../utils/SectoDuration");
const CourseProgressschema = require("../models/courseProgress")
exports.updateprofile = async function (req, res) {
  try {
    //fetch from req body
    const {
      firstname,
      lastname,
      About,
      profession,
      gender,
      contactNumber,
      Dob,
    } = req.body;
    console.log("actual backend");
    console.log(
      firstname,
      lastname,
      About,
      profession,
      gender,
      contactNumber,
      Dob
    );
    let id = req.user.id;
    console.log("re.q.user is :", req.user);
    id = new mongoose.Types.ObjectId(id);

    //get profile id jisme user ki entry starting m save ho gayi thi aur jisme hume update karna tha
    const userid = await user.findById({ _id: id });
    if (!userid) {
      return res.json({
        success: false,
        message: "No such profile is avaliable. .",
      });
    }

    //now find profile and update
    const updateprofile = await profile
      .findByIdAndUpdate(
        { _id: userid.additionalDetails._id },
        {
          firstname,
          lastname,
          About,
          profession,
          gender,
          contactNumber,
          
          //push remove kia h
        },
        { new: true }
      )
      .exec();
      console.log("profile update", updateprofile);
      console.log(typeof updateprofile._id);
    const updateuser = await user
      .findByIdAndUpdate(
        { _id: id },
        {
            additionalDetails: updateprofile._id,
        },
        { new: true }
      )
      .populate("additionalDetails")
      .exec();

    console.log("user update", updateuser);
    

    return res.json({
      success: true,
      messsage: "profile updated successully",
      profile: updateprofile,
      user: updateuser,
    });
  } catch (err) {
    return res.json({
      success: false,
      message: "profile creation has failed due to some error .",
      error: err.message,
    });
  }
};
//req.user middleware se aa jayegi

exports.deleteprofile = async function (req, res) {
  try {
    //fetch from req body

    const id = req.user.id;

    //validation
    // if (!firstname || ) {
    // }
    //get profile id jisme user ki entry starting m save ho gayi thi aur jisme hume update karna tha
    const userdetails = await user.findById({ _id: id });
    if (!userdetails) {
      return res.json({
        success: false,
        messade: "No such profile is avaliable. .",
      });
    }

    //now find profile and delete
    const deleteprofile = await profile.findByIdAndDelete({
      _id: userdetails.additionalDetails,
    });
    //now delete user
    const deleteuser = await user.findByIdAndDelete({ _id: id });
    //hw: jaha jaha ye student enroll tha waha se bhi isse remove karo
    return res.json({ success: true, messsage: "profile deleted successully" });
  } catch (err) {
    return res.json({
      success: false,
      messade: "profile creation has failed due to some error .",
      error: err,
    });
  }
};

exports.updateDisplayPicture = async function (req, res) {
  try {
    const newprofile = req.files.displayprofile;
    let id = req.user.id;
    console.log(id, newprofile);
    const response = await uploader(newprofile, "Codehelp", 50);
    console.log("response is ", response);
    if (!response) {
      console.log("failed to upload to cloudinary.");
      return res.json({
        message: "failed to upload to cloudinary",
      });
    }

    id = new mongoose.Types.ObjectId(id);
    const updateduser = await user.findByIdAndUpdate(
      { _id: id },
      { image: response.secure_url },
      { new: true }
    );
    res.send({
      success: true,
      message: `Image Updated successfully`,
      data: updateduser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "failed to update profile pic",
      error: error.message,
    });
  }
};

exports.getEnrolledCourses = async function (req, res) {
  try {
    console.log("get enrolled courses backend starts");
   let id = req.user.id;
   console.log(id);
    id = new mongoose.Types.ObjectId(id);
    let userDetails = await user
      .findById({ _id: id }).populate({
        path:"courses",
        populate:{
          path:"courseContent",
          populate:{
            path:"subsection"
          }
        }
      })
      .exec();
    //  const userDetails = userDetail;
console.log("userDetails",userDetails);
//validation
if(!userDetails) {
  return res.status(400).json({success: false,  message: `Could not find user with id: ${userDetails}`,})
}

    //kya likha h isse samjho

    userDetails = userDetails.toObject();
    var SubsectionLength = 0
    for(var i = 0; i < userDetails.courses.length; i++) {
      let totalDurationInSeconds = 0;
      SubsectionLength = 0;
      for(var j = 0; j < userDetails.courses[i].courseContent.length; j++){
          totalDurationInSeconds += userDetails.courses[i].courseContent[j].subsection.reduce((acc, curr) => {return acc + parseInt(curr.time_duration)||0}, 0);
          console.log("loop",i,j,totalDurationInSeconds);
          SubsectionLength +=  userDetails.courses[i].courseContent[j].subsection.length
      }
   //  userDetails.courses[i].totalDuration = convertSecondsToDuration(totalDurationInSeconds)||"0 s";
      console.log("totalduration of that course is",userDetails?.courses[i]?.totalDuration);
      let courseProgressModel= await CourseProgressschema.findOne({course_id: userDetails.courses[i]._id,  user_id: id,})
     let courseProgressCount = courseProgressModel?.completed_videos.length ;
      console.log("courseProgress count and the object is",courseProgressCount,courseProgressModel)
      if(SubsectionLength === 0) {
        userDetails.courses[i].ProgressPercentage = 100
      }
      else {                                             // To make it up to 2 decimal point
        const multiplier = Math.pow(10, 2)
        userDetails.courses[i].ProgressPercentage =  Math.round( (courseProgressCount / SubsectionLength) * 100 * multiplier ) / multiplier
      }
    }

   console.log("final response is",userDetails);

    return res.status(200).json({
      success: true,
      data: userDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.instructorDashboard = async function (req, res) {
  try {
    let id = req.user.id;
    id = new mongoose.Types.ObjectId(id);
    const details = await user.findById({ _id: id }).populate("courses").populate("additionalDetails");
    
    console.log("details are,",details);
    if (details) {
      const response = details.courses.map((each_course) => {
        const total_students_enrolled = each_course.students_enrolled.length;
        const total_amount = total_students_enrolled * each_course.price;
        const coursedetails = {
          id: each_course._id,
          name: each_course.course_name,
          description: each_course.course_description,
          students_enrolled: total_students_enrolled,
          total_amount,
        };

        return coursedetails;
      });
      //response m array of coursedetails store ho jayega
      console.log("what response is this",response)
      res.status(200).json({
      success: true,
      message: "successfully fetched instructor details .",
     courses: response,
    });
    } else if (!details) {
      return res.json({
        message: "no courses published by this instructor yet",
      });
    }
    
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

exports.getAllUserDetails = async function (req, res) {
  try {
    const userId = req.user.id;
    const details = await user
      .findById({ _id: userId })
      .populate("additionalDetails")
      .exec();
    res.status(200).json({
      success: true,
      message: "User Data fetched successfully",
      data: details,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
