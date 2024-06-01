import React from 'react';
import { useState ,Li} from 'react';
import HighlightText from '../components/core/HomePage/HighlightText';
import { MdArrowBack } from "react-icons/md";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPasswordResetToken } from '../services/operations/authAPI';
export default function ForgotPassword() {

const [email,setemail] = useState("");
const [emailsent,setemailsent] = useState(false);
const {loading} = useSelector((state)=>(state.auth));

const dispatch = useDispatch();
function emailset(e){
    setemail(e.target.value);
}
function handle(e){
e.preventDefault();
dispatch(getPasswordResetToken(email,setemailsent));

}
  return (
    <div className='w-screen h-screen flex items-center justify-center'>
        {
            loading ?(<div className="loader"></div>):(
            <div className='  w-4/12 bottom-[50px] relative   mx-auto  flex flex-col justify-start  '>
      <p className='text-white text-4xl font-bold mx-5'>{
        !emailsent?("Reset Password"):("Check Your Email")
    }</p>
    <p className='text-richblack-200 font-bold mx-5 my-2 text-xl'>{
        !emailsent ?("Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery"):(<span>We have sent the reset email to <HighlightText text = {email}/></span>)
        }</p>
   {
    !emailsent && <p className='flex flex-col text-richblack-5  mx-5'>
        <label className='m-1'> Email Address<span className='text-pink-50'>*</span></label>
        <input
            type="text"
            className="bg-richblack-800 h-[2.5rem] pl-2 py-4 w-full my-2 border-b-[1px] border-white rounded-[10px]"
            placeholder="Enter Email Address" value = {email} onChange = {emailset}
          ></input> 
    </p>
   } 
    <button  onClick ={handle}  className="rounded-[5px] my-2  p-2 bg-yellow-200 w-11/12 px-2 mx-auto">
        {
            !emailsent?("Reset Password"):("Resend email")
        }
    </button>
    <Link className='text-white mx-5 flex flex-row justify-evenly w-3/12 items-center ' to = "/login" >
        <span><MdArrowBack /></span><p>Back to Login</p>
    </Link>
    </div>)
        }
    
    </div>
  )
}

//openroute means hota h ki non logged in user bhi access kar sakte h 