import React from 'react'
import { FcGoogle } from "react-icons/fc";
import CTAButton from "../HomePage/Button";
import {useDispatch }from "react-redux";
import {useState} from 'react' ;
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { login } from '../../../services/operations/authAPI';
export default function LoginForm() {
  const [showpassword,setshowpassword] = useState(false);
  const [formdata,setformdata] = useState({email:"", password: ""});
  const dispatch = useDispatch();
 const navigate = useNavigate();
    function handleonChange(e){
    setformdata((prev)=>({...prev,[e.target.name] : e.target.value}));
  }
  function handleonSubmit(e){
e.preventDefault();

dispatch(login(formdata,navigate));

  }
  return (
    <div>
        <label htmlFor="" className="flex flex-col text-white my-3">
        <p>
          Email Address<sup className="text-pink-200">*</sup>
        </p>
        <input
          type="text"
          className="bg-richblack-800 h-[2rem] px-2 py-4  border-b-[1px] border-white rounded-[10px]"
          placeholder="Enter email address" name = "email" value = {formdata.email} onChange = {handleonChange}
        ></input>
      </label>
      <label htmlFor="" className="flex flex-col text-white my-2">
        <p>
          Password <sup className="text-pink-200">*</sup>
        </p>
      
<div className='relative '>
      <input  type = {showpassword?("text"):("password")} placeholder="Enter  Password" className = "  text-richblack-5  bg-richblack-800 h-[2.5rem] pl-2 py-4 px-2 w-full my-2 border-b-[1px] border-white rounded-[10px]" name = "password" value = {formdata.password} onChange = {handleonChange}/>
      <span className='text-white bg-richblack-800  p-2 px-4 absolute right-[2.5px] top-[10px]' onClick = {()=>(setshowpassword(!showpassword))}>
     {
        !showpassword?(<FaEyeSlash  />):(<FaEye />)
      } 
      </span>
    </div>

      </label>
      <div onClick = {handleonSubmit}>
      <CTAButton
        route={""}
        active={true}
        className={"mx-0  my-8  w-full font-normal"}
      >
        Login
      </CTAButton></div>
      <div className="flex flex-row w-11/12 mx-auto  items-center  w-full justify-between my-2">
        <div className="bg-white text-center flex item-center  w-full h-[1px] "></div>
        <p className="mx-2 text-white text-center flex items-center">OR</p>
        <div className="bg-white flex item-center w-full  h-[1px] "></div>
      </div>
      <CTAButton
        route={""}
        active={false}
        className={"mx-0 my-8 w-full font-normal"}
      >
        <span className="mx-2">
          <FcGoogle />
        </span>
        Login With Google
      </CTAButton>
    </div>
  )
}
