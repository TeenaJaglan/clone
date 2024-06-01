 import React from 'react'
import Contactusform from './Contactusform'
 
 export default function ContactForm() {
   return (
     <div className='border-[1px] border-richblack-200 p-[2rem] mx-auto   w-6/12 rounded-[15px]'>
        <div className='w-10/12 mx-auto'>
       <p className='text-4xl font-bold py-3 text-white  '>Got a Idea? We've got the skills. Let's team up</p>
       <p className='text-richblack-200 py-3'>Tell us more about yourself and what you're got in mind.</p></div>
       <Contactusform/>
     </div>
   )
 }
 