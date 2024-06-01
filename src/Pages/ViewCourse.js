import React, { useState ,useEffect } from 'react'
import Videodetailssidebar from '../components/core/Dashboard/ViewCourse/Videodetailssidebar';
import Coursereviewmodal from '../components/core/Dashboard/ViewCourse/Coursereviewmodal';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getFullCourseDetails } from '../services/operations/courseAPI';
import { Outlet } from 'react-router-dom';

import { setcompletedLectures,setcourseEntireData,setcourseSectionData,settotalNoOfLectures } from '../slices/ViewcourseSlice';
export default function ViewCourse() {
    const  [reviewmodal,setreviewmodal] = useState(false);
    const {courseId} = useParams();
    const {token} = useSelector(state=>state.auth);
    const {
      courseSectionData,
      courseEntireData,
      completedLectures,
      totalNoOfLectures} = useSelector((state)=>state.viewcourse);
    const dispatch = useDispatch();
    useEffect(()=>{
        const setcoursespecificdetails = async ()=>{
            const coursedata = await getFullCourseDetails(courseId,token);
            console.log("coursedata is",coursedata);
            dispatch(setcourseSectionData(coursedata?.response?.courseContent));
            dispatch(setcourseEntireData(coursedata?.response));
           dispatch(setcompletedLectures(coursedata?.completedVideos||[]));
            let lectures=0;
            coursedata?.response?.courseContent?.forEach((subsec)=>{
              console.log('lectures counting',subsec.subsection,subsec.subsection.length);
              lectures += subsec.subsection.length
            });
            console.log(lectures);
            dispatch(settotalNoOfLectures(lectures));
            console.log("viewcourse data is", courseSectionData,
            courseEntireData,
            completedLectures,
            totalNoOfLectures);
        }
        setcoursespecificdetails();
    },[])
 
  return (
    <div div className = "flex flex-row w-screen h-auto mx-auto" >
      
    <div className='w-3/12' >
      <Videodetailssidebar setreviewmodal = {setreviewmodal}/>
    </div>
    <div className='w-full  h-full'>
        <Outlet/>
    </div>
    {reviewmodal && <Coursereviewmodal setreview={setreviewmodal}/>}
    </div>
  )
}
