import { apiconnector } from "../apiconnector";
import { subsectionendpoints } from "../api";
import toast from "react-hot-toast";
export async  function SubSectionCreation(data,token){
    try{
        console.log("subsection creation starts");
        const api = subsectionendpoints.SUBSECTION_API;
        console.log("the data os",data,token,api);
        console.log(api);
        const response = await apiconnector("POST",api,data,{ 
            "Content-Type": "multipart/form-data",   Authorization: `Bearer ${token}`, });
        console.log("response is",response);
        if(response.data.success){
            toast.success("subsection created");}
        else{toast.error("subsection  failed to create");}
        return response;
    }
    catch(err){
        console.log("error in section creation ");
        return ;
    }
}

export async  function SubSectionEdit(data,token){
    try{
        console.log("section editing starts");
        const api = subsectionendpoints.SUBSECTIONEDIT_API;
        console.log("arguments are",data,token,api);
        const response = await apiconnector("PUT",api,data,{ 
            "Content-Type": "multipart/form-data",   Authorization: `Bearer ${token}`, });
        console.log("response in editing is",response);
        if(response.data.success)toast.success("subsection UPDATED");
        else{toast.error("subsection  failed to update");}

        return response;
    }
    catch(err){
        console.log("error in section creation ");
        return ;
    }
}

export async  function SubSectionDeletion(data,token){
   
    try{
        console.log("subsection deletion starts");
        const api = subsectionendpoints.SUBSECTIONDELETE_API;
        console.log("the data is",data);
        const response = await apiconnector("DELETE",api,data,{Authorization: `Bearer ${token}`});
        console.log("response  for deletion is ",response);
        if(response.data.success){toast.success("subsection deleted");}
        else{toast.error("subsection  failed to delete");}
        return response;
       
    }
    catch(err){
        console.log("error in section deletion ");
        return ;
    }

}

export async function SubsectionFetching(data){
    try{
        console.log("subsection fetching starts");
        const api = subsectionendpoints.GETSUBSECTION_API;
        console.log("the data to fetch subsection is : ",data);
        const response = await apiconnector("GET",api,data);
        console.log("response  for deletion is ",response);
        if(!response.data.success){toast.error("subsection  failed to fetch");return ;}
      
        return response;
       
    }
    catch(err){
        console.log("error in subsection fetching ");
        return ;
    }
}