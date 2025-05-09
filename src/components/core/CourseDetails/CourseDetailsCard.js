import React,{useState,useEffect} from 'react'
import { FaRegBookmark } from "react-icons/fa6";
import { CiShare1 } from "react-icons/ci";
import { useSelector,useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import {addToCart} from "../../../slices/cartSlice";
import { ACCOUNT_TYPE } from '../../../utils/constants';
import { buycourse } from '../../../services/operations/studentsFeatures';
import { useParams } from 'react-router-dom';
import copy from 'copy-to-clipboard';
export default function CourseDetailsCard({data,modal,setmodal}) {
    const {user} = useSelector((state)=>state.profile);
    const {cartlist} = useSelector(state=>state.cart);
    const {token} = useSelector((state)=>state.auth);
    const dispatch = useDispatch();
    const loc = useLocation();
    const navigate = useNavigate();
    const {id} = useParams();
    useEffect(()=>{
     
      console.log("cartlist is",cartlist,typeof cartlist);
      
     
    },[cartlist])
    function handleAddtocart(){
        if(!user){
          console.log("modal set");
            setmodal({
                text1: "You are not logged in!",
                text2: "Please login to add To Cart",
                btntext1: "Login",
                btntext2: "Cancel",
                btn1Handler: () => navigate("/login"),
                btn2Handler: () => setmodal(null),
              })
              return ;
        };
        if(user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
            toast.error("You are an Instructor. You can't buy a course.")
            return;
          };
          if (token) {
            dispatch(addToCart(data));
          } else {
            toast.error("Authentication token not found. Please log in again.");
            navigate("/login");
          }
    }
    function handleshare(){
      console.log("during sharing text is:",loc);
      copy(window.location.href);
        toast.success("Link copied to clipboard");
    }
    function handlebuycourse(){
      if(user && data?.students_enrolled.includes(user?._id)){
        navigate("/dashboard/enrolled-courses");
        return ;
      }
      if(token){
        console.log("buy course enabled");
        buycourse(id,token,user,navigate,dispatch);
        return;
      }
      else{
        console.log("add to cart enabled");
        handleAddtocart();
      }
    }
  return (
    <div className='rounded-[15px] w-6/12 sm:w-4/12 sm:absolute relative right-[1.5rem] top-[1.5rem]  bg-richblack-500 p-3'>
      <img src = {data?.thumbnail}
      //src = "https://wallpapercave.com/wp/FCDgjHU.jpg" 
      // {data?.thumbnail}
       className='rounded-[15px]'/>
      <div className='text-xl text-white  flex justify-between'>
        <p>Rs.{data.price}</p>
        <p className='text-caribbeangreen-500'><FaRegBookmark /></p>
      </div>
      <button className='bg-yellow-200 text-black p-2 rounded-[10px] font-bold w-full m-1'
      onClick={()=>(handlebuycourse())}>
       {user && data?.students_enrolled.includes(user?._id)?"Go To  The Course":"Buy Now"} 
        </button>
      
        {
           !data?.students_enrolled.includes(user?._id) &&  
          <button
           className='bg-richblack-800 text-white p-2 rounded-[10px] font-bold w-full m-1'
           onClick = {handleAddtocart}
          >Add To Cart </button>
        }
       
      <p className='text-center'>30-Day Money-Back Guarantee</p>
      <ul className='text-2xl font-semibold text-white'><span>This Course Includes:</span>
      {
        data?.Instructions.map((d,index)=>(<li className='text-caribeangreen-800' key ={index}>{d}</li>))
      }
      </ul>
      <button
      onClick={() => handleshare()}
      className='text-yellow-200 text-center items-center justify-center flex items-center flex-row'>
        <span className='mx-1'><CiShare1 /></span>
        <span>Share</span></button>

    </div>
  )
}
