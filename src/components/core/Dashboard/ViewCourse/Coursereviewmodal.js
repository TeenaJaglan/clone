import React,{useEffect} from 'react'
import { useSelector } from 'react-redux'
import { RxCross1 } from "react-icons/rx";
import { useForm } from 'react-hook-form';
import ReactStars from "react-rating-stars-component";
import { createratings } from '../../../../services/operations/ratingsApi';
import { useParams } from 'react-router-dom';

export default function Coursereviewmodal({setreview}) {
  const {user} = useSelector((state)=>state.profile);
  const {token} = useSelector((state)=>state.auth);
  const {courseId} = useParams();
  const {register,formdata,setValue,gatValues,handleSubmit} = useForm();
  const ratingChanged = (newRating) => {
    setValue("rating",newRating);
  };
   const onSubmit = async(data)=>{
    console.log("data from form is",data);
    const a = {...data,courseId};
   
    const response = await createratings(a,token);
    setreview(false);
   }
 
  return (
    <div className='p-2 w-full'>
      {/* heading */}
      <div className='text-xl p-2 text-white flex flex-row justify-between py-3  items-center bg-richblack-600 w-full'>
        <span className=''>Add Review</span>
        <button className='border-[2px] text-center border-white rounded-[100%] items-center flex justify-center h-[40px] w-[40px]' onClick ={()=>{setreview(false);}}><RxCross1 /></button>
      </div>
      {/* user details */}
      <div className='text-xl  text-white flex flex-row justify-between py-3  items-center bg-richblack-500 w-full'>
        <div className='flex flex-row p-2 justify-center  w-full text-sm items-center'>
          <div className='flex flex-row justify-center items-center'>
          <img src={user.image} className='w-[40px] h-[40px] rounded-[100%]'></img>
          <div className='flex mx-2 flex-col'>
            <span>{user.firstname} {user.lastname}</span>
            <span>Posting Publicily</span>
          </div>
          </div>
        </div>
      </div>
      {/* form */}
      <form className='w-full py-2 flex flex-col' onSubmit = {handleSubmit(onSubmit)}>
      {/* Rating Stars */}
      <div className='w-full flex justify-center p-1 text-center'>
      <ReactStars
    count={5}
    onChange={ratingChanged}
    size={24}
    activeColor="#ffd700"/></div>
    {/* review or the textarea */}
    <label htmlFor='suggestion' className='text-white py-2'>Please Give Your Valuable Feedback<span className='text-pink-200'>*</span></label>
    <textarea {...register("suggestion",{required:true})} name="suggestion" 
    className='bg-richblack-600 text-white'>
    </textarea>
    <div className='py-2 flex flex-row justify-end'>
      <button className='p-2  mx-2 text-md bg-richblack-500 rounded-[10px]' onClick={()=>(setreview(false))}>Cancel</button>
      <button className='p-2 ml-2  text-md bg-yellow-100 rounded-[10px]'>Save</button>
    </div>
      </form>
    </div>
  )
}
