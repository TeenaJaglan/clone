import React,{useState} from 'react'
import { RiDeleteBinFill } from "react-icons/ri";
import Confirmationmodal from '../../../common/Confirmationmodal';
import {useDispatch} from "react-redux";
import {logout} from "../../../../services/operations/authAPI";
import {useNavigate} from "react-router-dom";
export default function DeleteAccount() {
  const [confirmationmodal,setconfirmationmodal] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className='flex relative flex-row border-[2px] border-pink-200 bg-pink-600 bg-opacity-30 text-white justify-evenly my-10  mx-auto p-8'>
      
      <div  ><RiDeleteBinFill  className='text-pink-200 border-[1px] rounded-[100%]  h-[70px] w-[70px] p-3'/></div>
      <div className='flex flex-col w-9/12 justify-start'>
        <p className='text-white text-3xl font-bold mb-4'>Delete Account</p>
        <p>Would you like to delete account?</p>
        <p>This account may contain Paid Courses. Deleting your account is permanent and will remove all the contain associated with it.</p>
        <p><button className='font-italic text-white bg-pink-300 p-3 my-4 border-[2px] border-white' onClick = {()=>{  setconfirmationmodal({
                    text1: "Are You Sure ?" ,
                    text2:"You will be logged out of your account.",
                    btntext1 :"LogOut",
                    btntext2 : "Cancel",
                    btn1Handler : ()=>{dispatch(logout(navigate))},
                    btn2Handler: ()=>{setconfirmationmodal(null)}
                })}}>I want to delete My Account</button></p>
      </div>
      <div className='absolute top-[-25rem] left-[-20rem]'>
      {
        confirmationmodal && <Confirmationmodal modal = {confirmationmodal}/>
      }
      </div>
    </div>
 

  )
}
