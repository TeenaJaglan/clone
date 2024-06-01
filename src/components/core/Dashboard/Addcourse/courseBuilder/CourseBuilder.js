import React,{useState,useEffect} from 'react'
import { useForm } from 'react-hook-form';
import { IoAdd } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import { IoChevronBack } from "react-icons/io5";
import { useSelector ,useDispatch } from 'react-redux';
import { SectionCreation, SectionEdit } from '../../../../../services/operations/sectionAPI';
import {seteditcourse, setmycourse,setstep} from "../../../../../slices/courseSlice";
import toast from 'react-hot-toast';
import NestedView from './NestedView';
import { TbRuler } from 'react-icons/tb';
export default function CourseBuilder() {
    const {register,setValue,getValues,formdata,handleSubmit} =useForm();
    const {mycourse,editcourse} = useSelector(state=>state.course);
    const [editSectionName,seteditSectionName] = useState(null) ; 
    const {token} = useSelector(state=>state.auth);
    const dispatch = useDispatch();
    const coursedata = mycourse;

   async function onSubmit(data){
    console.log("data on onSubmit is",data);
   if(!editSectionName){
    try{
        console.log("Data to be send ", data);
        const formdata = new FormData();
        formdata.append("section_name",data.section_name);
        formdata.append("course_name",mycourse.course_name);
        console.log("formdata is ",formdata);
        const updates = Object.fromEntries(formdata.entries());
        console.log("objects is",updates);
        const response = await SectionCreation(dispatch,updates,token);
       console.log("section creation response is: ",response);
    }catch(err){
        console.log("section creation failed due to some error");
      }

}
else{
  try{
    console.log("Data to be send ", data);
    const formdata = new FormData();
    formdata.append("section_name",data.section_name);
    formdata.append("sectionId",editSectionName);

    formdata.append("Course_Id",mycourse._id);

    console.log("formdata is ",formdata);
    const response = await SectionEdit(formdata,token);
    console.log("response from editing is",response);
    if(response?.data?.success){
        toast.success("section updated successfull");
        console.log("final ans is",response.data.data);
        dispatch(setmycourse(response.data.data));
    }
    else{toast.error("section failed to update");return ;}
}catch(err){
    toast.error("section failed to update");
  }
}
seteditSectionName(null);
setValue("section_name", "");
    }
    function Canceledit (){
       setValue("section_name","");
       seteditSectionName(false);
       dispatch(seteditcourse(TbRuler));
    }


    const handleChangeEditSectionName = ( sectionName,sectionId) => {
      if(editSectionName === sectionId) {
        Canceledit();
        return;
      }
      seteditSectionName(sectionId);
      setValue("section_name", sectionName);
    }

   const goBack = ()=>{
    dispatch(setstep(1));
    dispatch(seteditcourse(false));
   }
   const gotoNext = ()=>{
    if(mycourse.courseContent.length===0){toast.error("Please add atleast one section");return ;}
    if(mycourse.courseContent.some((section)=>(section.subsection.length===0))){
      toast.error("Please add atleast one lecture in each section")
      return;
    }
    dispatch(setstep(3));
   }

  return (
   
    <div className = "flex flex-col">
     

        <div className=" px-2 py-6 my-[1rem] text-white flex flex-col border-[1px] border-richblack-700 "
         
          >
        <label htmlFor="courseTitle">
          Section Name<sup className="text-pink-200">*</sup>
        </label>
        <input
          type="text"
          name="section_name"
          id="section_name"
          className="bg-richblack-800 h-[3rem] px-2 py-4  border-b-[1px]  border-white rounded-[10px] w-full"
          placeholder="Add Section Name"
          {...register("section_name", { required: true })}
         />
         <button className='border-[2px] flex  items-center justify-center flex-row w-fit my-2 p-3 rounded-[5px] border-yellow-200 text-yellow-100 font-bold'   
         onClick={(e) => {
           e.preventDefault();
            console.log("getvalues is", getValues());
            onSubmit(getValues());
          }}>
          {!editSectionName?"Create Section":"Edit Section Name "}   <span className='mx-2'><IoAdd className="text-yellow-200 font-bold rounded-[100%] w-[20px] h-[20px] outline-dashed outline-2 outline-offset-2"/></span>
         </button>
         {editSectionName && <span className=' cursor-pointer text-richblack-500 underline' onClick={()=>{Canceledit();}}>Cancel Edit</span>}
        {/* {errors.section_name && <p>section name is required.</p>} */}
      </div>

         { coursedata?.courseContent?.length>0 &&
          <NestedView data ={coursedata.courseContent} register={register}
          setValue={setValue}
          getValues={getValues}
          formdata={formdata} 
          seteditSectionName = {seteditSectionName}
          handleChangeEditSectionName = { handleChangeEditSectionName}
          />
        }
      <div  className="text-black font-bold w-full  flex justify-end">
        <button className="bg-richblack-400 rounded-[10px] p-3  mx-2 flex flex-row items-center"
        onClick={(e)=>{e.preventDefault();goBack()}}
        >
        <span className='pr-2'>
        <IoChevronBack />
          </span>Back
        </button>
        <button className="bg-yellow-200 rounded-[10px] p-3 flex flex-row items-center" onClick={(e)=>{e.preventDefault();gotoNext()}}>
        Next
        <span className='pl-2'>
            <IoIosArrowForward />
          </span>
        </button>
      </div>
    </div>
  )
}
