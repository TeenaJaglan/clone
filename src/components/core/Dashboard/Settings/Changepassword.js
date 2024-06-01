import React,{useState} from 'react'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import {useSelector,useDispatch} from "react-redux";
import { setloading } from '../../../../slices/authSlice';
import { passwordupdation } from '../../../../services/operations/settingsAPI';
export default function Changepassword() {
  const [showpassword,setshowpassword]= useState(false);
  const [showpassword2,setshowpassword2]= useState(false);
  const [loading,setloading]= useState(false);
  //const  {user} = useSelector(state => state.user);
  const [password,setpassword]= useState("");
  const [newpassword,setnewpassword]= useState("");
  const dispatch = useDispatch();
  
  const passwordupdate = ()=>{
  //  const {email} = user;
    console.log("password update function is ");
    const confirmnewpassword = newpassword;
    setloading(true);
    dispatch(passwordupdation("teenajaglan9@gmail.com",password,newpassword,confirmnewpassword)); 
    setloading(false);
  }
  return (
    <div className='my-4'>
       <div className = " my-10 flex mx-auto flex-row bg-richblack-800 md:flex-row flex-col justify-between items-center  py-7 px-10 border-[2px] border-richblack-500  rounded-[5px]">
      <div className='flex  flex-col   w-full h-full '>
      <p className='text-white text-2xl font-bold'>Password Updation</p>
      <div className="grid lg:grid-flow-col mt-4 lg:gap-20 grid-row ">
        <label htmlFor="" className="flex flex-col text-white my-2 ">
          <p>
            {" "}
           Current Password
          </p>

          <div className="relative ">
            <input
              type={showpassword ? "text" : "password"}
              placeholder="Enter  Password"
              className="bg-richblack-600 h-[2rem] px-2 py-4 w-full border-b-[1px] border-white rounded-[5px]"
              name="password"
            value = {password}
            onChange = {(e)=>setpassword(e.target.value)}
            />
            <span
              className="text-white bg-richblack-600  p-2 px-4 absolute right-[2.5px]"
              onClick={() => setshowpassword(!showpassword)}
            >
              {!showpassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </label>
        <label htmlFor="" className="flex flex-col text-white my-2 ">
          <p>
            Confirm Password
          </p>
          <div className="relative ">
            <input
              type={showpassword2 ? "text" : "password"}
              placeholder="Confirm Password"
              className="bg-richblack-600 h-[2rem] px-2 py-4 w-full border-b-[1px] border-white rounded-[5px]"
              name="newpassword"
             value = {newpassword}
             onChange = {(e)=>setnewpassword(e.target.value)}
            />
            <span
              className="text-white bg-richblack-600  p-2 px-4 absolute right-[2.5px]"
              onClick={() => setshowpassword2(!showpassword2)}
            >
              {!showpassword2 ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </label>
      </div>
     </div>
     </div>
     <div className='w-full flex flex-row justify-end'>
      <button className='p-2 bg-richblack-700 font-bold text-richblack-50 mr-4  rounded-[10px] px-5' onClick ={()=>{setpassword("");setnewpassword("")}}>Cancel</button>
      <button className='p-2 bg-yellow-50 font-bold text-richblack-900 mr-4  rounded-[10px] px-5' onClick ={passwordupdate}>Update</button>

     </div>
     {loading?<span className='Loader w-full items-center'></span>:""}
    </div>
  )
}
