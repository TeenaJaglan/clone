const userschema = require("../models/user");
const course = require("../models/course");
const ratings_and_reviews = require("../models/ratings_and_reviews");
const mongoose = require("mongoose");

exports.createRatings = async function(req,res){
    try{
    let {rating,suggestion,courseId} = req.body;
let user = req.user.id;
//validation
console.log(rating,suggestion)
if(!rating || !suggestion){
    return res.json({
        success:false,
        message:"Please fill all the credentials ." 
    });
}
courseId = new mongoose.Types.ObjectId(courseId);
user = new mongoose.Types.ObjectId(user);
//check if the user is enrolled in the course or not
const verify = await course.findById({_id:courseId,
    students_enrolled:{
        $elemMatch:{$eq:user.id}
    }
});

//way-2 for verification
// const verify = await course.findById({courseId}).students_enrolled;
// const verification = verify.includes(user._id);

if(!verify){
    return res.json({
        success:false,
        message:"you are not enrolled in the course." 
    });
}
console.log("thestudent is enrolled in the course:",verify);

// if user already reviewed the course ?
const review = await ratings_and_reviews.findOne({name:user,
    to_which_instructor:{
    $elemMatch:{$eq:courseId}
}});

if(review!=null){
    return res.status(500).json({
        success:false,
        message:"user already reviewd the course ,hence Failed." ,
        
    })
}
console.log("check if he/she has already reviewed or not.",review)
const ratingreview = await ratings_and_reviews.create({name:user,rating,suggestion,to_which_Instructor:courseId});
//update course 
console.log(ratingreview,"rating review ");
const updatedcourse = await course.findByIdAndUpdate({_id:courseId},{
    $push:{ratings_and_reviews:ratingreview._id}
}
,{new:true}).populate("ratings_and_reviews").exec();
console.log(updatedcourse);

return res.json({
    success:true,
    message:"rating and review created successfully." ,
    data:ratingreview,
    course:updatedcourse
})
}
catch(err){
        return res.status(500).json({
            success:false,
            message:"createRating Failed." ,
            error: err.message
        })
    }

}

exports.getAverageRating = async function(req,res){
    try{
      const {courseId} = req.body ; 
    //   Aggregation in MongoDB refers to the process of performing operations on multiple documents within a collection to compute results. It involves grouping values from various documents, processing data records, and returning calculated outcomes. Aggregation operations in MongoDB enable users to perform a wide range of tasks such as grouping, sorting, performing calculations, analyzing data, and more.
      const averagesum = await ratings_and_reviews.aggregate([
       {
         $match:{to_which_Instructor: new mongoose.Types.ObjectId(courseId)}
    }
      ,{
        $group:{
            _id:null,
            averagerating:{$avg:"$rating"}
        }
    }
    ]); //will be stored in form of an array 
      console.log("average sum ",averagesum);
      if(averagesum.length>0){
        return res.json({
        success:true,
        message:"average rating created successfully." ,
        data: averagesum[0].averagerating
    })
      }
    return res.json({
        success:true,
        message:"average rating created successfully. which is empty hence 0" ,
        data: 0
    })
    }
    catch(err){
            return res.status(500).json({
                success:false,
                message:"getAverage Rating can not be acco mpolished." ,
                error: err.message
            })
        }
       
}

exports.getAllRatings = async function(req,res){
    try{
      //  const {courseId} = req.body ;
        // const result = await ratingandreview.aggregate({
        //     $Match:mongoose.Types.ObjectId(courseId)
        // },{
        //     $sort:{rating:1}
        // })
        const result = await ratings_and_reviews.find({}).sort({rating:1}).populate("name").populate({path:"to_which_Instructor",select:"course_name"}).exec();

      return res.json({
          success:true,
          message:"All reviews fetched successfully" ,
          data: result
      })
      }
      catch(err){
              return res.status(500).json({
                  success:false,
                  message:"all reviews can't be fetched." ,
                  error: err.message
              })
          }
}

exports.getcourseRatings = async function(req,res){
    try{
       const {courseId} = req.body ;
        const results = await ratings_and_reviews.aggregate({
            $Match:mongoose.Types.ObjectId(courseId)
        },{
            $sort:{rating:1}
        })
        
        const result = await ratings_and_reviews.find({}).sort({rating:1}).populate("name").populate({path:"to_which_Instructor",select:"course_name"}).exec();

      return res.json({
          success:true,
          message:"All reviews fetched successfully" ,
          data: result,
          particular_course:results,
      })
      }
      catch(err){
              return res.status(500).json({
                  success:false,
                  message:"all reviews can't be fetched." ,
                  error: err.message
              })
          }
}

