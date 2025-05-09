import React,{useEffect} from 'react'
import {useSelector} from "react-redux";
import { Link } from 'react-router-dom';
import { FaEdit } from "react-icons/fa";
import FormDate from '../../../utils/formatDate';
export default function Myprofile() {

  const {user} = useSelector(state=>state.profile);

  return (
   
      <div className='text-white     mx-auto w-8/12 '>
      <h1 className='text-white my-8 text-4xl'>My Profile</h1>
     {/* section 1 */}
     <div className = " my-10 flex mx-auto flex-row bg-richblack-800 md:flex-row flex-col justify-between items-center  py-7 px-10 border-[2px] border-richblack-500  rounded-[5px]">
      <div className='flex lg:flex-row flex-col justify-start   w-4/12 h-full items-center'>
      <img src = {user.image} className='w-[70px] h-[70px] rounded-[100%] my-1'/>
      <div className='flex flex-col h-full font-bold items-center  lg:items-start text-white mx-4'>
      <p>{user.firstname} {user.lastname}</p>
      <p>{user.email}</p>
      </div></div>
      <Link to = "/dashboard/settings">
      <button className='bg-yellow-200 opacity-100 my-1  text-richblack-900 p-1 rounded-[5px] flex flex-row items-center justify-between'>Edit <FaEdit  className='mx-1'/></button></Link>
     </div>
     {/* section 2 */}
     <div className = " my-10 flex mx-auto flex-row bg-richblack-800 md:flex-row flex-col justify-between items-center  py-7 px-10 border-[2px] border-richblack-500  rounded-[5px]">
      <div className='flex  flex-col   w-4/12 h-full '>
      <h4 className='text-white text-3xl font-bold'>About</h4>
      
      <p className='text-richblack-300 my-2 '>{(user.additionalDetails?.About)?user.additionalDetails.About:"Write something about yourself"}</p>
      <p className='text-bold my-2'>ACCOUNT TYPE : <span className='font-bold'>{user.accountType}</span></p>
      </div>
      <Link to = "/dashboard/settings">
      <button className='bg-yellow-200 opacity-100 my-1  text-richblack-900 p-1 rounded-[5px] flex flex-row items-center justify-between'>Edit <FaEdit  className='mx-1'/></button></Link>
     </div>
     {/* section 3 */}
     <div className = " my-10 flex mx-auto flex-row bg-richblack-800 md:flex-row flex-col justify-between items-center  py-7 px-10 border-[2px] border-richblack-500  rounded-[5px]">
      <div className='flex  flex-col   w-full h-full '>
        <div className='flex flex-row justify-between'>
      <h4 className='text-white text-3xl font-bold'>Personal Details</h4>
       <Link to = "/dashboard/settings">
      <button className='bg-yellow-200 opacity-100 my-1  text-richblack-900 p-1 rounded-[5px] flex flex-row items-center justify-between'>Edit <FaEdit  className='mx-1'/></button></Link>
      </div>
      <div className="flex max-w-[500px] justify-between">

<div className="flex flex-col gap-y-5">
  <div>
    <p className="mb-2 text-sm text-richblack-600">First Name</p>
    <p className="text-sm font-medium text-richblack-5"> {user?.firstname} </p>
  </div>
  <div>
    <p className="mb-2 text-sm text-richblack-600">Email</p>
    <p className="text-sm font-medium text-richblack-5"> {user?.email} </p>
  </div>
  <div>
    <p className="mb-2 text-sm text-richblack-600">Gender</p>
    <p className="text-sm font-medium text-richblack-5"> {user?.additionalDetails?.gender ?? "Add Gender"} </p>
  </div>
</div>
<div className="flex flex-col gap-y-5">
            <div>
              <p className="mb-2 text-sm text-richblack-600">Last Name</p>
              <p className="text-sm font-medium text-richblack-5"> {user?.lastname} </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600">Phone Number</p>
              <p className="text-sm font-medium text-richblack-5"> {user?.additionalDetails?.contactNumber ?? "Add Contact Number"} </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600">Date Of Birth</p>
              <p className="text-sm font-medium text-richblack-5">
                {
                user?.additionalDetails?.Dob ??  "Add Date Of Birth"}   
              </p>
            </div>
</div>
</div>
      </div>
     </div>
</div>
   
  )
}
