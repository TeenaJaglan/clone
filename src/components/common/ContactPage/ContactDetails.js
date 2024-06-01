import React from 'react'
import { FaEarthAmericas } from "react-icons/fa6";
import { BiWorld } from "react-icons/bi";
export default function ContactDetails() {
const data = [{
    icon:"BiWorld",
    title:"Chat on us",
    description:`Our friendly team is here to help.`,
    description2:`info@studynotion.com`
},{
    icon:"FaEarthAmericas",
    title:"Visit us",
    description:`Come and say hello at our office HQ.`,
    description2:`Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016`
},{
    icon:"FaEarthAmericas",
    title:"Call us",
    description:`Mon - Fri From 8am to 5pm`,
    description2:`+123 456 7869`
}]
  return (
    <div>
      <div className=' p-8 bg-richblack-800  mx-auto w-10/12 rounded-[15px]'>
        {
            data.map((box)=>(
                <div className='flex flex-col my-6'>
                   
                    <p className='text-white text-xl font-bold'>{box.title}</p>
                    <p className=' text-richblack-300'>{box.description}</p>
                    <p className='font-bold text-richblack-400'>{box.description2}</p>

                </div>
            ))
        }
      </div>
    </div>
  )
}
