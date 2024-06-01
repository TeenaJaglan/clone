import React from 'react'
import instructor from "../../../assets/Images/Instructor.png"
import HighlightText from './HighlightText'
import CTAButton from './Button';
import { FaLongArrowAltRight } from "react-icons/fa";

export default function Instructor() {
  return (
    <div className='flex md:flex-row  flex-col mx-auto justify-between p-[5rem]'>
      <img src={instructor} alt="image" className='w-fit pr-4 w-5/12 shadow-[-20px_-20px_0px_0px] shadow-white'/>
      <div className='md:w-5/12 w-auto flex flex-col h-auto  '>
        <div className='text-4xl py-[3rem] text-white font-bold'>Become an <p><HighlightText text={"Instructor"}/></p></div>
        <p className=' text-richblack-200  pb-[2rem]'>Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.</p>
        <div className='w-fit  sm:-p-0'><CTAButton className={"m-0"} active={true} route = "">Start Learning Today<FaLongArrowAltRight/></CTAButton></div>
      </div>
    </div>
  )
}
