import {categories} from "../api";
import { apiconnector } from "../apiconnector";
import toast from "react-hot-toast";

 export async function getcategory() {
    try {
      console.log(categories.CATEGORIES);
      const res = await apiconnector("GET", categories.CATEGORIES);
      console.log("response of add copurse category is", res.data.data);
      return res.data.data ;
    } catch (err) {
      console.log("error occurred during category fetching in curse", err);
      toast.error("failed to fetch categories");
    }
  }

  export async function getcategorydetails(categoryId){
    try{
      console.log("fetching category");
      const data = {categoryId:"65e40bf2631b13f6c1c57dea",}; //hardcoded for testing purpose
      const api = categories.CATEGORYPAGEDETAILS;
      console.log(categoryId,api,data);
      const response = await apiconnector("POST",api,{categoryId,});
      console.log("details are",response);
      
      return response;
    }catch(err){
      console.log("error in getting one page details",err);
    }
  }