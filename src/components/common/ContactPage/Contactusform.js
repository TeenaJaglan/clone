import React, { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { contactus } from "../../../services/api";
import { apiconnector } from "../../../services/apiconnector";
import {toast} from "react-hot-toast";
import countrycode from "../../../data/countrycode.json"
import ContactDetails from "./ContactDetails";
export default function Contactusform() {
  const [loading, setloading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessfull },
  } = useForm();
  useEffect(() => {
    //data successfull hone ke baad form reset kardo
    if (isSubmitSuccessfull) {
      reset({
        email: "",
        firstname: "",
        lastname: "",
        message: "",
        phoneNo: "",
      });
    }
  }, [isSubmitSuccessfull, reset]); //reset fnction isliye qki jab bhi form ka structure differ kare jese new field introduce ho jati h toh same cheez execute ho
  async function submitContactForm(data) {
    const toastId = toast.loading("Loading...")
    console.log("the data is :");
    console.log(data);
    const {email,
        firstname,
        lastname,
        message,
        phoneNo,
       countrycode } = data;
    try {
       
      const CONTACTUS_API = contactus.CONTACTUS_API;
 
      const response = await apiconnector("POST", CONTACTUS_API, {email,
        firstname,
        lastname,
        message,
        phoneNo,
        countrycode});
    
      if(response.data.success)toast.success("Your Message has been sent successfully!");
    } catch (err) {
      console.log("error occurred in contact form submission");
      toast.error("Oops! Something went wrong.");
    }
    toast.dismiss(toastId);
  }
  return (
    <div className="text-white  mx-auto flex flex-col  justify-center items-start">
      <form
        onSubmit={handleSubmit(submitContactForm)}
        className=" justify-center flex flex-col mx-auto w-10/12"
      >
        <div className=" w-full   flex flex-row justify-between  py-2 flex-wrap  ">
          {/* firstname */}
          <div className=" px-2 flex flex-col">
            <label htmlFor="firstname">First Name</label>
            <input
              type="text"
              name="firstname"
              id="firstname"
              className="bg-richblack-800 h-[3rem] px-2 py-4  border-b-[1px]  border-white rounded-[10px] w-full"
              placeholder="Enter your Firstname"
              {...register("firstname", { required: true })}
            />
            {errors.firstname && <p>Please enter the complete name.</p>}
          </div>
          {/* lastname */}
          <div className=" pr-4 pl-2 flex flex-col">
            <label htmlFor="lastname">Last Name</label>
            <input
              type="text"
              name="lastname"
              id="lastname"
              className="bg-richblack-800 h-[3rem] px-2 py-4  border-b-[1px] border-white rounded-[10px] w-full"
              placeholder="Enter your Lastname"
              {...register("lastname")}
            />
          </div>
        </div>
        {/* emailaddress */}
        <div className="w-full py-2  mx-auto">
          <div className="flex flex-col  justify-center p-3   ">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-richblack-800 h-[3rem] px-2 py-4  border-b-[1px] border-white rounded-[10px]"
              placeholder="Enter your Email Address"
              {...register("email", { required: true })}
            />
            {errors.email && <p>Please enter the the valid email Address.</p>}
          </div>
          {/* phone Number */}
          <div className="flex flex-col  justify-center p-3  mx-auto">
            <label htmlFor="phoneNo">Phone Number</label>
            <div className="flex flex-row justify-between">
            <select className="bg-richblack-800 text-richblack-5 w-[58px] rounded-[15px]">
              {
                countrycode.map((countrycode,index)=>(
                  <option key ={index} {...register("countrycode",{required:true})}>{countrycode.code}   -{countrycode.country}</option>
                ))
              }
            </select>
            <input
              type="text"
              name="phoneNo"
              id="phoneNo"
              className="bg-richblack-800 h-[3rem] px-2 py-4  border-b-[1px] border-white rounded-[10px] w-10/12"
              placeholder="12345 67890"
              {...register("phoneNo", { required: true })}
            /></div>
            {errors.phoneNo && <p>Please enter the valid Phone Number.</p>}
          </div>
          {/* message */}
          <div className="flex flex-col  justify-center p-3  mx-auto">
            <label htmlFor="message" className="py-1">Message</label>
            <textarea
              name="message"
              id="message"
              cols={30}
              rows={8}
              className="bg-richblack-800 h-[2rem] px-2 py-4  border-b-[1px] border-white rounded-[10px]"
              placeholder=""
              {...register("message", { required: true })}
            />
            {errors.message && (
              <p>the length of the message should be greater than ten.</p>
            )}
          </div>
          <div className="flex flex-col  justify-center items-center py-4  mx-auto">
            <button className="bg-yellow-50 text-black p-2  hover:p-2  scale-95 font-semibold text-center w-full transition-all duration-200 rounded-lg hover:drop-shadow-[0]">
              <Link to="">
                send Message
              </Link>
            </button>
          </div>
        </div>
      </form>
      
    </div>
  );
}

// benefit of using react-form -hook  is that it provides a simple and easy way to handle the form in our application. isse hume apne end se error or state handling nahi karni padti h  register m states add ki jati h errors- se error detect hote h
