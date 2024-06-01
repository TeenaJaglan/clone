import React,{useRef} from 'react'
import { courses } from '../../services/api';
import { apiconnector } from '../../services/apiconnector';
import { useEffect,useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import {Autoplay, Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import "swiper/css/autoplay";
import ReviewSliderCard from './ReviewSliderCard';
export default function ReviewSlider() {
const [result,setresult] = useState([]);

async function fetchreview(){   
try{
    const get_ratings_api = courses.GETRATINGS;
   const  response = await apiconnector("GET",get_ratings_api);
   setresult(response.data.data);
    console.log("rating data:",response.data.data);
}catch(err){
console.log("error while  fetching reviews");
console.log(err);
}
}

useEffect(()=>{
    fetchreview();
},[])
  return (
   
      <div className=' mx-[2rem] my-[50px] h-[184px] max-w-maxContentTab lg:max-w-maxContent flex-row  '>
<Swiper
className="mySwiper w-full"
slidesPerView={3} spaceBetween={25} loop={true}
breakpoints={{1024:{slidesPerView:3,},}}
 onSlideChange ={ console.log("review changes")}

 modules={[Navigation,Pagination, Autoplay, Scrollbar, A11y]}
 scrollbar={{ draggable: true }}

 freeMode={true}
  autoplay={{delay: 2000,  disableOnInteraction: false, }}
      >
       
        {
result.map((review,index)=>(
<SwiperSlide key ={index}>
  <ReviewSliderCard review={review} /> 
</SwiperSlide>
))
}
</Swiper>
</div>
  
  )
}
