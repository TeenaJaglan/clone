import { apiconnector } from "../apiconnector";
import { ratingsendpoints ,courseProgressendpoints} from "../api";
import toast from "react-hot-toast";

export const createratings = async(data,token) =>{
 const api = ratingsendpoints.CREATERATING_API;
console.log(api,data,token);
const response = await apiconnector("POST",api,data,{Authorization:`Bearer ${token}`});
if(response.data.success){
    toast.success("review submitted successfully");return response;
}
else{
    toast.error("something went wrong while submitting your feedback");
}

}

//iska backend and frontend dono sambhalna h
export const markLectureAsComplete = async(data,token)=>{
try{
    const api =courseProgressendpoints.MARKLECTUREASCOMPLETED_API;
    console.log("connectore part",api,data)
    const res = await apiconnector("POST",api,data,{Authorization:`Bearer ${token}`});
    console.log(res);
    if(res.data.success){
        toast.success("mark as completed");
        return res.data;
    }
    toast.error("failed to mark as completed");
}catch(err){
    console.log("error in marking as completed",err);
}
}

async function getCourseReviews(id,token){   
    try{
        const get_ratings_api = ratingsendpoints.GETCOURSERATINGS_API;
        
       const  response = await apiconnector("GET",get_ratings_api,{courseId:id},{Authorization:`Bearer${token}`});
       
        console.log("rating data:",response.data.data);
    }catch(err){
    console.log("error while  fetching reviews");
    console.log(err);
    }
    }