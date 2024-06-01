import React,{useState,useEffect} from "react";
import { useSelector,useDispatch } from "react-redux";
import { profileupdation } from "../../../../services/operations/settingsAPI";
import {useNavigate} from "react-router-dom";
import { setUser } from "../../../../slices/profileSlice";
export default function Updateprofile() {
  const { profile } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const [data,setdata] = useState({
    firstname:profile.firstname?profile.firstname:"",
    lastname:profile.lastname?profile.lastname:"",
    gender:profile.gender?profile.gender:"",
    About:profile.About?profile.About:"",
     contactNumber:profile.contactNumber?profile.contactNumber:"" ,
     Dob:profile.Dob?profile.Dob:""
  });
  const temp = {...profile};
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const genderdata = ["Male","Female","Choose not to say","Other"];
  function handleonChange(e){
    setdata((prev)=>({...prev,[e.target.name]:e.target.value}));
    
  }
  function handleonSubmit(){
    dispatch(profileupdation(data,token,navigate));
   
  }

  function cancelupdation(){
   
    setdata(temp);
   
    navigate("/dashboard/my-profile");
  }
  return (
    <div className="my-8">
      <div className=" my-10 flex mx-auto flex-row bg-richblack-800 md:flex-row flex-col justify-between items-center  py-7 px-10 border-[2px] border-richblack-500  rounded-[5px]">
        <div className="flex  flex-col   w-full h-full ">
          <p className="text-white text-2xl font-bold">Profile Information</p>
          <div className="flex flex-wrap flex-col py-4  grid grid-rows-3 w-11/12">
            <div className=" w-full lg:grid-flow-col  grid-flow-row lg:gap-20 grid my-2 ">
              <div className="flex flex-col  ">
                <label htmlFor="firstname " className="text-white">
                  First Name
                </label>
                <input className="bg-richblack-600 h-[2rem] text-white px-2 py-4  border-b-[1px] border-white rounded-[5px]" 
                name = "firstname"
                value = {data.firstname}
                onChange = {handleonChange}
                placeholder = "Enter first name"/>
                
              </div>
              <div className="flex flex-col ">
                <label htmlFor="lastname " className="text-white">
                  Last Name
                </label>
                <input className="bg-richblack-600 h-[2rem] px-2 py-4   text-white border-b-[1px] border-white rounded-[5px]" 
                name = "lastname"
                value = {data.lastname}
                placeholder = "Enter Last name"
                onChange = {handleonChange}/>
              </div>
            </div>
            <div className=" w-full lg:grid-flow-col  grid-flow-row  lg:gap-24 grid my-2">
              <div className="flex flex-col ">
                <label htmlFor="Dob " className="text-white">
                  Date of Birth
                </label>
                <input 
                type = "date"
                className={`bg-richblack-600  ${data.Dob?"text-white":"text-richblack-50"} h-[2rem] text-richblack-50 border-b-[1px] border-white rounded-[5px]`} 
                name= "Dob"
                value = {data.Dob}
                placeholder = "Enter Your date of birth"
                onChange = {handleonChange}/>
              </div>
              <div className="flex flex-col w-full ">
                <label htmlFor="gender " className="text-white">
                  Gender
                </label>
                <div >
                <select className="bg-richblack-600 h-[2rem] w-full  px-2 py-4 text-white border-b-[1px] border-white rounded-[5px]"
                name = "gender" 
                value = {data.gender}
                
                onChange = {handleonChange}>
                  {
                    genderdata.map((val,index)=>(
                      <option key = {index} className="text-richblack-100">{val}</option>
                    ))
                  }
                </select>
                </div>
              </div>
            </div>
            <div className=" w-full lg:grid-flow-col  grid-flow-row lg:gap-20 grid my-2">
              <div className="flex flex-col ">
                <label htmlFor="contactNumber " className="text-white">
                  Contact Number
                </label>
                <input className="bg-richblack-600 h-[2rem] px-2 py-4 text-white border-b-[1px] border-white rounded-[5px]" 
                name = "contactNumber"
                value = {data.contactNumber}
                placeholder = "Enter Your phone no."
                onChange = {handleonChange}/>
              </div>
              <div className="flex flex-col ">
                <label htmlFor="About " className="text-white">
                  About
                </label>
                <input className="bg-richblack-600 h-[2rem] px-2 py-4 text-white border-b-[1px] border-white rounded-[5px]"
                name = "About" 
                value = {data.About}
                placeholder = "Enter about yourself"
                onChange = {handleonChange}/>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-row justify-end">
        <button className="p-2 bg-richblack-700 font-bold text-richblack-50 mr-4  rounded-[10px] px-5 "
      onClick = {cancelupdation}  >
          Cancel 
        </button>
        <button className="p-2 bg-yellow-50 font-bold text-richblack-900 mr-4  rounded-[10px] px-5" onClick ={handleonSubmit}>
          Save
        </button>
      </div>
    </div>
  );
}
