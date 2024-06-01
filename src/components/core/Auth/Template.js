import React from 'react'
import frame from "../../../assets/Images/frame.png"
import SignUpForm from './SignUpForm'
import LoginForm from './LoginForm'


export default function Template({title,description1,description2,image,formType}) {
  return (
    <div className=' m-12 flex flex-row  flex-wrap-reverse gap-2 justify-between items-center w-11/12'>
      <div className='flex flex-col flex-wrap w-1/3 m-4 ml-5 '>
       <div className='font-semibold text-white text-3xl my-4 text-3xl '>{title}</div>
       <div className='text-richblack-100 text-lg'>{description1}
       <span className='font-bold italic text-lg mx-2 text-blue-100'>
        {description2}
       </span>
    
      {formType==="signupform"?<SignUpForm/>:<LoginForm/>} 
       </div>

      </div>
      <div className='flex relative flex-row h-full  items-center w-6/12 m-4 h-fit'>
        <img src={frame} width={558} height={504} className=" w-fit   flex"alt="image2"/>
        <img src={image}  width={558} height={490} className="absolute -top-4 -left-4 flex" alt="image3"/>
      </div>
    </div>
  )
}
