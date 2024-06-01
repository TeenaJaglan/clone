import React,{useState,useEffect} from 'react'
import {useSelector} from "react-redux";
import { enrolledcourseslist } from '../../../services/operations/profileAPI';
import ProgressBar from "@ramonak/react-progress-bar";
import { useNavigate } from 'react-router-dom';
export default function Enrolledcourses() {
    const {token} = useSelector(state=>state.auth);
    const [enrolledcourses,setenrolledcourses] = useState([]);
    const navigate = useNavigate();
    const {
      courseSectionData,
      courseEntireData,
      completedLectures,
      totalNoOfLecturess} = useSelector((state)=>state.viewcourse);
   async function getEnrolledCourses(){
try{
    const res = await enrolledcourseslist(token);
    console.log("response of enrolled-courses-",res);
    setenrolledcourses(res.data.data.courses);
   
    console.log("Data : ",enrolledcourses);
}catch(err){
    console.log("error while course enrolled fetching");
}
    }
    useEffect(()=>{
        getEnrolledCourses();
    },[completedLectures]);
  return (
    <div className='h-screen mx-auto w-10/12 text-white py-6'>
      {
        !enrolledcourses && (<div className='w-full h-full text-center text-white '><span class="loader "></span></div>)
      }
     
      
        
{
  (enrolledcourses.length===0)?(<div className='text-3xl text-center font-bold text-white'>
  You have not enrolled in any courses yet.
</div >
):(
<div className='flex flex-col justify-start'

 >
<div className='text-3xl text-center font-bold text-white'>Enrolled courses</div>
{/* tags add karne h */}
<div className=' p-1 w-full'>
  <div className='w-full text-start'>
    <div className = "flex flex-row w-full gap-4 bg-richblack-500 py-4 text-xl rounded-[10px] p-1 ">
      <p className=' w-6/12 '>Course Name</p>
      <p className=' w-3/12'>Duration</p>
      <p className=' w-3/12'>Progress</p>
    </div>
    <div>
      {
        enrolledcourses.map((item,index)=>(
          <div key = {index} className='flex my-2 p-1 flex-row w-full gap-4'
          onClick={() => {navigate(`/view-course/${item?._id}/section/${item.courseContent?.[0]?._id}/sub-section/${item.courseContent?.[0]?.subsection?.[0]?._id}`)}}
          >

  <div className='w-6/12 flex flex-row   '>
    <img src = {item.image} width="100px" height="90px"/>
    <div className='flex flex-col px-2'>
<p className='  text-md text-white'>{item.course_name}</p>
<p className=' text-md text-richblack-300'>{item.what_you_will_learn}</p>
    </div>
  </div>

  <div  className='w-3/12 text-white '>{item.totalDuration}</div>
  <div className='w-3/12  '><ProgressBar completed={item.ProgressPercentage<=100?item.ProgressPercentage:0} /></div>

          </div>
        ))
      }
    </div>
  </div>
</div>
</div>)
}
        
        </div>
      
  )
}
