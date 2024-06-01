import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { getcategory, getcategorydetails } from '../services/operations/categoryAPI';
import { useEffect } from 'react';
import CourseSlider from '../components/core/Catalog/CourseSlider';
import Coursecard from '../components/core/Catalog/Coursecard';
export default function Catalog() {
    const {catalogName} = useParams();
    const [category_id,setcategory_id] = useState(null);
    const [active,setactive] = useState(1);
    const [catalogPageData,setcatalogPageData] = useState(null);
    //fetch all categories
    
    useEffect( ()=>{
  console.log("catalogName details:");

        const  fetchData =async () => {
        const res = await getcategory();
        console.log("response of category are",res);
        const Id  = res?.filter((data)=>data.category.split(" ").join("-").toLowerCase()===catalogName)[0]._id;
        console.log("id is",Id);
        setcategory_id(Id);
    }
fetchData();
},[catalogName]);
const getcategoryPageDetails = async ()=>{
        const res = await getcategorydetails(category_id); 
        if(res?.data?.success){
          console.log("hi",res.data.data.differentcategory,res.data.data.searchedcategory,res.data.data.mostSellingCourses);
          const a = res.data.data;
          console.log(a)
          setcatalogPageData({a});
          
        }
      
    };
    useEffect(()=>{
  if(category_id){
    console.log("categorypage details:");
    getcategoryPageDetails();
    console.log("catalogpage",catalogPageData);
  }  
},[category_id])

  return (
    <div className='bg-richblack-900'>
        {/* section 0 */}
      <div className='bg-richblack-700 p-10 px-[5.5rem] mx-auto'>
        <p className='text-richblack-300 py-2 '>Home | Catalog | <span className='text-yellow-200'>{catalogName}</span></p>
        <p className='text-4xl text-white '>{catalogPageData?.a?.searchedcategory[0]?.category}</p>
        <p className='text-richblack-300 py-3'>{catalogPageData?.a?.searchedcategory[0]?.description}</p>
      </div>
        {/* section 1 */}
       <div className='p-10 px-[5.5rem]'>
  <div className='text-4xl text-white'>Courses to get you started</div>
  <div className='h-full border-b-[1px] border-richblack-700 my-2'>
    <button onClick = {()=>setactive(1)} className={`mx-2 p-2 ${active===1 ? "text-yellow-50 border-b-[1px] border-yellow-50":"text-white"}`}>Most Popular</button>
    <button onClick = {()=>setactive(2)} className={`mx-2 p-2 ${active===2 ? "text-yellow-50 border-b-[1px] border-yellow-50":"text-white"}`}>New</button>
  </div>
  <div>
    <CourseSlider data={catalogPageData?.a?.searchedcategory[0].list_of_that_course || []}/>
  </div>
        </div>
        {/* section 2 */}
      <div className='p-10 px-[5.5rem]'>
  <div className='text-4xl text-white'> Top Courses in {catalogName}</div>
  
  <div className='my-4 flex flex-col w-full'>

    {
     catalogPageData?.a?.differentcategory?.map((data,index)=>(
      data?.list_of_that_course!=0 && <div key ={index} className='my-5'>
        <CourseSlider data = {data.list_of_that_course}/>
     </div>
     )) 
    }
 \
  </div>
       </div>
        {/* section 4 */}
        <div className='p-10 px-[5.5rem]'>
  <div className='text-4xl text-white'>Frequently Bought</div>
  
  <div>
   
        {/* <div  className='p-4 text-white  flex flex-row'> */}
          
          <CourseSlider data = {catalogPageData?.a?.mostSellingCourses}/>
        {/* </div> */}
     
    
  </div>
</div>
    </div>
    
  )
}
