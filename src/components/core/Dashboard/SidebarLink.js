 import React from 'react'
 import * as Icons from "react-icons/vsc"
 import { NavLink,matchPath,useLocation } from 'react-router-dom';
 import {useDispatch} from "react-redux"
 export default function SidebarLink({link , iconName }) {
    const Icon = Icons[iconName]
    const location = useLocation();
    const dispatch = useDispatch();
    const  matchRoute =(route)=>{
if(location.pathname==="/dashboard/edit-course" && route==="/dashboard/add-course")return {};
console.log("sidebar are",location.pathname,route,matchPath({path:route},location.pathname));
        return matchPath({path:route},location.pathname);
    }
   return (
     
       <NavLink to = {`${link.path}`} className={` py-2 px-1 font-medium ${matchRoute(link.path)?("bg-yellow-200 bg-blur-50 text-yellow-200 bg-opacity-30  border-l-[8px] border-yellow-200"):("text-richblack-300")}  flex    flex-row  text-center items-center mx-2 items-center  transition-all duration-200`} >
      <div className='flex flex-row items-center justify-evenly'>
        <span className='mr-2 text-center'><Icon /></span>
        <span>{link.name} </span></div>
        
       </NavLink>
   )
 }
 