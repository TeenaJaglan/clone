import React from 'react'
import {useSelector} from "react-redux";
import { MdDone } from "react-icons/md";
import CourseInformationform from './courseInformation/courseInformationform';
import CourseBuilder from './courseBuilder/CourseBuilder';
import Publishcourse from './publishCourse/Publishcourse';

export default function RenderSteps() {
    const {step}  = useSelector(state=>state.course);
    const stepwise = [{
        id:1,
        title:"Course Information"
    },{
        id:2,
        title:"Course Builder"
    },{
        id:3,
        title:"Publish"
    }]
  return (
    <div className=' my-8   mx-auto w-full '>
      <div className='flex my-5  flex-col'>
      <div className=' w-full  mx-auto flex flex-row   '>
      {
        stepwise.map((item,index)=>(
            <div className=' w-full mx-[3rem] my-3 py-3 'key = {index}>
                
        <button className={` relative w-[34px] h-[34px] text-center flex flex-col justify-center items-center rounded-[100%] ${step>item.id && "bg-yellow-50 text-yellow-50"} ${step==item.id ? ` border-yellow-50 bg-yellow-900 text-yellow-50`:"border-richblack-700 bg-richblack-800 text-richblack-300"}` } >
            {
                step>item.id?(<p className='text-richblack-900 font-bold'><MdDone /></p>):(<p>{item.id}</p>)
            }
            
            </button>
           
            {
              item.id!=stepwise.length && <div className={`${item.id<step?"border-yellow-50":"border-richblack-800"} border-white absolute translate-y-[-2rem] translate-x-[34px] h-[calc(34px/2)] lg:w-[25%] md:w-[20%] w-[17%] border-dashed border-b-2`}></div>
            }
            
            </div>
        ))
      }
      </div>
      <div className='flex  flex-row w-9/12 relative  justify-between'>
      {
        stepwise.map((item)=>(
          <p key={item.id} className='text-white  '>{item.title}</p>
        ))
      }
      </div>
      </div>
      {step===1 && <CourseInformationform/>}
      {step===2 && <CourseBuilder/>}
      {step===3 && <Publishcourse/>}

    </div>
  )
}
