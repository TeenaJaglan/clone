import React,{useEffect} from 'react'
import {useSelector} from "react-redux"

export default function TotalAmount() {
    const {totalprice} = useSelector(state=>state.cart);
  return (
    <div className='text-[1.2rem]  w-full md:w-3/12 bg-richblack-800 rounded-[10px] h-full p-4'>
      <p>Total:</p>
      <p className='text-yellow-200'> Rs.{totalprice}</p>
      <p className='text-richblack-100 '><del>Rs. {totalprice + 300}</del></p>
      <button className='bg-yellow-100 p-2 text-black rounded-[10px] w-full font-bold'>Buy Now</button>
    </div>
  )
}
