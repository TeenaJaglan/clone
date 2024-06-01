import React, { useEffect } from 'react'
import Coursecard from "./Coursecard";
import { Swiper, SwiperSlide } from 'swiper/react';
import {Autoplay, Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import "swiper/css/autoplay";
export default function CourseSlider({data}) {
 
  useEffect(()=>{
    console.log("data recieved in slider is",data,);
  })
  return (
    <div>
      {
        data?.length!=0 ? (<Swiper

      className="mySwiper w-full my-5 "
      // onSlideChange={()=>console.log("slide changed of courses")}
      slidesPerView={2} spaceBetween={25} loop={true}
      breakpoints={{1024:{slidesPerView:2,},}}
       modules={[Navigation,Pagination, Autoplay, Scrollbar, A11y]}
       scrollbar={{ draggable: true }}
       freeMode={true}
        autoplay={{delay: 4000,  disableOnInteraction: false, }}
           >
            {
                data?.map((course,index)=>(
                    <SwiperSlide key ={index}>
                     
                        <Coursecard  course={course} Height={"h-[250px]"}/>
                    </SwiperSlide>
                ))
            }
        </Swiper>
        ):(<p className="text-xl text-richblack-5 block">No courses found</p>)
      }
    </div>
  )
}
