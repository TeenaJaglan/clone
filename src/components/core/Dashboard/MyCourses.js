import React,{useState,useEffect} from 'react'
import { VscAdd } from "react-icons/vsc";
import CourseTables from './InstructorCourses/CourseTables';
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";

import { setstep,seteditcourse,setmycourse } from '../../../slices/courseSlice';
export default function MyCourses() {

const dispatch = useDispatch();
  const {user} = useSelector(state=>state.profile);
  return (
    <div className='w-10/12 mx-auto h-screen my-8'>
      <div className=' mb-12  flex flex-row w-full justify-between'>
        <p className='text-3xl text-richblack-50'>My Courses</p>
        {
          user.accountType=="Instructor" && <Link to="/dashboard/add-course" className='bg-yellow-100  flex flex-row items-center p-2 text-black rounded-[10px] w-auto font-bold' 
        onClick={()=>{dispatch(setstep(1));dispatch(setmycourse(null));dispatch(seteditcourse(false));}}>Add Course <span className='mx-2'><VscAdd /></span></Link>
        }
        
      </div>
      <div  className='border-[1px] border-richblack-50'>
<CourseTables  />
      </div>
    </div>
  )
}
