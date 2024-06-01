import React from 'react'
import studynotionlogo from "../../assets/Logo/Logo-Full-Light.png";
import { FaTwitter } from "react-icons/fa";
import { BsFacebook } from "react-icons/bs";
import { ImGoogle } from "react-icons/im";
import { FaYoutube } from "react-icons/fa";
import {FooterLink2} from "../../data/footer-links";
import {Link} from "react-router-dom";

export default function Footerfoot() {

    const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];
const Resources = ["Articles","Blog", "Chart Sheet", "Code challenges", "Docs", "Projects", "Videos","Workspaces",];
const Plans = ["Paid memberships", "For students", "Business solutions"];
const Community = ["Forums", "Chapters", "Events"]; 

  return (
    <div className='w-full mt-2  p-5 bg-richblack-800 line-[100px] flex flex-row text-richblack-200 mx-4 justify-evenly'>
        {/* row1 */}
      <div className='  w-full justify-evenly flex flex-row'>
        <div className='flex flex-col'>
<img src = {studynotionlogo} className='w-[150px] mb-3 ' alt="image" />
<p className='hover:text-white'>Company</p>
<p className='hover:text-white'>Carrers</p>
<p className='hover:text-white'>Affiliates</p>
<div className='flex flex-row mt-2 justify-between w-9/12'>
<div className='hover:text-white' ><FaTwitter /></div>
<div className='hover:text-white'><BsFacebook /></div>
<div className='hover:text-white'><ImGoogle /></div>
<div className='hover:text-white'><FaYoutube /></div>
</div>
        </div>
        <div className='px-4 flex flex-col'>
            <h1 className='font-bold text-white'>Resources</h1>
            <div className='flex flex-col pb-5'> {
        Resources.map((data,index)=>{
            return (<div key = {index}>
                <Link to="*" className='hover:text-white'>{data}</Link>
            </div>);
        })
    }</div>
    <h1 className='font-bold text-white'>Support</h1>
        <Link to="*" className='hover:text-white'>Help Center</Link>
        </div>
        <div className='flex flex-col'>
<div className='flex flex-col'>
    <h1 className='font-bold text-white'>Plans</h1>
    <div className='pb-5'>{ Plans.map((data,index)=>{
            return (<div key = {index}>
                <Link to="" className='hover:text-white' >{data}</Link>
            </div>);
        })}</div>
</div>
<div className='flex flex-col'>
    <h1 className='font-bold text-white'>Community</h1>
    <div> {Community.map((data,index)=>{
            return (<div key = {index}>
                <Link to="" className='hover:text-white' >{data}</Link>
            </div>);
        })}</div>
</div>
        </div>
      </div>
      {/* row2 */}
      <div className='border-richblack-700  border-[1px] h-6/12 '></div>
      {/* row3 */}
      <div className=' px-3 w-full flex flex-row justify-evenly'>
<div className='flex flex-col'>
    <h1 className='font-bold text-white'>{FooterLink2[0].title}</h1>
    {
        FooterLink2[0].links.map((data,index)=>{
            return (<div key = {index}>
                <Link to={data.link} className='hover:text-white' >{data.title}</Link>
            </div>);
        })
    }
</div>
<div className='flex flex-col'>
<h1 className='font-bold text-white'>{FooterLink2[1].title}</h1>
{
        FooterLink2[1].links.map((data,index)=>{
            return (<div key = {index}>
                <Link to={data.link} className='hover:text-white' >{data.title}</Link>
            </div>);
        })
    }
</div>
<div className='flex flex-col'>
<h1 className='font-bold text-white'>{FooterLink2[2].title}</h1>
{
        FooterLink2[2].links.map((data,index)=>{
            return (<div key = {index}>
                <Link to={data.link} className='hover:text-white' >{data.title}</Link>
            </div>);
        })
    }
</div>
</div>

    </div>
  )
}
