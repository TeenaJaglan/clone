import React,{useEffect,useState} from 'react'
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoVideocam } from "react-icons/io5";
import { useParams } from 'react-router-dom';
export default function CourseAccordian({data,isActive,handleActive}) {
    const [Active,setActive] = useState(false);
   const {id} = useParams();
   useEffect(()=>{console.log("ISACTIVE",isActive)},[isActive])
  return (
    <div>
    <div className='bg-richblack-700 p-4 flex flex-row justify-between' onClick = {()=>{setActive(!Active);handleActive(id)}}>
      <div className='flex items-center text-white text-xl' >
        <span className={`${isActive.includes(id)?"rotate-180":"rotate-0"}`}><MdKeyboardArrowDown /></span>
        <span>{data.section_name}</span>
      </div>
      <div className='text-yellow-50'>{data.subsection.length} Lecture(s) </div>
    </div>
    {
        Active && data.subsection.map((subsectiondata,index)=>(
        <div
        key={index} className='bg-richblack-900 border-[2px] border-richblack-800 p-4 font-semibold flex flex-row justify-between'>
             <div className='flex items-center text-white  text-xl'>
        <span className='text-yellow-100 mr-1'><IoVideocam /></span>
        <span>{subsectiondata.title}</span>
      </div>
      <div className='text-white'>{subsectiondata?.time_duration||0} </div>
        </div>
        ))
    }
    </div>
  )
}
