import React,{useState,useEffect} from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import IconBtn from '../../../common/IconBtn';
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
export default function Videodetailssidebar({setreviewmodal}) {
  const [activestatus,setactivestatus] = useState(""); //sectionid ke liye ki konsi active hh
  const [videobaractive,setvideobaractive] = useState("");
//  const [isActive,setisActive] = useState([]);
  //subsectionid konsi active h 
  const navigate = useNavigate();
  const  location = useLocation();//url change hoga
  const {sectionId,subsectionId} = useParams();
  const {
    courseSectionData,
    courseEntireData,
    completedLectures,
    totalNoOfLectures} = useSelector((state)=>state.viewcourse);
    // const handleActive = (id)=>{
    //   setisActive(!isActive.includes(id)?isActive.concat([id]):isActive.filter((e)=>e!=id))
    // }
    useEffect(()=>{
      //new syntax = ;(()=>{..........})
      const fun = ()=>{
     
        if(!courseSectionData?.length){return ;}
        const coursesectionindex = courseSectionData.findIndex((data)=>data._id===sectionId);
        const coursesubsectionindex = courseSectionData[coursesectionindex]?.subsection.findIndex((data)=>data._id===subsectionId);
       const activesubsection = courseSectionData[coursesectionindex]?.subsection?.[coursesubsectionindex]?._id;
      
        setactivestatus(courseSectionData[coursesectionindex]._id);
        setvideobaractive(activesubsection);
        
      }
      fun();
     
    //  setisActive(isActive.concat([sectionId]))
    console.log("the active datas areeeeeeeeeeeee",activestatus,videobaractive,completedLectures,subsectionId);
    },[courseEntireData,courseSectionData,location.pathname,completedLectures]);
  return (
    <>
      {!videobaractive ?(
          <div className="grid h-screen w-screen place-items-center">
            <div className="loader"></div>
          </div> 
       ) :(<div className='h-screen w-full py-3 px-2 bg-richblack-800'>
        <div className='flex md:flex-row md:flex-wrap justify-center md:justify-between flex-col items-center'>
          <button className='rounded-[100%] bg-richblack-600 md:m-0 m-2 h-[30px] w-[30px] flex justify-center text-xl text-white  text-center items-center text-black'onClick={()=>{navigate("/dashboard/enrolled-courses");}}><MdKeyboardArrowLeft /></button>
          <button  className="text-black text-md rounded-[5px] font-semibold py-3 bg-yellow-100 px-2" onClick = {()=>{setreviewmodal(true)}}>
            Add Review
          </button>
        </div>
<p className='text-2xl font-bold text-richblack-50 my-2'>{courseEntireData?.course_name}</p>
<p className='text-richblack-100 text-xl'>{completedLectures.length}/{totalNoOfLectures}</p>

{/* section */}
<div>
  {
    courseSectionData && courseSectionData.map((section,index)=>(
      <>
<div key={index} 
// onClick={()=>handleActive(section._id)}
onClick = {()=>{setactivestatus(section._id)}}
className='mt-2 px-2 bg-richblack-700 text-white text-xl flex justify-between items-center h-[50px]'>
<span>{section.section_name}</span>
<span className={`${activestatus===section._id?"rotate-180":"rotate-0"}`}><MdKeyboardArrowDown /></span>
    </div>
    {
   activestatus===section._id  &&  section.subsection.length>0 && section.subsection.map((subsection,index)=>(
     <div key={index} 
     onClick = {() => {
      navigate(`/view-course/${courseEntireData?._id}/section/${section?._id}/sub-section/${subsection?._id}`)
      setvideobaractive(subsection._id);
    }}
     className={` w-full px-2 text-white ${videobaractive===subsection._id?"bg-yellow-200":"bg-black"} text-white text-md flex justify-start items-center h-[50px]`} >
      <input type="checkbox" className="mr-2" onChange={()=>{}} checked={completedLectures.includes(subsection._id)?true:false}/>
      <span>{subsection.title}</span>
     </div>
     )) 

     
    }
    </>))
  }
</div>
       </div>
      )}
    </>
  )
}
