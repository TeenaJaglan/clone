import React , { useState, useEffect }from 'react'
import { useForm } from "react-hook-form";
import { IoIosArrowForward } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { resetcourseState, setmycourse, setstep } from '../../../../../slices/courseSlice';
import { COURSE_STATUS } from '../../../../../utils/constants';
import { useNavigate } from 'react-router-dom';
import { updatecourse } from '../../../../../services/operations/courseAPI';
export default function Publishcourse() {
    const { register, getValues, setValue, handleSubmit } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {mycourse} = useSelector((state)=>state.course);
    const {token} = useSelector((state)=>state.auth);

    useEffect(()=>{
      if(mycourse?.status===COURSE_STATUS.PUBLISHED){
        setValue("public",true);
      }
    })
    const goBack = ()=>{
      dispatch(setstep(2));
     }
    const onSubmit = ()=>{
      handleCoursePublish();
    }
    const goToCourses = ()=>{
      dispatch(resetcourseState());
      navigate("/dashboard/my-courses");
    }
   async  function handleCoursePublish(){
      //check if the form is updated or not ,if the form is not updated do this
      if(mycourse?.status=== COURSE_STATUS.PUBLISHED && getValues("public")===true || 
      mycourse?.status=== COURSE_STATUS.DRAFT && getValues("public")===false){
        goToCourses();
        return ;
      }
      //else 
      const formdata = new FormData();
      formdata.append("courseId",mycourse._id);
      const status = getValues("public")?COURSE_STATUS.PUBLISHED:COURSE_STATUS.DRAFT;
      formdata.append("status",status);
      const updates = Object.fromEntries(formdata.entries());
      console.log("updates final are",updates);
     const result = await updatecourse(updates,token);
      console.log(result,"this is result");
      
      if(result) {
        console.log("result",result);
        dispatch(setmycourse(result?.data?.data));
        goToCourses();
      }
        else {
          console.log("some error occurred during publishing");
        }
      
    }

  return (
    <form className = "bg-richblack-800 p-3"
    >
     
      <p className='text-3xl m-1 text-white'>Publish Setting</p>
        {/* publish checkbox*/}
        <div className=" px-2 my-[1rem]  justify-start items-center text-richblack-200 flex flex-row">
       
        <input
          type="checkbox"
          name="public"
          className="bg-richblack-800 h-[3rem] px-2 py-4 mr-2 border-b-[1px]  border-white rounded-[10px] "
          
          {...register("public", { required: true })}
        />
        <label htmlFor="public" className='text-md'>
        Make this Course as Public
        </label>
      </div>
      {/* button */}
      <div className="text-black  px-2 my-[1rem] font-bold w-full  flex justify-end">
        
        <button className="bg-richblack-400 rounded-[10px] p-3 mx-2"  onClick = {(e)=>{e.preventDefault();goBack();}}>
            Back
        </button>
        <button
          className="bg-yellow-200 rounded-[10px] p-3 flex flex-row items-center" 
          onClick={(e)=>{
            e.preventDefault();
            console.log("function invoke");
            onSubmit()}}>
          Save Changes
          <span> <IoIosArrowForward /> </span>
        </button>
      </div>
    </form>
  )
}
