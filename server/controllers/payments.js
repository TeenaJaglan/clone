const {instance} = require("../config/razorpay");
const crypto = require("crypto")
const course = require("../models/course");
const user = require("../models/user");
const courseProgress = require("../models/courseProgress");
const {paymentSuccessEmail} = require("../mail-templates/paymentSuccessEmail");
const mongoose = require("mongoose");
const mailsender = require("../utils/mailsender");
const { courseEnrollmentEmail} = require("../mail-templates/courseEnrollementEmail");
const Razorpay = require("razorpay");


//initiate the razorpay order
exports.capturedPayment= async function(req,res){
    
        const {courses} = req.body ; 
        const userId = req.user.id ;
         //validation 
         console.log("PAYMENT BACKEND STARTS",courses,userId);
         if(courses.length === 0){
            return res.json({success:false, message:"Please provide Course Id"});
        }

        let totalAmount=0;
         for(let courseId of courses){
            //check if the student is enrolled or not
            courseId = new mongoose.Types.ObjectId(courseId);
            try{
            const singlecourse = await course.findById({_id:courseId});
            if(!singlecourse){
                return res.status(200).json({success:false, message:"Could not find the course"});
            }
            if(singlecourse.students_enrolled===userId){
                return res.json({success:false,
                    message:"for loop m crash hua",
                    error:"student is already enrolled in the course"});
            }
            totalAmount += singlecourse.price;}
            catch(err){return res.json({success:false,message:err.message})}
         }
//create order 
 const options= {
    amount:totalAmount*100,
    currency:"INR",
    receipt:Math.random(Date.now()).toString(),
    // notes:{
    //     courses,userId
    // }
 }
    
//initiate payment using razorpay
 try{
    console.log("payment initialization starts");
    let payment =  await instance.orders.create(options);
 console.log(payment);  
 return res.json({
     success:true,
     show:"Payment successfully initiated ." ,
     message:payment,
 })
 }
 catch(err){
     return res.json({
         success:false,
         message:"Payment failed to initiate." ,
         error:err
     })
 }


}


exports.verifySignature = async function(req,res){
    console.log("verify signature");
    console.log(req.body);
    try{
      const razorpay_order_id = req.body?.razorpay_order_id;
      const razorpay_payment_id = req.body?.razorpay_payment_id;
      const razorpay_signature = req.body?.razorpay_signature;
      const courses = req.body?.courses;
      const userId = req.user.id;

      if(!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !courses || !userId) {
        return res.status(200).json({success:false, message:"Payment Failed because some credentials are empty"});   
 }

 let body = razorpay_order_id +"|" + razorpay_payment_id;
 const expectedSignature = crypto.createHmac("sha256",process.env.RAZORPAY_SECRET ).update(body.toString()).digest("hex");

console.log("checking starts",expectedSignature,razorpay_signature,typeof expectedSignature,typeof razorpay_signature );
 if(expectedSignature === razorpay_signature) {
    console.log("true");
    await enrollStudents(courses, userId, res);                   //enroll karwao student ko
    return res.status(200).json({success:true, message:"Payment Verified"});    //return res
}
console.log("verification failed");
return res.status(200).json({success:"false", message:"Payment Failed"});
    }
    catch(err)
    {
        console.log("the error while payent verification is",err);
    }
}

const enrollStudents = async function (courses,userId,res){
  try{ 
     console.log("enrolling students",courses,userId);
    for(let courseId of courses){
        courseId = new mongoose.Types.ObjectId(courseId);
        let uid  = new mongoose.Types.ObjectId(userId);
        console.log(courses,userId);
        const enrolledcourse = await course.findByIdAndUpdate({_id:courseId},{ $push:{
            students_enrolled:uid,
    }},{new:true});
    console.log("enrolledcourses",enrolledcourse);
        //validation
        if(!enrolledcourse){
            return res.status(200).json({success:false, message:"Could not find the course"});
        }
        
        const courseprog = await courseProgress.create({
            course_id:courseId,
            user_id:uid,
           
        })
    console.log("courseprog",courseprog);

        //add this user in courses
        const enrolledStudent = await user.findByIdAndUpdate(userId,  {$push:{ courses: courseId,  courseProgress: courseprog._id, }},{new:true});
        console.log("enrolledStudent",enrolledStudent)
        //mail sender
        const sendmail = await mailsender(enrolledStudent.email,`Successfully Enrolled into ${enrolledcourse.course_name}`,  courseEnrollmentEmail(enrolledcourse.course_name, `${enrolledStudent.firstname}`));
        console.log("payment verification done successfully");
    }
}
catch(error) {
    console.log(error);
    return res.status(500).json({success:false, message:error.message});
}
}

exports.sendPaymentSuccessEmail = async function(req,res){
    console.log("payment successfull email starts");
    try{
        const {orderId, paymentId, amount} = req.body;

        const userId = req.user.id;
        if(!orderId || !paymentId || !amount || !userId) {
            return res.status(400).json({success:false, message:"Please provide all the fields"});
        }
        //send mail to the student
        const enrolledStudent = await user.findById(userId);
        const mail = await mailsender(enrolledStudent.email,
            `Payment Recieved`,
             paymentSuccessEmail(`${enrolledStudent.first_name}`,
             amount/100,orderId, paymentId));
    }
    catch(error) {
        console.log("error in sending mail", error)
        return res.status(500).json({success:false, message:"Could not send email"})
    }
}



