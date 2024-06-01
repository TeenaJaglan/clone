//must h REACT_APP lagana
const base_url = process.env.REACT_APP_BASE_URL

export const authEndpoints = {
    RESETPASSWORDTOKEN_API : base_url +"/auth/ResetPasswordToken" ,
    OTP_API : base_url +"/auth/SendOtp" ,
    SIGNUP_API :  base_url+"/auth/SignUp",
    LOGIN_API : base_url + "/auth/LogIn" ,
    CHANGEPASSWORD_API : base_url +"/auth/ChangePassword"
   
}
export const categories ={
    CATEGORIES: base_url + "/course/ShowAllCategory",
    CATEGORYPAGEDETAILS :base_url+ "/course/GetCategoryPageDetails",
};
export const payment = {
    PAYMENT_API:base_url + "/payment/capturePayment",
    VERIFY_SIGNATURE_API:base_url + "/payment/verifyPayment",
    SEND_PAYMENT_SUCCESSFULL_EMAIL_API:base_url + "/payment/sendPaymentSuccessEmail"
}
export const courses = {
    GETRATINGS :base_url +"/course/GetAllRatings",
    GETMYCOURSE : base_url+"/course/GetInstructorDetails",
    DELETECOURSE: base_url+ "/course/DeleteCourse",
    EDITCOURSE: base_url +"/course/UpdateCourse",
    CREATECOURSE : base_url +"/course/CreateCourse",
    GETCOURSEDETAILS : base_url +"/course/GetCourseDetails",
    GETFULLCOURSEDETAILS:base_url +"/course/GetFullCourseDetails"
}
export const contactus = {
    CONTACTUS_API :base_url+ "/reach/ContactusPage" 
}
export const profileendpoints = {
     LOGOUT_API : base_url + "/profile/Delete-Profile",
     UPDATEPROFILE_API: base_url +"/profile/Update-Profile",
     ENROLLEDCOURSES_API :base_url +"/profile/Enrolled-courses",
     INSTRUCTORDETAILS : base_url +"/profile/Instructor-Dashboard",
     UPDATEPROFILEPIC : base_url +"/profile/Update-Profile-Pic",
}
export const sectionendpoints = {
    SECTION_API : base_url +"/course/CreateSection",
    SECTIONEDIT_API:base_url +"/course/UpdateSection",
    SECTIONDELETE_API:base_url +"/course/DeleteSection"
}
export const subsectionendpoints = {
    SUBSECTION_API : base_url +"/course/CreateSubSection",
    SUBSECTIONEDIT_API:base_url +"/course/UpdateSubSection",
    SUBSECTIONDELETE_API:base_url +"/course/DeleteSubSection",
    GETSUBSECTION_API : base_url +"/course/GetSubsection"
}
export const ratingsendpoints ={
    CREATERATING_API: base_url+"/course/createRatings",
    GETCOURSERATINGS_API : base_url +"/course/GetCourseratings"
}
export const courseProgressendpoints = {
    MARKLECTUREASCOMPLETED_API :base_url + "/course/Markascompleted"
}