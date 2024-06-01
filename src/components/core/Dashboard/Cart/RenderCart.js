import React,{useEffect,useState} from 'react'
import { RiDeleteBin6Fill } from "react-icons/ri";
import StarRatings from 'react-star-ratings';
import { useSelector ,useDispatch } from 'react-redux';
import { removeFromCart } from '../../../../slices/cartSlice';
import toast from "react-hot-toast"
export default function RenderCart() {
    let {cartlist} = useSelector(state=>state.cart);
    
    const dispatch = useDispatch();
    
 function  remove(data){
        try{
            console.log("remove function called for",data);
          const res =  dispatch(removeFromCart(data));
          console.log(res);
        }
        catch(err){
console.log("failed to remove item",err);
        }
    }
    useEffect(()=>{
      console.log("cartlist in the cart is:",cartlist);
    },[])
  return (
    <div className='text-sm w-full'>
        {
            !cartlist && <div className='text-center font-semibold text-white text-3xl'>Your Cart is Empty</div>
        }
      
      {
        cartlist.map((item,index)=>(
            <div className='grid grid-flow-rows md:grid-flow-col col-span-3 gap-2  my-3 ' key = {index}>
                <img src={item?.thumbnail} alt="image" className='w-[250px] h-[200px] border-2 border-white rounded-[2px]' />

                <div className='flex flex-col '>
                     <p className='text-white text-[1.3rem]'>{item?.course_name}</p>
                   <p className='text-richblack-300'>{item?.Instructor.firstname} {item?.Instructor.lastname}</p>
                   <p className='text-yellow-200 items-center flex flex-row'>{item?.ratings_and_reviews?.rating}<span>
                    <div className='mx-1  text-yellow-200'>
                     <StarRatings
        rating={item?.ratings_and_reviews?.rating||0}
        starDimension="15px"
        starRatedColor="yellow"
        starSpacing="2px"
        numberOfStars={5}
      /> 
      </div>
                    </span></p> 

                    </div>
                    <div>
                        <button className='p-2  flex flex-row  justify-evenly text-center items-center bg-richblack-700 text-pink-200 rounded-[10px]  '  onClick = {()=>(remove(item))}><RiDeleteBin6Fill className='mx-1 font-bold' /><span>Remove</span> </button>
                        <p className='text-yellow-200  my-2 mx-1 text-[1rem]'> Rs.{item?.price}</p>
                        </div>
            </div>
    ))
      }
    </div>
  )
}
