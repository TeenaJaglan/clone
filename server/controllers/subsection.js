const course = require("../models/course");
const section = require("../models/section");
const { uploader } = require("../utils/cloudinaryuploader");
const subsection = require("../models/subsection");
const { default: mongoose } = require("mongoose");

//ek chiz yaad rakhna jese
//course contains->section->subsection
//toh pehle subsectionschemabanao fir wo subsection jo section bana h usse update kar ke daal dega iss way m data dalega
// ..aur jese section h wo sirf formation ke tym pr wo values lega jo subsection se related nahi h

exports.createsubsection = async function (req, res) {
  try {
    let { courseId,sectionId, title, description, time_duration } = req.body;
    const video = req.files.videofiles;
console.log("function for subsectioncreation starts",courseId,sectionId, title, description, time_duration,video);
    //validation
    if (!sectionId || !title || !description 
        ||
         !video 
         // ||
        //  !time_duration
        ) {
      return res.json({
        success: false,
        message: "Please fill all the credentials.",
      });
    }
    sectionId = new mongoose.Types.ObjectId(sectionId);
    courseId =new mongoose.Types.ObjectId(courseId);
    //upload to cloudinary and get its url
    console.log('cloudinary upload');
    const uploadtocloudinary = await uploader(video, "Codehelp", 60);
    console.log("video url uploaded", uploadtocloudinary);
    const video_url = uploadtocloudinary.secure_url;
    console.log("video url:", video_url);
    //create subsection
if(!video_url){
  return res.json({
    success:false,
    error: "video_url gets empty",
    err:video_url
  })
}
    const response = await subsection.create({
      title: title,
      description: description,
      video_url,
      time_duration: time_duration,
    });
    console.log("subsection :", response);

    //now add it to section
    
    const addtosection = await section.findByIdAndUpdate(
      { _id: sectionId },
      {
        $push: { subsection: response._id },
      },
      { new: true }
    );
    console.log("section updated", addtosection);

    const updatecourse = await course.findById({_id:courseId}).populate({
      path:"courseContent",
      populate:{
        path:"subsection"
      }
    });
    console.log("course data is",updatecourse);
    //return
    return res.json({
      success: true,
      message: "subsection is   created successfully .",
      data: addtosection,
      subsection:response,
      courseupdate:updatecourse
    });
  } catch (err) {
    return res.json({
      success: false,
      message: "subsection failed to  create .",
      error: err.message,
    });
  }
};

exports.updatesubsection = async function (req, res) {
  try {
    let { subsectionId, sectionId, courseId,title, description, time_duration } =
      req.body;
      let videos = req.files.video||{path:"imag.jpg"};
   // const video = req.files.videos;
console.log(subsectionId, sectionId, title, description, time_duration,videos);
    //validation
    // if (
    //   !subsectionId ||
    //   !sectionId ||
    //   !title ||
    //   !description 
    // //  || !time_duration
    // ) {
    //   return res.json({
    //     success: false,
    //     message: "Please fill all the credentials.",
    //   });
    // }
    sectionId = new mongoose.Types.ObjectId(sectionId);
    subsectionId = new mongoose.Types.ObjectId(subsectionId);
    courseId = new mongoose.Types.ObjectId(courseId);
    //upload to cloudinary and get its url
    const upload = await uploader(videos, "Codehelp", 30);
    const video_url = upload.secure_url;
    console.log(video_url, "cloudinary uploaded url");
    //create
    const updatesubsection = await subsection.findByIdAndUpdate(
      { _id: subsectionId },
      { title, description, time_duration ,video_url}
    );
    console.log("updatesubsection is:", updatesubsection);
    //now add it to section
    const addtosection = await section.findById( { _id: sectionId });
    console.log("add to section", addtosection);
    const addtocourse = await course.findById( { _id: courseId }).populate({
      path:"courseContent",
      populate:{
        path:"subsection"
      }
    });
    console.log("add to section", addtocourse);
    //return
    return res.json({
      success: true,
      message: "subsection is updated successfully .",
      subsection:updatesubsection,
      course:addtocourse
    });
  } catch (err) {
    return res.json({
      success: false,
      message: "subsection failed to  update .",
      error: err.message,
    });
  }
};

exports.deletesubsection = async function (req, res) {
  try {
    let {courseId, subsectionId, sectionId } = req.body;
    //const video = req.files.videos;
    subsectionId = new mongoose.Types.ObjectId(subsectionId);
    sectionId = new mongoose.Types.ObjectId(sectionId);
    courseId =new mongoose.Types.ObjectId(courseId);
    //validation
    if (!subsectionId || !subsectionId) {
      return res.json({
        success: false,
        message: "Please fill all the credentials.",
      });
    }

    //delete from cloudinary
    // const upload = await uploader(video,"Codehelp",30);
    // const video_url = upload.secure_url;
    const removefromsection = await section.findByIdAndUpdate(
      { _id: sectionId },
      {
        $pull: { subsection: subsectionId },
      },
      { new: true }
    );
    console.log("section is",removefromsection);
   
    //remove subsection
    const deletesubsection = await subsection.findByIdAndDelete({
      _id: subsectionId,
    });
    const updatecourse = await course.findById({_id:courseId}).populate({
      path:"courseContent",
      populate:{
        path:"subsection"
      }
    }).exec();
    //now remove it from section
    console.log("course is",updatecourse);

    const updateddata = await section
      .findById({ _id: sectionId })
      .populate("subsection");

      
console.log('final response is returned');
    //return
    return res.json({
      success: true,
      message: "subsection is deleted successfully .",
      data: updatecourse,
      updates:updateddata,
      new:removefromsection,
    });
  } catch (err) {
    return res.json({
      success: false,
      message: "subsection failed to  delete .",
      error: err.message,
    });
  }
};

exports.getsubsection = async function (req,res){
  try {
    let { subsectionId } =
      req.body;
   
console.log("fetching subsection" ,subsectionId);
let data = await subsection.findById(subsectionId);
    //validation
    if (  !subsectionId || data  ) {
       return res.json({
        success: false,
        message: "subsectionId does not exists",
      });
    }
    //return
    return res.json({
      success: true,
      message: "subsection is updated successfully .",
      subsection:data,
      
    });
  } catch (err) {
    return res.json({
      success: false,
      message: "subsection failed to  update .",
      error: err.message,
    });
  }
}
