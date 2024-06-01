import React, { useState } from 'react'
import ReactStars from "react-stars"
export default function ReviewSliderCard({review}) {
    const length = 25;
    const [show,setshow] = useState(false);
  return (
    // <div className='bg-pink-900 text-white'>hii</div>
    <div className='bg-richblack-800 text-white col-span-1  p-[1rem] w-[300px] h-[200px]'>
    <div className = "flex flex-row justify-start py-2 w-full">
    <div><img src = {review?.name?.image} className='w-[40px] h-[40px] rounded-[100%]'/></div>
    <div className='flex flex-col mx-2'>
    <p className='font-bold'>{review?.name?.firstname} <span>{review?.name?.lastname}</span></p>
    <p className='text-richblack-200 text-sm'>{review?.to_which_Instructor?.course_name} </p></div>
    </div>
    <div className='w-full h-auto'>
        {review.suggestion>length && !show ?`${review.split(" ").slice(0,length).join(" ")} ...`:review.suggestion}</div>
        {
            !show && review.suggestion>length &&  <span onClick={()=>setshow(true)}>...</span>
        }
        {
            show && review.suggestion>length && <span className='text-sm text-richblue-200 underline' onClick={()=>setshow(false)}>read less</span>
        }
    <div className='text-yellow-100 font-bold  '>
        <span>{review.rating}</span>
        <span> 
        <ReactStars
  count={5}
  value={review.rating}
  size={15}
 // color1 = {}
  color2={'#ffd700'} />
            </span>
        <span></span>
    </div>
</div>
  )
}
