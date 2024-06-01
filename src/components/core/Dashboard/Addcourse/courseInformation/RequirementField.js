import React,{useState,useEffect} from 'react'
import { useSelector } from "react-redux";
export default function RequirementField({register,name,setValue,getValues,label}) {
    const [requirement,setrequirement] = useState("");
    const [requirementlist,setrequirementlist] = useState([]);
    const {editcourse} = useSelector(state=> state.course);
    const {mycourse} = useSelector(state=> state.course);
useEffect(()=>{
    if(editcourse){
        if(mycourse?.Instructions){setrequirementlist(mycourse?.Instructions);}
        
    }
    console.log("requiremddffis",mycourse?.Instructions);

    console.log("requirement list is",requirementlist);
    register(name,{validate:value=>value.length>0});
},[]);

useEffect(()=>{
   setValue(name,requirementlist);
},[requirementlist]);
  function handleaddition(e){
   e.preventDefault();
   console.log("addition of",requirement);
    if(requirement){
    setrequirementlist([...requirementlist,requirement]);
    setrequirement("");
    }
    console.log(requirement,requirementlist);
  }
  function handleremove(index){
    let  updated = [...requirementlist]
  updated =   updated.splice(index,1);
  setrequirementlist(updated);
  }
  return (
    <div className=" px-2 my-[1rem]  flex flex-col justify-start">
    <label htmlFor="Requirements/Instructions">
      {label}<sup className="text-pink-200">*</sup>
    </label>
    <input
      type="text"
      name={name}
      id={name}
      value ={requirement}
      className="bg-richblack-800 h-[3rem] px-2 py-4  border-b-[1px] text-white border-white rounded-[10px] w-full"
      onChange ={(e)=>setrequirement(e.target.value)}
      
    />
    <button className='text-yellow-100 font-bold text-[1rem] text-start mt-2 ' onClick={handleaddition}>Add</button>
    {
  requirementlist?.length>0 && requirementlist.map((item,index)=>(<div key = {index} className= " flex flex-row text-white">
            <span>{item} <button className='  mx-1 text-richblack-100' onClick = {()=>(handleremove(index))}>clear</button></span>
        </div>))
    }
 
  </div>
  )
}
