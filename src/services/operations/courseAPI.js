import { setcourse } from "../../slices/courseSlice";
import {courses} from "../api";
import { apiconnector } from "../apiconnector";
import toast from "react-hot-toast";
import {setmycourse} from "../../slices/courseSlice";

export async function getInstructorcourses (token){
    try{
        const api = courses.GETMYCOURSE;
        console.log(token);
 const res = await apiconnector("GET",api,null,{Authorization:`Bearer ${token}`});
 console.log("the response from connector is");
 console.log(res);
 return res.data.data;
    }
    catch(err){
        console.log("failed to fetch instructor details and courses",err);
        toast.error("failed to load courses os the instructor")
    }
}
export async function removecoursefromlist(courseId,token,navigate){
try{
    const api = courses.DELETECOURSE;
    console.log(api,{courseId},token);
    let d = {courseId};
    const res = await apiconnector("DELETE",api,d,{Authorization:`Bearer ${token}`});
  console.log("data outcme deletion",res); 
   if(res.data.success){
        toast.success("removed successfully");
    
    return res;
}
   // navigate("/purchase-history");
}
catch(err){
    console.log(" delete course error",err);
    toast.error("failed delete course")
}
}
export async function updatecourse(data,token){
    try{
        console.log('edit course',data);
        const api = courses.EDITCOURSE;
        //const updates = Object.fromEntries(data.updates.entries());
        console.log(api, data, token);
        const res = await apiconnector("PUT",api,data,{ Authorization:`Bearer ${token}`});
        if(res.data.success){toast.success("course edited successfully");}
        console.log("edited course data is:",res);
    return res;
    }
    catch(err){
        console.log("failed to  update courses",err);
        toast.error("failed to update course");
    }
}
export async function CreateCourse(data,token){
 
        try{
            let api = courses.CREATECOURSE;
            console.log("create course starts interaction",data,token,api);
            const response = await apiconnector("POST", api, data, { 
                "Content-Type": "multipart/form-data",   Authorization: `Bearer ${token}`, })
    console.log("CREATE COURSE API RESPONSE............", response)
          
           if(response.data.success){
           toast.success("course created successfully");
        return response;}
            toast.error("failed to course creation");
            return;

        }catch(err){
            console.log("failed to   create courses",err);
            toast.error("failed to create  course")
        }
   
} 
export async function GetCourseDetails (courseId){
    console.log("fetching course data");
    try{
        const api = courses.GETCOURSEDETAILS;
        const data = {courseId};
        const res = await apiconnector("POST",api,data);
        console.log("the response is ",res,api,data);
        return res;
    }
    catch(err){
        console.log("error occurred during fetching course details",err);
    }
}
export async function getFullCourseDetails(courseId,token){
    try{
        const api = courses.GETFULLCOURSEDETAILS;
        const response = await apiconnector("POST",api,{courseId},{Authorization:`Bearer ${token}`})
        console.log("getfullcourse details response is",response.data);
        if(response?.data?.success){
            toast.success("viewcourse fetched successfully");
        return response.data.data;
        }
        toast.error("viewcourse  failed to fetch.");

        
    }
    catch(err){
        console.log("error in getfullcoursedetails",err);
    }
}
// export async function getAllmyCourses(){
//     try{
// const api = courses.GETMYCOURSE ;
//  const res = await apiconnector("GET",api,null,{Authorization:`Bearer ${token}`});
//  console.log("the response from connector is");
//  console.log(res.data.data);
 
//  return res.data.data;
//     }
//     catch(err){
//         console.log("failed to fetch instructor  courses",err);
//         toast.error("failed to load courses os the instructor")
//     }
// }