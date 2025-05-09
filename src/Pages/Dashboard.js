import React, { useState } from 'react'
import {useSelector,useDispatch} from "react-redux";
import { sidebarLinks } from '../data/dashboard-links';
import Sidebar from '../components/core/Dashboard/Sidebar';
import {Outlet} from "react-router-dom";
import { FiClipboard } from "react-icons/fi";
export default function Dashboard() {
    const {loading:profileloading} = useSelector(state=>state.profile);
    const {loading:authloading} = useSelector(state=>state.auth);
  const [show,setshow] = useState(false);
    if(profileloading|| authloading){
        return <div className = "w-screen h-screen flex justify-center items-center "><p className='loader '></p></div>
    }
  return (
    <div className = "flex flex-row w-screen h-auto mx-auto">
      <div className={`${show?"block":"hidden"} md:block ` }>
      <Sidebar/> 
      </div>
     
      <div className='w-full  h-full flex flex-row' >
       
       <Outlet/>
        <div onClick = {()=>{setshow(!show);}}
        className={` md:hidden float-left top-[2rem] relative right-[1.5rem] w-[50px] h-[100px] flex justify-end text-yellow-200`}>
          
          <FiClipboard  className='w-[20px] h-[20px]'/>
          </div>
        </div>
      
    </div>
  )
}
