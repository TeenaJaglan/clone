import React from 'react'

export default function Confirmationmodal({modal}) {
  return (
    <div className=' w-screen h-full min-h-screen justify-center items-center flex    absolute top-0 backdrop-blur-sm '>
      <div className='absolute flex flex-col  bg-richblack-900 p-4 border-[1px] border-white  w-[400px] rounded-[10px]'>
<p className='text-4xl font-bold text-white my-2 '>{modal.text1}</p>
<p className='text-richblack-50  my-2 '>{modal.text2}</p>
<div className='flex flex-row'>
    <button onClick = {modal.btn1Handler} className='bg-yellow-200 p-2 rounded-[8px] mr-2'>{modal.btntext1}</button>
    <button onClick = {modal.btn2Handler} className='bg-richblack-400 p-2 rounded-[8px] ml-2 '>{modal.btntext2}</button>

</div>
      </div>
    </div>
  )
}
