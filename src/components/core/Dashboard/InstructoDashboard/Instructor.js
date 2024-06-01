import React from 'react';
import { useState } from "react";
import { useEffect } from 'react'
import { GetInstructorDashboard } from '../../../../services/operations/profileAPI'
import { useSelector } from 'react-redux'
import { getInstructorcourses } from '../../../../services/operations/courseAPI';
import { PiHandWavingFill } from "react-icons/pi";
import { Link } from 'react-router-dom';
import InstructorChart from './InstructorChart';
export default function Instructor() {
    const {token} = useSelector(state=>state.auth);
    const {user} = useSelector(state=>state.profile);
    const [instructordata,setinstructordata] = useState(null);
    const [courselist,setcourselist] = useState([]);
   
    const fun = async()=>{
        const res = await GetInstructorDashboard(token);
        console.log("instructor response",res);
        setinstructordata(res);
        const response = await getInstructorcourses(token);
        console.log("course list",response);
        setcourselist(response);
        console.log("dd",instructordata,courselist);
    }
    useEffect(()=>{
        fun();
    },[]);
    const totalStudents = instructordata?.reduce((acc,curr)=>acc+=curr.students_enrolled,0)||0;
    const totalprice = instructordata?.reduce((acc,curr)=>acc+=curr.total_amount,0)||0;
  return (
    <div className='text-white     mx-auto w-10/12 mb-8 min-h-screen '>
    {
      courselist.length>0 ?(
    <div>
      <h1 className='text-white flex flex-row mb-3 mt-8 items-center  text-3xl font-bold'>Hi {user.firstname} <span className=''><PiHandWavingFill  className=' mx-1 text-yellow-100'/></span> </h1>
      <h2 className='text-richblack-200 font-semibold text-2xl'>Let's start something new</h2>
      {/* pi and data */}
      <div className='w-full flex md:flex-row flex-col justify-between'>
    <div className = " md:w-7/12 w-full my-10 flex  flex-row bg-richblack-800 md:flex-row  flex-col justify-between items-center  py-7 px-10 border-[2px] border-richblack-500  rounded-[5px]">
      <InstructorChart courselist = {courselist}/>
    </div>
    <div className = " md:w-4/12 w-fit my-10 flex  w-fit bg-richblack-800  flex-col   py-4 px-10 border-[2px] border-richblack-500  rounded-[5px]">
      <p className='text-white text-2xl my-4'>Statistics</p>
      <p className='text-xl font-semibold text-richblack-200'>Total Courses</p>
      <p className='text-xl font-bold text-richblack-200 mb-4'>{courselist.length}</p>
      <p className='text-xl font-bold text-richblack-200'>Total Students</p>
      <p className='text-xl font-bold text-richblack-200 mb-4'>{totalStudents}</p>
      <p className='text-xl font-bold text-richblack-200'>Total Income</p>
      <p className='text-xl font-bold text-richblack-200 mb-4'>{totalprice}</p>

    </div>
    </div>
    {/* Your courses */}
<div className='w-full h-full border-[2px] border-richblack-500 py-4 px-10 rounded-[5px] bg-richblack-800'>
  <div className='flex flex-row justify-between'>
    <p className='text-white text-md'>Your Courses</p>
    <Link to="/dashboard/my-courses" className="text-yellow-100 text-md">View All</Link>
  </div>
  
    {/* View  course */}
      <div className='flex md:flex-row w-fit my-5 justify-between    flex-col items-center '>
      { courselist?.slice(0,3).map((course,index)=>(
        <div key={index} className='text-white  m-1 '>
          <img
          className=' min-w-[320px] w-full max-w-[400px] h-[200px] border-[1px] border-white rounded-[5px]' 
          src={course?.thumbnail}/>
          <p className='text-white text-sm my-1'>{course?.course_name}</p>
          <div className='flex flex-row text-sm text-richblack-200'>
            <span>Students {course?.students_enrolled.length} | </span>
            <span className='mx-1'>Rs {course?.price}</span>
          </div>
          
        </div>
      ))
      }
       </div>
       </div>
   
    
 
</div>

   ):(
    <div className="mt-20 rounded-md bg-richblack-800 p-6 py-20">
    <p className="text-center text-2xl font-bold text-richblack-5"> You have not created any courses yet</p> 
    <Link to="/dashboard/add-course">
      <p className="mt-1 text-center text-lg font-semibold text-yellow-50"> Create a course </p> 
    </Link>
  </div>

   )   
  } 
    </div>
  )}

