import { sectionendpoints } from "../api";
import {apiconnector} from "../apiconnector";
import toast from "react-hot-toast";
import { setmycourse } from "../../slices/courseSlice";
export const SectionCreation = async (dispatch,data,token)=>{

    try{
        console.log("section creation starts");
        const api = sectionendpoints.SECTION_API;
        console.log("data is",data);
        const response = await apiconnector("POST",api,data,{Authorization: `Bearer ${token}`});
        console.log("response is",response);
        if(response?.data?.success){
            toast.success("section creation successfull");
            console.log("final ans is",response.data.data);
            dispatch(setmycourse(response.data.data));
        }
    }
    catch(err){
       toast.error("error in section creation ");
        
    }
}

export async  function SectionEdit(data,token){
    try{
        console.log("section editing starts");
        const api = sectionendpoints.SECTIONEDIT_API;
        const response = await apiconnector("PUT",api,data,{Authorization: `Bearer ${token}`});
        console.log("response in editing is",response);
        return response;
    }
    catch(err){
        console.log("error in section creation ");
        return ;
    }
}

export async  function SectionDeletion(data,token){
    try{
        console.log("section deletion starts");
        const api = sectionendpoints.SECTIONDELETE_API;
        const response = await apiconnector("DELETE",api,data,{Authorization: `Bearer ${token}`});
        console.log("response  for deletion is ",response);
        return response;
    }
    catch(err){
        console.log("error in section deletion ");
        return ;
    }
}

