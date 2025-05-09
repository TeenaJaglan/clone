import React from 'react'
import RenderSteps from './RenderSteps';
import { useSelector } from 'react-redux';
export default function Indexcourse() {
   
const {editCourse} = useSelector((state)=>state.course);
  return (
    <div className='w-11/12 mx-auto my-4  min-h-screen h-auto'>
      <div>
        <h2 className='text-white text-3xl'>{ editCourse ?"Add Course":"Edit Course"}</h2>
        <RenderSteps/>
      </div>
      <div>paragraph</div>
    </div>
  )
}
