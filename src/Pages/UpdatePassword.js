import React from "react";
import Passwordbox from "../components/common/passwordbox";

export default function UpdatePassword() {
  return (
    <div className="w-screen h-screen mx-auto ">
      <div className="flex flex-col border-[2px] border-white  items-center">
        <p className="text-4xl font-bold text-white my-2">
          Choose New Password
        </p>
        <p className="text-richblack-200 text-md my-1">
          Almost done. Enter Your New Password and All Done.
        </p>
        <label className="text-richblack-200">
          New Password <span className="text-pink-200">*</span>
          <Passwordbox placeholder={"  New Password"} />
        </label>
        <label className="text-richblack-200" >
          Confirm New Password <span className="text-pink-200">*</span>
          <Passwordbox placeholder={"Confirm New Password"} />
        </label>
        <button className="rounded-[5px] my-2  p-2 bg-yellow-200 w-11/12 px-2 mx-auto">
          Reset Password
        </button>
      </div>
    </div>
  );
}


//otp input kya hota h ye batao