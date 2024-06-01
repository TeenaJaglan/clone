import React,{useEffect} from 'react'
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
export default function TeamMember(data) {
   
  return (
    <div className='flex my-  m-4  p-4 text-black flex-row flex-wrap md:flex-nowrap'>
      <img src = {data.data.image} className='w-[200px] rounded-[100%] h-[180px]'/>
      <div className='flex flex-col px-2 mx-4'>
        <p className='text-black text-3xl text-bold'> {data.data.name}</p>
        <p className='text-brown-300 font-bold'>{data.data.role}</p>
        <p className='my-1'>{data.data.description}</p>
        <div className='flex items-center my-2 flex-row'>
            <FaFacebookF  className='text-richblack-800 w-[40px] text-[30px]'/>
            <FaTwitter className='text-richblack-800 w-[40px] text-[30px]' />
            <FaInstagram  className='text-richblack-800 w-[40px] text-[30px]'/>

        </div>
      </div>
    </div>
  )
}
