import React,{useState} from 'react' ;
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
export default function Passwordbox({placeholder}) {
    const [showpassword,setshowpassword] = useState(false);
  return (
    <div className='relative '>
      <input  type = {showpassword?("text"):("password")} placeholder={placeholder} className = "  text-richblack-5  bg-richblack-800 h-[2.5rem] pl-2 py-4 px-2 w-full my-2 border-b-[1px] border-white rounded-[10px]" />
      <span className='text-white bg-richblack-800  p-2 px-4 absolute right-[2.5px] top-[10px]' onClick = {()=>(setshowpassword(!showpassword))}>
     {
        !showpassword?(<FaEyeSlash  />):(<FaEye />)
      } 
      </span>
    </div>
  )
}
