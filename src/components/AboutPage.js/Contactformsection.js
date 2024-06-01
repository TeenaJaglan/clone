import React from 'react'
import Contactusform from '../common/ContactPage/Contactusform'

export default function Contactformsection() {
  return (
    <div className='mx-auto  flex flex-col  text-white justify-center mx-auto '>
      <div className=' w-6/12 mx-auto'> 
      <div >
      <h1  className='text-center font-bold text-4xl '>Get In Touch</h1>
      <p className='text-center text-md text-richblack-100 my-2 mb-3'>We'd love to here for you, Please fill out this form.</p></div>
      <div > <Contactusform/></div>
     </div>
    </div>
  )
}
