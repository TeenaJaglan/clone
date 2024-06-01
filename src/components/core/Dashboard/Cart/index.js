import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import RenderCart from "./RenderCart";
import TotalAmount from "./TotalAmount";
export default function Index() {
  const { totalItems ,cartlist,totalprice} = useSelector((state) => state.cart);
  
  useEffect(() => {
    console.log("Cart Items: ", totalItems,cartlist,totalprice);
  }, []);
  return (
    <div className="text-3xl  w-10/12 mx-auto my-5 min-h-screen text-white">
      My Wishlist
      {totalItems == 0 ? (
        <p className="text-[1rem]   text-richblack-100 my-2">
          Your Cart is Empty
        </p>
      ) : (
        <div className="flex flex-col md:flex-row">
          <div className=" w-full md:w-7/12 ">
            
            <RenderCart  />
          </div>
          <TotalAmount />
        </div>
      )}
    </div>
  );
}
