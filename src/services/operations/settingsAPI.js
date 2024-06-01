import { authEndpoints, profileendpoints } from "../api";
import { apiconnector } from "../apiconnector";
import {toast} from "react-hot-toast";
import { setProfile,setUser } from "../../slices/profileSlice";
export   function passwordupdation (email,password,newpassword,confirmnewpassword){
    return async  ()=>{
        try{
            console.log("backend call")
            const ChangePassword_api = authEndpoints.CHANGEPASSWORD_API;
            const response = await apiconnector("PUT",ChangePassword_api,{email,password,newpassword,confirmnewpassword});
            console.log("the response for changing password is :");
            console.log(response);
           if(response.data.success){toast.success("Successfully password updated.");}
          else{ toast.error("failed to update password.")}
        }
        catch(err){
            console.log("error while pasword updation");
            toast.error("Failed to update password. Please try again!");
            return ;
        }
    }
}
export function profileupdation(data,token,navigate){
    return async (dispatch)=>{
        try{
            console.log("backend profile updation call starts");
            console.log(data);
            
            const { firstname, lastname, About, profession, gender, contactNumber ,Dob} = {...data} ;
          console.log(firstname, lastname, About, profession, gender, contactNumber ,Dob);
            const updateprofile_api = profileendpoints.UPDATEPROFILE_API;
            const response = await apiconnector("PUT",updateprofile_api,{firstname, lastname, About, profession, gender, contactNumber ,Dob,token});
            console.log("the response is ");
            console.log(response);
            if(response.data.success){
                toast.success("Successfully profile updated");
                const res = response.data.profile; 
                console.log("the res is",res);
           dispatch(setProfile(res)); 
         }
            else{toast.error("Profile failed to updated")};

          dispatch(setUser(response.data.user));
            navigate("/dashboard/my-profile");
            return ;
        }
        catch(err){
            console.log("error while profile updation");
            toast.error("Failed to update profile. Please try again!");
            return ;
        }
    }
}