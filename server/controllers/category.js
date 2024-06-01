const { default: mongoose } = require("mongoose");
const categoryschema = require("../models/category");

//create category ki api 
exports.createcategory = async function(req,res){
    try{
        const {category,description} = req.body ;
        //validation 
        if(!category || !description){
            return res.json({
                success:false,
                message:"please fill all details." ,
                
            })
        }
        const data = await categoryschema.create({category:category,description:description});
        return res.json({
            success:true,data:data
        })
    }catch(err){
        return res.json({
            success:false,
            message:"category creation Failed." ,
            error: err.message
        })
    }
};

//get all category 
exports.showAllcategory = async function (req,res){
    try{
      
        //means sare find karo bss dhyaan rakhna ki category aur description ki values exist karti ho 
        const data = await categoryschema.find({},{category:true,description:true}).populate("list_of_that_course");
        return res.status(200).json({
            success:true,
            data
        })
    }catch(err){
        return res.status(500).json({
            success:false,
            message:"getcategory Failed." ,
            error: err.message
        })
    }
}


exports.categoryPageDetails = async function(req,res){
    try{
        console.log("category details",req.body);
        let {categoryId} = req.body ;
       //one you are looking for 
        const searchedcategory = await categoryschema.find({_id:categoryId}).populate({
            path: "list_of_that_course",
           // match: { status: "Draft" },
            populate: "ratings_and_reviews",
          }).exec();
console.log("search",searchedcategory);

        //validation
        if(!searchedcategory){
          return res.json({
            success:false,
            message:" not such category found or the course is empty" ,
          })
        }
//show some different courses 
const differentcategory = await categoryschema.find({_id:{$ne:categoryId}}).
populate({
    path: "list_of_that_course",
// match: { status: "Draft" },
    populate: "ratings_and_reviews",
  }
).exec();
console.log("different",differentcategory);

 // Get top-selling courses across all categories
 const allCategories = await categoryschema.find()
 .populate({
   path: "list_of_that_course",
 //  match: { status: "Published" },
   populate: {
     path: "Instructor",
 },})
 .exec();

//The flatMap() function in JavaScript is used to first map each element using a mapping function, and then flatten the result into a new array. It is similar to the map() method followed by flat() method.
const allCourses = allCategories.flatMap((category) => category.list_of_that_course);
const mostSellingCourses = allCourses.sort((a, b) => b.createdAt - a.createdAt).slice(0, 10);
console.log("rest dat ais ",mostSellingCourses,allCourses);

return res.json({
   success:true ,
   message:"successfully got the data now work for top selling categories" ,
   data: {searchedcategory ,differentcategory,mostSellingCourses}
   
})
      }
      catch(err){
              return res.status(500).json({
                  success:false,
                  message:" Categorypagedetails function failed." ,
                  error: err.message
              })
          }
}