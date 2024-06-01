import {profileendpoints} from "../api";
import { apiconnector } from "../apiconnector";
import { setUser } from "../../slices/profileSlice";

export  async function enrolledcourseslist (token){
    
    try{
        console.log("backend integration with enrolled courses");
        console.log(token);
        const enrolledcourse_api = profileendpoints.ENROLLEDCOURSES_API;
        const res = await apiconnector("GET",enrolledcourse_api,{token,},{Authorization: `Bearer ${token}`,});
        console.log("res of enrolled courses is");
        console.log(res);
        return res;
    }catch(err){
        console.log("error during backend integration with enrolled courses");
    }

}

export async function GetInstructorDashboard(token){
try{
    let api = profileendpoints.INSTRUCTORDETAILS;
    const res =await apiconnector("GET",api,null,{Authorization:`Bearer ${token}`})
    console.log(res);
    return res?.data?.courses;
}catch(err){
    console.log("error during backend integration with Instrucotr dashboard.");
}
}

export async function Updateprofileimage(dispatch,file,token){
    try{
        let api = profileendpoints.UPDATEPROFILEPIC;
        const res =await apiconnector("PUT",api,{displayprofile:file},{"Content-Type":"multipart/form-data",Authorization:`Bearer ${token}`})
        console.log("profile-pic response",res);
        if(res.data.success){
            dispatch(setUser(res.data.data))}
        return res.data.data;
    }catch(err){
        console.log("error while uploading profile pic",err);
    }
}