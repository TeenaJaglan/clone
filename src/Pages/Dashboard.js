import React from 'react'
import {useSelector,useDispatch} from "react-redux";
import { sidebarLinks } from '../data/dashboard-links';
import Sidebar from '../components/core/Dashboard/Sidebar';
import {Outlet} from "react-router-dom"
export default function Dashboard() {
    const {loading:profileloading} = useSelector(state=>state.profile);
    const {loading:authloading} = useSelector(state=>state.auth);
    if(profileloading|| authloading){
        return <div className = "w-screen h-screen flex justify-center items-center "><p className='loader '></p></div>
    }
  return (
    <div className = "flex flex-row w-screen h-auto mx-auto">
      <Sidebar/>
      <div className='w-full  h-full' >
        <Outlet/>
        </div>
      
    </div>
  )
}
