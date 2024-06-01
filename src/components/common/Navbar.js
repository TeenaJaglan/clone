import React, { useEffect, useState } from "react";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "../../data/navbar-links";
import * as Icons from "react-icons/vsc"
import { Link, useLocation, matchPath, useNavigate } from "react-router-dom";
import { IoMdArrowDropdownCircle } from "react-icons/io";
import { useSelector ,useDispatch} from "react-redux";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaCartShopping } from "react-icons/fa6";
import { categories } from "../../services/api";
import { logout } from "../../services/operations/authAPI";
import { apiconnector } from "../../services/apiconnector";
import Navbardropdown from "../core/HomePage/Navbardropdown";
import Confirmationmodal from "./Confirmationmodal";
import { IoIosMenu } from "react-icons/io";
import NavbarLinkcol from "./NavbarLinks";
export default function Navbar() {
  const Dashboardicon = Icons["VscDashboard"];
  const LogoutIcon = Icons["VscSignOut"];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const location = useLocation();
  const [show,setshow] = useState(false);
  const [show2,setshow2] = useState(false);
  const [show3,setshow3] = useState(true);

  const [confirmationmodal,setconfirmationmodal] = useState(null);
  const [sublinks, setsublinks] = useState([
  ]);
  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };
  const fetchsublinks = async () => {
    try {
      console.log(process.env.REACT_APP_BASE_URL);
      console.log(categories.CATEGORIES);
      const res =  await apiconnector("GET", categories.CATEGORIES);
      const response = res.data ;
      console.log(response);
      const a = response.data; 
      
      console.log("categories are:");
      console.log(a);
      setsublinks(a);
    } catch (err) {
      console.log("error occurred during sublink retrieval :" + err);
      return;
    }
  };
 
  useEffect(() => {
 console.log("the user from profile  is :");
 console.log(user);
    fetchsublinks();
  },[token]);
  return (
    <div className="mx-auto text-center relative w-full md:px-[5rem] px-[2rem] h-auto bg-richblack-900 border-b-[1px]  border-richblack-600 flex flex-row justify-between ">
      <Link to="/" className="h-full my-2">
        <img src={logo} alt="Logo" />
      </Link>
      {/* home about us */}
      <nav className="mx-2 text-center hidden md:block">
        <ul className="flex flex-row items-center justify-center h-full w-auto text-center text-xl text-richblack-25">
          {NavbarLinks.map((links, index) => (
            <li key={index}>
              {/* what is the significance of this ? with path =>The difference between <Link to={links?.path}>{links.title}</Link> and <Link to={links.path}>{links.title}</Link> lies in how they handle potential null or undefined values in the links object.
<Link to={links?.path}>{links.title}</Link> uses optional chaining (?.) to access the path property of the links object. If links is null or undefined, the expression short-circuits and returns undefined, preventing a potential error when trying to access a property of a non-existent object.
<Link to={links.path}>{links.title}</Link> does not use optional chaining. If links is null or undefined, attempting to access the path property directly would result in a runtime error, potentially causing the application to crash.
In summary, using optional chaining (?.) helps prevent errors related to accessing properties of potentially null or undefined objects, providing a more robust and safe way to handle such scenarios in JavaScript.*/}
              {links.title === "Catalog" ? (
                
                <div onMouseLeave = {()=>{setshow(false)}} className="flex flex-row w-full relative group   w-auto cursor-pointer items-center justify-center">
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
            </li>
          ))}
          {/* if path matches then usse yellow karna h i.e, location.pathname  */}
        </ul>
      </nav>
      {/* login/signup */}
      <div>
        <div className="flex flex-row mx-auto text-center h-full justify-between text-richblack-300 items-center">
          {token != null && (
            <div className="flex flex-row w-full items-center">
              {
                user.accountType==="Student" && 
                <div className="h-full text-center  ">
                <Link to="/dashboard/cart" className="items-center relative">
                  <FaCartShopping className="h-[25px] w-[25px] mx-3"/>
                </Link>
                {totalItems != 0 && (
                  <div className="bg-pink-400 text-white text-[10px] absolute p-1 translate-y-[-2.2rem] translate-x-[2rem] rounded-[100%]">{totalItems}</div>
                )}
              </div>
              }
            
            <div className="flex flex-row justify-center items-center "  onMouseLeave = {()=>{setshow2(false)}}>
              <img src={user.image} className="w-[35px] h-[35px] rounded-[100%]"/>
              <div>
              <IoMdArrowDropdown
               onMouseEnter = {()=>{setshow2(true)} }
              
               className="mx-1 text-[30px] relative group " />
              <div className={` absolute h-full w-[200px] 
               ${show2?"group-hover:visible group-hover:opacity-100":"opacity-0 invisible"} 
                   transition-all duration-150 translate-y-[-0.2rem] right-5 z-[1000] rounded-[10px]  flex flex-col`}>
                    <div className="absolute left-[50%] top-3  h-[40px] w-[40px]   rotate-45  rounded bg-richblack-700"></div>
                    <div className=" rounded-[10px] relative text-white flex rounded-[10px] flex-col  translate-y-[1.3rem]  h-auto bg-richblack-700 ">
                      
                        <Link  className="p-2  hover:bg-richblack-500 transition-all duration-150 text-start w-auto text-[1.2rem] bg-richblack-700 text-white items-center flex flex-row justify-start" 
                         to="/dashboard/my-profile"><span className="mx-1"><Dashboardicon/></span>Dashboard</Link>
                        <Link  className="p-2  hover:bg-richblack-500 transition-all duration-150 text-start w-auto text-[1.2rem] flex flex-row justify-start items-center text-white bg-richblack-700" 
                         to="/dashboard/my-profile"
                         onClick = {
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
                      }
                      
                      ><span className="mx-1"><LogoutIcon/></span>LogOut</Link>
                      {
                        show3  && <div className="md-invisible"><NavbarLinkcol sublinks={sublinks}/></div>
                      }
                    </div>
                  </div>
              </div>
            </div>
            
            </div>
          )
          }
          {token == null && (
            <div className="flex flex-row items-center w-full h-full text-center  justify-between">
              <Link to="/login">
                <button className="border-[1px] border-richblack-500 rounded-[5px] px-2 py-1 h-full mx-1">
                  Log In
                </button>
              </Link>
              <Link to="/signup">
                <button className="border-[1px] border-richblack-500 rounded-[5px] px-2 py-1 h-full mx-1">
                  Sign Up
                </button>
              </Link>
            </div>
          )}
         
          {
            confirmationmodal && <div className="w-screen min-h-screen h-[] absolute top-0 left-0 text-start text-black "><Confirmationmodal modal = {confirmationmodal}/></div>
        }
        </div>
      </div>
    </div>
  );
}

// useSelector to fetch state or slices
