 import React,{useState,useEffect} from 'react';
 import { apiconnector } from '../../../../services/apiconnector';
 import { VscEdit } from "react-icons/vsc";
 import { RiDeleteBin6Fill } from "react-icons/ri";
import Confirmationmodal from '../../../common/Confirmationmodal';
import {Link, useNavigate} from "react-router-dom";
import toast from "react-hot-toast";
import { courses } from '../../../../services/api';
import { removecoursefromlist } from '../../../../services/operations/courseAPI';
import {useDispatch,useSelector} from "react-redux";
import { setmycourse,seteditcourse ,setstep} from '../../../../slices/courseSlice';

//ise super-responsive table se responsive banao**************************************************


 export default function CourseTables() {
    const [modal,setmodal] = useState(null);
    const dispatch = useDispatch();
    const [course,setcourse] = useState([]);
    const navigate = useNavigate();
    const {token} = useSelector(state=> state.auth)
     async function getAllCourses(){
      try{
  const api = courses.GETMYCOURSE ;
   const res = await apiconnector("GET",api,null,{Authorization:`Bearer ${token}`});
   console.log("the response from connector is");
   console.log(res.data.data);
   setcourse(res.data.data);
   
      }
      catch(err){
          console.log("failed to fetch instructor  courses",err);
          toast.error("failed to load courses os the instructor")
      }
  }
    useEffect(()=>{
       getAllCourses();
       
    },[])
 async function deletecourse(_id){
     setmodal({
            text1:"Do you want to delete This course?",
            text2:"All The data related to This course will be deleted",
            btntext1:"Delete Anyway" ,
            btntext2:"Cancel",
            btn1Handler:async () => {
                try {
                 const res =  await removecoursefromlist(_id, token,navigate);
                 console.log("data outcome",res);
                  if(res?.data?.success){
                    toast.success("removed successfully");}
                    setmodal(null);
                //  getMyCourses();
                getAllCourses();
                } catch (err) {
                  console.log("failed to  delete courses", err);
                  toast.error("failed");
                }
              }, 
            btn2Handler:()=>{ setmodal(null)},
        })
       
    }
   return (
     <div className='flex flex-col h-auto'>
       <div className='text-richblack-25  border-richblack-700  border-[1px] justify-evenly p-2 flex flex-row  w-full'>
        <p className='w-6/12 '>COURSES</p>
        <p className='w-2/12 '>DURATION</p>
        <p className='w-2/12 '>PRICE</p>
        <p className='w-2/12 '>ACTIONS</p>
       </div>
       <div>
        {
          course.length!=0 &&  course.map((item,index)=>(
                <div
                 key = {index} className='flex my-2 p-2 flex-col  md:flex-row w-full justify-evenly '>

                <div className='w-6/12 flex md:flex-row  flex-col '>
                  <img src = {item?.thumbnail} alt="image" width="100px" height="90px"/>
                  <div className='flex flex-col px-2'>
              <p className='  text-md text-white'>{item.course_name}</p>
              <p className=' text-sm text-richblack-300'>{item.what_you_will_learn}</p>
              <p className=' text-sm text-richblack-300'>created: <span className='mx-1'>{item.createdAt}</span></p>

                  </div>
                </div>
              
                <div  className='w-2/12 text-richblack-50  '>2h 30min {item.time_duration}</div>
                <div className='w-2/12 text-richblack-50   '> Rs. {item.price}</div>
                <div className=' w-2/12 text-richblack-50   items-start flex flex-row  '>
                    
                <button onClick = {()=>{
                  dispatch(setmycourse(item));dispatch(seteditcourse(true));dispatch(setstep(3));navigate("/dashboard/edit-course");
                }}><VscEdit className=' w-[20px] h-[20px] text-richblack-50 mx-2 hover:text-richblue-500'  /></button>
                <button onClick = {()=>(deletecourse(item._id))}>
                <RiDeleteBin6Fill className=' w-[20px] h-[20px] text-richblack-50  mx-2 hover:text-pink-500 ' /></button>
                </div>
              
                        </div>
            ))
        }
       </div>
       <div className='absolute top-0 left-0'>
       {
        modal && <Confirmationmodal modal= {modal}/>
       }</div>
     </div>
   )
 }
 