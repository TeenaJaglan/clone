import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import Upload from "../Upload";
import { SubSectionCreation, SubSectionDeletion, SubSectionEdit } from "../../../../../services/operations/subsectionAPI";
import { ImCross } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { setmycourse } from "../../../../../slices/courseSlice";
export default function SubSectionModal({
  data,crosshandler,sectionId
}) {
  const {getValues,register,
    setValue,formdata} = useForm();
const {token} = useSelector(state=>state.auth);
const {mycourse} = useSelector(state=>state.course);
const dispatch = useDispatch()
  
useEffect(()=>{
  console.log(data);
  if(data){
    setValue("LectureTitle",data.title);
    setValue("LectureDescription",data.description);
    setValue("LectureThumbnail",data?.video_url)

  }
},[])
  function isFormUpdated(){
    const curr = getValues();
    if(curr.sectionTitle!=data.title || curr.LectureDescription!=data.description || curr.LectureThumbnail!=data.video_url)return true;
    return false;
  }
 async function onSubmit(){
    //check if data is not null then if it is updated or not
    if(data){
        if(isFormUpdated){
            const formdata = new FormData();
            const curr = getValues();
            formdata.append("courseId",mycourse._id);
            formdata.append("subsectionId",data._id);
            formdata.append("sectionId",sectionId);
            if(curr.LectureTitle!=data.title){
            formdata.append("title",curr.LectureTitle);}
            if(curr.LectureDescription!=data.description){
            formdata.append("description",curr.LectureDescription);}
            if(curr.LectureThumbnail!=data.video_url){
            formdata.append("video",curr.LectureThumbnail);}
            const updates = Object.fromEntries(formdata.entries());
            console.log("formdata from updates is",updates);
            //section updated api call 
            const res = await SubSectionEdit(updates,token);
            if(res.data.success){dispatch(setmycourse(res.data.course));}
            console.log("response from subsection updation is",res);

        }
        else{toast.error("Please make some changes in the section");return ;}
    }
    else{
        const formdata = new FormData();
            const curr = getValues();
            formdata.append("sectionId",sectionId);
            formdata.append("courseId",mycourse._id);
            formdata.append("title",curr.LectureTitle);
            formdata.append("description",curr.LectureDescription);
            formdata.append("videofiles",curr.LectureThumbnail);
            const updates = Object.fromEntries(formdata.entries());
            console.log("formdata from updates is",updates);
            const response =await SubSectionCreation(updates,token);
            if(response?.data?.success){
              dispatch(setmycourse(response.data.courseupdate))
            }
            console.log("final course is",mycourse);
            return;
    }
    crosshandler();
  } 

  return (
    <div className={`w-screen  min-h-screen h-[150vh] backdrop-blur-md absolute flex justify-center items-center  top-[5rem] left-0`}>
    <div className="flex flex-col bg-richblack-600 absolute w-9/12 mx-auto  p-6  py-2">
        <div className="text-white text-2xl flex flex-row w-full justify-between">
            <p>{!data?"Adding Lecture":"Editing Lecture"}</p>
        <button onClick={crosshandler}><ImCross /></button></div>
  
    <form
      className={` `} onSubmit = {(e)=>{e.preventDefault();onSubmit();}}
    >
      {/* subsection Thumbnail */}
      <Upload
        name={"LectureThumbnail"}
        register={register}
        setValue={setValue}
        video={true}
        editData={data?.video_url}
        viewData={data?.video_url?true:false}
        label="Lecture  Video"
      />

      {/* subsection Title */}
      <div className=" px-2 my-[1rem]  flex flex-col">
        <label htmlFor="LectureTitle">
          Lecture Title<sup className="text-pink-200">*</sup>
        </label>
        <input
          type="text"
          name="LectureTitle"
          id="LectureTitle"
          className="bg-richblack-800 h-[3rem] px-2 py-4  border-b-[1px]  border-white rounded-[10px] w-full"
          {...register("LectureTitle", { required: true })}
        />
        {/* {errors.courseTitle && <p>Course Title is required.</p>} */}
      </div>

      {/* subsection Description */}
      <div className=" pr-4 pl-2 flex flex-col">
        <label htmlFor="LectureDescription">Lecture Description</label>
        <textarea
          row={60}
          cols={30}
          name="LectureDescription"
          id="LectureDescription"
          className="bg-richblack-800 h-[3rem] px-2 py-2 border-b-[1px] border-white rounded-[10px] w-full"
          {...register("LectureDescription")}
        />
      </div>
      <div  className="text-black font-bold w-full my-4 flex justify-end">
        <button className="bg-yellow-100 rounded-[10px] p-3  mx-2 flex flex-row items-center" >
        {
          data?" Save ":" Create "
        }
        </button>
        </div>
    </form>
    </div>
    </div>
  );
}
