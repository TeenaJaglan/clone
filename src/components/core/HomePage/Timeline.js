import React from 'react'
import logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import logo4 from "../../../assets/TimeLineLogo/Logo4.svg"
import TimelineImage from "../../../assets/Images/TimelineImage.png"

export default function Timeline() {
    const data = [
       {logo:logo1,heading:"Leadership",description:"Fully committed to the success company"},
       {logo:logo2,heading:"Leadership",description:"Fully committed to the success company"},
       {logo:logo3,heading:"Leadership",description:"Fully committed to the success company"},
       {logo:logo4,heading:"Leadership",description:"Fully committed to the success company"},
       
    ];
  return (
    <div className='bg-white  flex md:flex-row  flex-col items-center my-[2rem] h-full   justify-between w-full mx-auto '>
        <div className='flex flex-col items-center w-6/12  m-[1rem] md:justify-between  justify-center'>
            
            {
                data.map((item,index)=>{
                    return (<div className='flex flex-row gap-8  justify-between' key={index}>
                        <img src={item.logo} alt="logo" />
                        <div className='flex flex-col py-1'><p className='font-bold pt-3 '>{item.heading}</p><p>{item.description}</p></div>
                    </div>);
                })
            }
            
        </div>
        <div className='  relative shadow-blue-300 w-6/12  m-[1rem] shadow-[-10px_0px_50px_5px]  flex justify-center flex-wrap'>
            <img src={TimelineImage} alt="image1" className=" shadow-[20px_20px_0px_0px] shadow-white"/>
            <div  className=' absolute md:top-[90%] md:left-[5%] left-[0%] px-3 w-11/12  text-caribbeangreen-200 bg-caribbeangreen-600 flex md:flex-row  flex-col justify-evenly items-center'>
                <div className='flex  flex-row text-center  justify-evenly w-auto '>
                    <p className='text-white font-bold w-3/12 text-[2.5rem]'>10</p>
                    <p className='w-5/12 w-auto sm:mx-[8px] mx-auto flex items-center xxxs:text-[1.5vw] sm:text-[1.5vw]'>YEARS OF EXPERIENCE</p>
                </div>
                <div className=' mr-[1.5rem] md:border-[1px] md:h-[50px] w-auto border-caribbeangreen-200  '></div>
                <div className='flex flex-row text-center w-auto justify-evenly '>
                    <p className='text-white  font-bold sm:text-[4vw] text-[2.5rem]'>250</p>
                    <p className=' w-5/12 w-auto sm:mx-[8px] mx-auto flex items-center xxxs:text-[1.5vw] sm:text-[1.5vw]' >TYPE OF COURSES</p>
                </div>
            </div>
        </div>
      <div></div>
    </div>
  )
}
