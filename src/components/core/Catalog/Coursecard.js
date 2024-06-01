import React ,{ useEffect, useState } from 'react'
import Averagerating from '../../../utils/Averagerating';
import RatingStars from '../../common/RatingStars';
import {Link} from "react-router-dom";
export default function Coursecard({course}) {
  const [avgReviewCount, setAvgReviewCount] = useState(0);
  useEffect(()=> {
    const count = Averagerating(course.ratings_and_reviews);
    setAvgReviewCount(count);
},[course])
  return (
    <Link to = {`/courses/${course._id}`} className='text-white my-3'>
      <img src = {course.thumbnail} className='w-[400px] h-[250px]'/>
      <p>{course.course_name}</p>
      <p>{course.course_description}</p>
      <p>{course.Instructor.firstname} {course.Instructor.lastname}</p>
     <RatingStars Review_Count={avgReviewCount} />
       <div className='flex flex-row '>
        <p className='text-richblack-500'>{course.ratings_and_reviews.length}</p>
         <span className='text-richblack-500 mx-2'>Ratings</span>
     </div> <p>Rs. {course.price}</p>
    </Link>
  )
}
