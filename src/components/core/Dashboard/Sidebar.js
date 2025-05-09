 import React, { useEffect } from 'react'
 import { sidebarLinks } from '../../../data/dashboard-links';
import SidebarLink from './SidebarLink';
import {useSelector,useDispatch} from "react-redux";
import * as Icon from "react-icons/vsc";
import Confirmationmodal from '../../common/Confirmationmodal';
import {useNavigate} from "react-router-dom";
import { logout } from '../../../services/operations/authAPI';
import { useState } from 'react';
 export default function Sidebar() {
    
    const [confirmationmodal,setconfirmationmodal] = useState(null);
    const LogoutIcon = Icon["VscSignOut"];
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {user} = useSelector(state=>state.profile);

   return (
     <div className=" border-r-richblack-700 min-h-screen  bg-richblack-800 w-[19%] min-w-[200px] ">
     <div className='mt-5'>
            {
                sidebarLinks.map((box,index)=>
                    {
                        if(box.type && box.type!==user.accountType)return null; 
                        return <div key = {index} className=''><SidebarLink link = {box} iconName = {box.icon}/></div>
                    }
                   
                )
            }</div>
       <div className='bg-richblack-500 w-11/12 m-2 mx-auto h-[1px]'></div>
       <div className=' w-full'>
        <div className='w-full'><SidebarLink link = {{name:"Settings",path :"/dashboard/settings"}} iconName = {"VscSettingsGear"}/></div>
        <button className=' mx-auto ' onClick = {
            ()=>{
                setconfirmationmodal({
                    text1: "Are You Sure ?" ,
                    text2:"You will be logged out of your account.",
                    btntext1 :"LogOut",
                    btntext2 : "Cancel",
                    btn1Handler : ()=>{dispatch(logout(navigate))},
                    btn2Handler: ()=>{setconfirmationmodal(null)}
                })
            }
        }>
        <div className={` flex font-medium px-1 mx-2 justify-start flex-row text-richblack-300  items-center `}>
       <LogoutIcon className="mr-2 "/>
        <span >Log Out</span>
        </div>
        </button>
        {
            confirmationmodal && <Confirmationmodal modal = {confirmationmodal}/>
        }
       </div>
     </div>
   )
 }
 