const course = require("../models/course");
const sectionschema = require("../models/section");
const subsection = require("../models/subsection");
const mongoose = require('mongoose');

exports.createsection = async function (req, res) {
  try {
    const { section_name , course_name} =
      req.body;
      //validation
      if( !section_name || ! course_name){
        return res.json({
            success:false,
            message: "please fill all the credentials."
        })
      }
 //section create karo
    const section = await sectionschema.create({section_name});
 //course update karo
 const courseupdate =await course.findOneAndUpdate({course_name},{
    $push:{
        courseContent:section._id
    }
 },{new:true}).populate({
  path:"courseContent",
  populate:[{
    path:"subsection"
  }]
}).exec();   
//hw:kis way sepopulate ko use kia jaye so that section and subsection dono populate ho jaye
 //in the end return 
 return res.json({
    success: true,
    message: "section is created successfully .",
    data:courseupdate
  });

  } catch (err) {
    return res.json({
      success: false,
      message: "section could not be created .",
      error: err.message,
    });
  }
};

exports.updatesection = async function (req, res) {
  try {
    //note-sectionid will remains same always
    let {section_name , sectionId ,Course_Id } =
    req.body;
    sectionId = new mongoose.Types.ObjectId(sectionId);
    Course_Id = new mongoose.Types.ObjectId(Course_Id);

    //validation
    if( !section_name || ! Course_Id){
      return res.json({
          success:false,
          message: "please fill all the credentials."
      })
    }
  
//section update karo
  const section = await sectionschema.findByIdAndUpdate({_id:sectionId},{
    section_name:section_name
  },{new:true});
console.log("section update",section);
//course update karo
const courseupdate =await course.findOne({_id:Course_Id}).populate("courseContent").exec();   
console.log("course update",courseupdate);

//in the end return 
return res.json({
  success: true,
  message: "section is updated successfully .",
  data :courseupdate
});

  } catch (err) {
    return res.json({
      success: false,
      message: "section failed to update.",
      error: err.message,
    });
  }
};

exports.deletesection = async function (req, res) {
  try {
    let {sectionId ,course_Id} =
    req.body; 
    sectionId = new mongoose.Types.ObjectId(sectionId);
    course_Id = new mongoose.Types.ObjectId(course_Id);
    const removefromcourse = await course.findByIdAndUpdate({_id:course_Id},{
      $pull:{
        courseContent:sectionId
      }
    },{new:true}).populate("courseContent");
    //delete section
    const deletesection = await sectionschema.findByIdAndDelete({_id:sectionId});
    // do we need to delete this section from the course also ?-testing time pata chalega
    console.log("deleted successfully");
    //in the end return 
return res.json({
    success: true,
    message: "section is  deleted successfully .",
    course:removefromcourse
  });

  } catch (err) {
    return res.json({
      success: false,
      message: "section failed to  delete .",
      error: err.message,
    });
  }
};
