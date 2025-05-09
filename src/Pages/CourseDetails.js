import React,{useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { GetCourseDetails } from '../services/operations/courseAPI';
import {toStringDate} from '../utils/formatDate';
import Averagerating from '../utils/Averagerating';
import RatingStars from '../components/common/RatingStars';
import { BiInfoCircle } from "react-icons/bi"
import { HiOutlineGlobeAlt } from "react-icons/hi"
import CourseAccordian from '../components/core/CourseDetails/CourseAccordian';
import Confirmationmodal from '../components/common/Confirmationmodal';
import CourseDetailsCard from '../components/core/CourseDetails/CourseDetailsCard';
import CourseSlider from '../components/core/Catalog/CourseSlider';
import ReviewSlider from '../components/common/ReviewSlider';

export default function CourseDetails() {
    const {id} = useParams();
    const [coursedata,setcoursedata] = useState(null);
    const [isActive,setisActive] = useState([]);
    const [avgReviewCount, setAvgReviewCount] = useState(0);
    const [totallectures,settotallectures] = useState(0);
    const [totallecturestime,settotallecturestime] = useState(0);
    const [modal,setmodal] = useState(null);
    
    const handleActive = (id) => {
      console.log("isactive initially  is ",isActive);
      setisActive( !isActive.includes(id) ? isActive.concat([id]) : isActive.filter((e) => e != id));
      console.log("isactive is ",isActive);
    }
    useEffect(()=>{ 
        getDetails(id);
        const count = Averagerating(coursedata?.ratings_and_reviews ||[]);
        setAvgReviewCount(count);
    },[id])
    useEffect(()=>{
    //    if(!coursedata?.courseContent);
        let count = coursedata?.courseContent.reduce((sum,curr)=>{
    sum = sum + curr.subsection.length
    return sum ;
        },0);
       
        settotallectures(count);
     //lecture time 
        let time = coursedata?.courseContent.reduce((sum,curr)=>{
        sum = sum + (curr.subsection.time_duration||0);
        return sum;
        },0);
        console.log("time is",time);
        settotallecturestime(time); 
        console.log("course data is :",coursedata,coursedata?.Instructor?.courses);
        ratingresponse();
        },[coursedata]);
   async function getDetails (id){
try{
    
    const res = await GetCourseDetails(id);  
    console.log("the course you are going to view",res.data);
    const arr = res?.data?.data;
    if(res?.data?.success){
        setcoursedata(arr[0]);
    }
    
}catch(err){console.log("error occurred",err);}
    }
async function ratingresponse(id){
const response =0 ;
}
    if(!coursedata){return <div className='text-white text-4xl bg-richblack-800w-screen h-screen text-white mx-auto'>Failed to fetch course</div>}
  return (
    
    <div className='relative'>
       
    {/* section1 */}
    <div className='bg-richblack-700 text-white  mx-auto px-[5rem] py-10'>
        <p className='text-6xl font-semibold py-2' >{coursedata.course_name}</p>
        <p className='text-richblack-100'>{coursedata.course_description}</p>
        <div className='flex font-bold items-center text-yellow-200'>{avgReviewCount}<span className='mx-2 my-1'><RatingStars Review_Count={avgReviewCount} /></span></div>
        <p className='my-1'>Students Enrolled :  {coursedata?.students_enrolled.length}</p>
        <p className = "text-2xl"  >Created By {coursedata?.Instructor?.firstname} <span>{coursedata.Instructor?.lastname}</span></p>
        <div className='my-1 flex items-center '>
            <div className='flex items-center'><span className="mr-1"><BiInfoCircle /></span>Created at {toStringDate(coursedata.createdAt)}</div>
            <p className='flex items-center'><span className="mx-1"><HiOutlineGlobeAlt /> </span>{coursedata?.language}</p>
        </div>
    </div>
    {/* courseCard */}
    <div className='w-full flex flex-row justify-center my-2'>
        <CourseDetailsCard data = {coursedata} modal = {modal} setmodal = {setmodal} />
    </div>
    {/* what_you_will_learn-section */}
    <div className='my-20 border-[1px] mx-[5rem]  rounded-[5px] p-6 text-white border-richblack-200 w-6/12 h-auto'>
        <p className='text-4xl py-2 font-semibold'>What You Will Learn</p>
        <p className='text-richblack-200'>{coursedata?.what_you_will_learn}</p>
    </div>
  {/* course Content */}
  <div className=' px-[5rem] my-4 text-white'>
  <p className='text-4xl font-semibold py-2' >Course Content</p>
  <div className='flex flex-row   justify-between'>
 <div className='flex flex-row' >
<p className='mr-2'>{coursedata.courseContent.length} Section(s)</p>
  <p className='mr-2'>{totallectures} Lecture(s)</p>
  <p className='mr-2'>{totallecturestime} total time</p>
  </div>
  <button className='text-yellow-50' onClick={()=>{isActive.forEach((id)=>{handleActive(id)})}}>Collapse All Sections</button>
</div>

  </div>
  {/* Course Details Accordian */}
  <div className='px-[5rem]'>
    {
        coursedata?.courseContent.map((data,index)=>(
            <div className='' key={index}>
                <CourseAccordian data={data} isActive={isActive} handleActive ={handleActive}/>
            </div>
        ))
    }
  </div>
  {/* Author Details */}
  <div className=' px-[5rem] my-4 text-white'>
  <p className='text-4xl font-semibold py-2' >Author</p>
  <div className='flex'>
    <img src={coursedata?.Instructor?.image} className='rounded-[100%] h-[35px] w-[35px]'/>
    <span className='text-xl mx-2 text-caribbeangreen-300'>{coursedata?.Instructor.firstname} {coursedata?.Instructor.firstname}</span>
  </div>
  <p>{coursedata?.Instructor?.additionalDetails.About} Hello Everyone</p>
  </div>
{/* Review from Students */}
<div>
  <p className='text-center text-5xl font-semibold text-white'>Review from Students</p>
  <div><ReviewSlider/></div>
</div>
{/* More courses */}
<div>
  <p className='text-center text-5xl font-semibold text-white'>More Courses by  <span >{coursedata?.Instructor.firstname} {coursedata?.Instructor.firstname}</span> </p>
  <div className=' px-[5rem]'>
  {
      !coursedata?.Instructor?.courses && <div className='text-md text-white my-2'>No other courses found</div>
    }
    {
      coursedata?.Instructor?.courses &&  <div className='my-4'><CourseSlider data ={coursedata?.Instructor?.courses}/></div>
      
    }
    
  </div>
</div>
  {
    modal && <Confirmationmodal modal = {modal}/>
  }
    </div>
  )
}
