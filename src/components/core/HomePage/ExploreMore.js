import React from 'react'
import { FaLongArrowAltRight } from "react-icons/fa";
import CTAButton from "./Button";

export default function ExploreMore() {
  return (
    <div className=" w-full mt-6 bg-white w-full h-[300px] section2_bg p-1 ">
    <div className="flex flex-wrap flex-row items-center justify-center">
      <CTAButton route="" active={true}>
        Explore Full Catalog{" "}
        <span className="px-1">
          <FaLongArrowAltRight />
        </span>
      </CTAButton>
      <CTAButton route="/About" active={false}>
        Learn more
      </CTAButton>
    </div>
  </div>
  )
}
