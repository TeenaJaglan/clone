import React,{useState} from 'react'
import { FaArrowLeftLong } from "react-icons/fa6";
import { BsArrowRepeat } from "react-icons/bs";
import { Link } from 'react-router-dom';
import OtpInput from 'react-otp-input';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../services/operations/authAPI';
export default function VerifyEmail() {
    const [otp, setOtp] = useState('');
    const signUpData = useSelector((state)=>state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    function handleonSubmit(e){
        e.preventDefault();
        console.log(otp);
        console.log("signupdata is :");
        console.log(signUpData);
        dispatch(signUp(signUpData,otp,navigate));
       
    }
  return (
    <div className='h-screen w-screen mx-auto flex justify-center  items-center'>
      <div className='w-4/12 '>
        <p className='text-4xl text-white'>Verify Email</p>
        <p className='text-xl text-richblack-50 pr-5 my-2'> A Verification code has been sent to your Email. Enter the code below</p>
        <form onSubmit={handleonSubmit}>
        <OtpInput
      value={otp}
      onChange={setOtp}
      numInputs={6}
      renderSeparator={<span>-</span>}
      renderInput={(props) => <input {...props} style = {{color:"white",width:"50px" ,marginRight:"0.5rem",textAlign:"center",}}  className='bg-richblack-800  aspect-square text-xl  text-white '/>}
    //   containerStyle={"text-white flex  md:flex-no-wrap flex-wrap focus:bg-pink-300"}
      
    />
            <button className="rounded-[5px] my-4  p-2 bg-yellow-200 w-11/12  mx-auto" >Verify Email</button>
        </form>
        <div className='flex w-full mx-auto flex-row justify-between '>
        <Link to ="/login" className='text-white   flex w-3/12 flex-row items-center justify-between'><FaArrowLeftLong />  <p  className='ml-1'> Back to Login</p></Link>
        <div className='text-richblue-100    w-2/12 flex mr-9 flex-row items-center justify-between'> Resend <BsArrowRepeat /> </div> 
        </div>
      </div>
    </div>
  )
}
