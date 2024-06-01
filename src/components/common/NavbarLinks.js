import React,{useState} from 'react';
import { Link, useLocation, matchPath, useNavigate } from "react-router-dom";
import { IoMdArrowDropdownCircle } from "react-icons/io";
import { NavbarLinks } from "../../data/navbar-links";
import Navbardropdown from "../core/HomePage/Navbardropdown";

export default function NavbarLinkcol({sublinks}) {
    const [show,setshow] = useState(false);
    const location = useLocation();
    
    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname);
      };
  return (<div className='flex flex-col md:hidden visible'>
    {NavbarLinks.map((links, index) => (
        <div key={index} className='text-start hover:bg-richblack-500 transition-all duration-150 text-[1.2rem] flex flex-row justify-start items-center text-white bg-richblack-700 p-2'>
          {/* what is the significance of this ? with path =>The difference between <Link to={links?.path}>{links.title}</Link> and <Link to={links.path}>{links.title}</Link> lies in how they handle potential null or undefined values in the links object.
<Link to={links?.path}>{links.title}</Link> uses optional chaining (?.) to access the path property of the links object. If links is null or undefined, the expression short-circuits and returns undefined, preventing a potential error when trying to access a property of a non-existent object.
<Link to={links.path}>{links.title}</Link> does not use optional chaining. If links is null or undefined, attempting to access the path property directly would result in a runtime error, potentially causing the application to crash.
In summary, using optional chaining (?.) helps prevent errors related to accessing properties of potentially null or undefined objects, providing a more robust and safe way to handle such scenarios in JavaScript.*/}
          {links.title === "Catalog" ? (
            
            <div onMouseLeave = {()=>{setshow(false)}} className="flex flex-row w-full relative group   w-auto cursor-pointer items-center justify-start mx-[1rem]">
              <p  onMouseEnter = {()=>{setshow(true)} }  >{links.title}</p>
              <p className="text-center mx-[5px]"><IoMdArrowDropdownCircle /></p>
              <Navbardropdown sublinks = {sublinks} show = {show}/>
            </div>
           
          ) : (
            <Link
              className={`${
                matchRoute(links?.path)
                  ? "text-yellow-25"
                  : "text-richblack-25"
              } mx-[1rem] items-center flex`}
              to={links?.path}
            >
              {links.title}
            </Link>
          )}
        </div>
      ))}
 </div> )
}