//verify signature of razorpay and the server
// exports.verifySignature = async function(req,res){
//     try{
//       const razorpay_order_id = req?.body.razorpay_order_id;
//       const razorpay_payment_id = req.body?.razorpay_payment_id;
//       const razorpay_signature = req.body?.razorpay_signature;
//       const courses = req.body?.courses;
//       const userId = req.user.id;

// const webhookServerSecret = "1234556"; //let it is our secret (server)
// const signature = req.headers("x-razorpay-signature"); //wo secret jo razorpay ne http post call maar ke event occur hone ke baad bheja h 
// //since razorpay se jo signture aayega wo encrypted way m hoga so as to ensure security therefore webhookserversecret ko bhi encrypt karna chahiye hume 

// //step-A
// const shasum = crypto.createHmac("sha256",webhookServerSecret);//->hmac object
// console.log(shasum);
// //convert to string 
// shasum.update(JSON.stringify(req.body));
// //hash based message authentication code takes 2 arguments-algorithm and a secret key jiske aadhr pr  
// //sha-> secure hashing algorithm  isse decrypt nhi kar sakte h 
// const digest = shasum.digest("hex");
// //-> jab bhi kisi hashing alg. ko kisi text pr run kia jata h toh jo output aata h  use ek term se represent kia jata h called digest which is in hexadecimal format 

// //now verify if the razorpay signature aand digest are same or not
// if(signature==digest){
//     console.log("payment is authorised.");
//     //action
//     //course enroll 
//     const enrolledcourse = await course.findByIdAndUpdate({courseId},{$push:{
//         students_enrolled:req.user._id
//     }},{new:true});
//     if(!enrolledcourse){
//         return res.json({
//             success:false,
//             message:"no such course found"
//         })
//     }
//     const enrolleduser = await user.findByIdAndUpdate({userId},{$push:{
//         courses:courseId
//     }},{new:true});
//     const mail = mailsender(enrolleduser.email,"you are welcomed to this new course","you are welcomed to this new course");
//     return res.json({
//         success:true,
//         message:"you are successfully enrolled"
//     })
// }
// else{
//     return res.json({
//         success:false,
//         message:"signature did not matched"
//     })
// }
//     }catch(err){
//         return res.json({
//             success:false,
//             message:"server error , verification failed .",
//              error:err.message
//         })
//     }
// }

// exports.enrollStudents = async function(courses,userId,res){
//     try{

// if(!courses|| !userId) {
//     return res.status(400).json({success:false,message:"Please Provide data for Courses or UserId"});
// }
// for(const courseId of courses) {
//  try{                                            //find the course and enroll the student in it
//     const enrolledCourse = await course.findOneAndUpdate({_id:courseId}, {$push:{studentsEnrolled:userId}}, {new:true},)            
    
//     if(!enrolledCourse){
//         return res.status(500).json({success:false,message:"Course not Found"});
//     }
//     // created courseProgress for enrolled Courses in DB;
//     const courseProgress = await courseProgress.create({
//         courseID:courseId,
//         userId:userId,
//         completedVideos: [],
//     })

//     //find the student and add the course to their list of enrolledCOurses
//     const enrolledStudent = await user.findByIdAndUpdate(userId,  {$push:{ courses: courseId,  courseProgress: courseProgress._id, }},{new:true})
        
//     ///Send mail to the Student;
//     const emailResponse = await mailsender( enrolledStudent.email, `Successfully Enrolled into ${enrolledCourse.courseName}`,  courseEnrollmentEmail(enrolledCourse.courseName, `${enrolledStudent.firstName}`)) 
// }
//     catch(error) {
//         console.log(error);
//         return res.status(500).json({success:false, message:error.message});
//     }
// }
//         return res.json({
//             success : true,
//             message : 'email has been sent',
//         }) 
//     }
//     catch(err){
//         return res.json({
//             succes:false,
//             message:"Failed to send Payment succesfull email ." ,
//             error:err.message
//         })
//     }
// }

// exports.sendPaymentSuccessFullEmail = async function(req,res){
//     try{
// const {courseId,userId,amount,orderId,paymentId} = req.body;
// if(!courseId|| !userId || !amount || !orderId || !paymentId){
//     return res.json({
//         success: false,
//         message : "please provide all the information"
//     })
// }
// const enrolledstudent = await user.findById({userId});
// await mailsender(enrolledstudent.email,paymentSuccessEmail(enrolledstudent.firstname,amount/100,orderId,paymentId));
// return res.json({
//     success : true,
//     message : 'email has been sent',
// })    
// }catch(err){
//         return res.json({
//             succes:false,
//             message:"Failed to send Payment succesfull email ." ,
//             error:err.message
//         })
//     }
// }