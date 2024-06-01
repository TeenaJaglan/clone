import React from 'react'
import HighlightText from './HighlightText'
import image1 from "../../../assets/Images/Know_your_progress.png";
import image2 from "../../../assets/Images/Plan_your_lessons.png";
import image3 from "../../../assets/Images/Compare_with_others.png";
import CTAButton from './Button';

export default function Learninglanguage() {
  return (
    < div className='relative my-5 mx-auto w-full'>
      <div className='text-center m-5'><p className='text-5xl  my-3 font-bold text-black'>Your Swiss Knife for < HighlightText text={"learning any language"}/></p>
      <p className='text-center my-3 text-md line-height-[1rem]'>Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.</p></div>
    <div className='flex lg:flex-row  flex-col mx-auto  items-center justify-center  lg:pl-[12rem]'>
      <img src={image1} className='object-contain lg:-mr-30' alt="image1"/>  
      <img src={image3}  className='object-contain  lg:-mt-2 -mt-12 lg:-ml-32' alt="image2"/>
      <img src={image2}  className='relative  lg:mr-32 lg:-ml-32 -mt-20' alt="image3"/>  
        
    </div>
    <div className='w-fit text-center mx-auto'>
<CTAButton active={true} route={"/About"}>Learn more</CTAButton>
    </div>
    </div>
  )
}
