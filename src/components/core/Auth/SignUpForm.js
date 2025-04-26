import React,{useEffect} from "react";
import CTAButton from "../HomePage/Button";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import Passwordbox from "../../common/passwordbox";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {setsignUpData} from "../../../slices/authSlice";
import { sendOtp } from "../../../services/operations/authAPI";
import { useNavigate } from "react-router-dom";
export default function SignUpForm() {
  const [showpassword, setshowpassword] = useState(false);
  const [showpassword2, setshowpassword2] = useState(false);
  const {signUpData} = useSelector((state)=>state.auth);
  const [account,setaccount] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formdata, setformdata] = useState({
    accountType:"",
    firstname: "",
    lastname: "",
    emailaddress: "",
    password: "",
    confirmpassword: "",
  });


  function handleonChange(e){
setformdata((prev)=>({...prev,[e.target.name]: e.target.value}));
  }
  function handleonSubmit(e){
   e.preventDefault();
    console.log(formdata);
   if(formdata.password!=formdata.confirmpassword) return toast.error("Passwords do not match");
  // formdata.accountType = account?"Student":"Instructor";
   const signupdata = {...formdata};
   dispatch(setsignUpData(signupdata));
   console.log("signupdata is :");
   console.log(signUpData);
   dispatch(sendOtp(formdata.emailaddress,navigate))//end m kaha pahuchana h page ko
  }
  return (
    <form className="text-black flex mx-auto flex-col" >
      <div className="flex flex-row bg-richblack-800 border-b-[1px] border-white rounded-[25px] w-fit justify-evenly text-white my-4 font-bold ">
        <label  onClick={(e) => {e.preventDefault();setaccount(true); 
        formdata.accountType = "Student";}}
        className={` p-4 ${account?"bg-richblack-700 rounded-[25px]":""}`}>
          <p>Instructor</p>
        </label>
        <label 
             className={` p-4 ${!account?"bg-richblack-700 rounded-[25px]":""}`}
        onClick={(e) => {e.preventDefault();setaccount(false);
          formdata.accountType = "Instructor";
        }}>
          <p>student</p>
        </label>
      </div>
      <div className="flex flex-row flex-wrap justify-between">
        <label htmlFor="" className="flex flex-col text-white my-2">
          <p>
            FirstName<sup className="text-pink-200">*</sup>
          </p>
          <input
            type="text"
            className="bg-richblack-800 h-[2rem] px-2 py-4  border-b-[1px] border-white rounded-[10px]"
            placeholder="Enter first name"
            name="firstname"
            value={formdata.firstname}
            onChange={handleonChange}
          ></input>
        </label>
        <label htmlFor="" className="flex flex-col text-white my-2">
          <p>
            LastName<sup className="text-pink-200">*</sup>
          </p>
          <input
            type="text"
            className="bg-richblack-800 h-[2rem] px-2 py-4  border-b-[1px] border-white rounded-[10px]"
            placeholder="Enter last name"
            name="lastname"
            value={formdata.lastname}
            onChange={handleonChange}
          ></input>
        </label>
      </div>
      <label htmlFor="" className="flex flex-col text-white my-2">
        <p>
          EmailAddress<sup className="text-pink-200">*</sup>
        </p>
        <input
          type="text"
          className="bg-richblack-800 h-[2rem] px-2 py-4  border-b-[1px] border-white rounded-[10px]"
          placeholder="Enter email address"
          name="emailaddress"
          value={formdata.emailaddress}
          onChange={handleonChange}
        ></input>
      </label>
      <div className="flex flex-row flex-wrap justify-between">
        <label htmlFor="" className="flex flex-col text-white my-2">
          <p>
            {" "}
            Password<sup className="text-pink-200">*</sup>
          </p>

          <div className="relative ">
            <input
              type={showpassword ? "text" : "password"}
              placeholder="Enter  Password"
              className="  text-richblack-5  bg-richblack-800 h-[2.5rem] pl-2 py-4 px-2 w-full my-2 border-b-[1px] border-white rounded-[10px]"
              name="password"
              value={formdata.password}
              onChange={handleonChange}
            />
            <span
              className="text-white bg-richblack-800  p-2 px-4 absolute right-[2.5px] top-[10px]"
              onClick={() => setshowpassword(!showpassword)}
            >
              {!showpassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </label>
        <label htmlFor="" className="flex flex-col text-white my-2">
          <p>
            Confirm Password<sup className="text-pink-200">*</sup>
          </p>
          <div className="relative ">
            <input
              type={showpassword2 ? "text" : "password"}
              placeholder="Confirm Password"
              className="  text-richblack-5  bg-richblack-800 h-[2.5rem] pl-2 py-4 px-2 w-full my-2 border-b-[1px] border-white rounded-[10px]"
              name="confirmpassword"
              value={formdata.confirmpassword}
              onChange={handleonChange}
            />
            <span
              className="text-white bg-richblack-800  p-2 px-4 absolute right-[2.5px] top-[10px]"
              onClick={() => setshowpassword2(!showpassword2)}
            >
              {!showpassword2 ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </label>
      </div>
      <div onClick = {handleonSubmit}>
      <CTAButton route={""} active={true} className={"mt-6 w-full mx-0 focus:p-2 focus:bg-yellow-400"} >
        Create Account
      </CTAButton></div>
      <div className="flex flex-row   items-center  w-full justify-between my-2">
        <div className="bg-white text-center flex item-center  w-full h-[1px] "></div>
        <p className="mx-2 text-white text-center flex items-center">OR</p>
        <div className="bg-white flex item-center w-full  h-[1px] "></div>
      </div>
      <div>
      <CTAButton
        route={""}
        active={false}
        className={"mx-0 w-full font-normal"}
      >
        <span className="mx-2">
          <FcGoogle />
        </span>
        SignUp With Google
      </CTAButton></div>
    </form>
  );
}
