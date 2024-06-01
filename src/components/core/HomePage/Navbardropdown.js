import React from 'react'
import { Link } from "react-router-dom";

export default function Navbardropdown({sublinks,show}) {
  return (
    <div className={` absolute h-full w-[200px] ${show?"group-hover:visible group-hover:opacity-100":"opacity-0 invisible"}     transition-all duration-150 translate-y-[1.4rem] z-[1000] left-0 flex flex-col`}>
                    <div className="absolute left-[31%] top-3  h-[40px] w-[40px]   rotate-45  rounded bg-richblack-5"></div>
                    <div className="bg-richblack-5 p-2 relative text-black flex rounded-[10px] flex-col  translate-y-[1.3rem]  h-auto ">
                      {sublinks.map((category,index) => (
                        <Link  className="p-1 border-richblack-600 hover:bg-richblack-25 transition-all duration-150 text-start w-auto text-[1.2rem] text-richblack-900" key = {index}
                         to={`/catalog/${category.category.split(" ").join("-").toLowerCase()}`}>{category.category}</Link>
                      ))}
                    </div>
                  </div>
  )
}
