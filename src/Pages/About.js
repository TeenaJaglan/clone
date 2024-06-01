import React from "react";
import HighlightText from "../components/core/HomePage/HighlightText";
import image1 from "../assets/Images/aboutus1.webp";
import image2 from "../assets/Images/aboutus2.webp";
import image3 from "../assets/Images/aboutus3.webp";
import Quote from "../components/AboutPage.js/Quote";
import founding from "../assets/Images/FoundingStory.png";
import StatsComponent from "../components/AboutPage.js/StatsComponent";
import LearningGrid from "../components/AboutPage.js/LearningGrid";
import Contactformsection from "../components/AboutPage.js/Contactformsection";
import ReviewSlider from "../components/common/ReviewSlider";
import Footerfoot from "../components/common/Footer";
export default function About() {
  return (
    <div>
      <section className="bg-richblack-700 relative gap-10 w-full flex flex-wrap  max-w-screen mb-4">
        <div className="bg-richblack-700   py-15 gap-10 w-full flex flex-wrap  my-4">
          <p className="text-center text-4xl font-bold text-white mx-auto my-4">
            Driving Innovation in Online Education for a
            <p className="text-center">
              <HighlightText text={"Brighter Future"} />
            </p>
          </p>
          <p className="text-richblack-300 relative mx-auto w-8/12  text-center">
            Studynotion is at the forefront of driving innovation in online
            education. We're passionate about creating a brighter future by
            offering cutting-edge courses, leveraging emerging technologies, and
            nurturing a vibrant learning community.
          </p>
        </div>
        <div className="    lg:h-[150px] sm:h-[70px]"></div>
        {/* define gap between heading and image */}

        <div className="grid  w-[100%] content-between px-5 bottom-0  translate-y-[65%] absolute grid-cols-3  bottom-0  translate-x-[3%] gap-3 lg:content-center md:translate-x-[1%]  bottom-0">
          <img src={image1} alt="failed to load image " />
          <img src={image2} alt="failed to load image" />
          <img src={image3} alt="failed to load image" />
        </div>
      </section>
      <section className="border-black  py-6 pb-10 border-t-[200px] border-b-[1px] border-b-richblack-500">
        <div className="mx-auto text-center "></div>
        <Quote />
      </section>
      <section className="bg-richblack-900 m-[5rem] flex flex-col">
        <div className="flex flex-row justify-between  mb-[4rem]">
          <div className="flex flex-col text-richblack-400 w-6/12 justify-center">
            <p className="text-bold text-4xl bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCB045] font-semibold text-transparent bg-clip-text">
              Our Founding Story
            </p>
            <p className="mt-[2rem]">
              Our e-learning platform was born out of a shared vision and
              passion for transforming education. It all began with a group of
              educators, technologists, and lifelong learners who recognized the
              need for accessible, flexible, and high-quality learning
              opportunities in a rapidly evolving digital world.
            </p>
            <p className="my-[1.5rem]">
              As experienced educators ourselves, we witnessed firsthand the
              limitations and challenges of traditional education systems. We
              believed that education should not be confined to the walls of a
              classroom or restricted by geographical boundaries. We envisioned
              a platform that could bridge these gaps and empower individuals
              from all walks of life to unlock their full potential.
            </p>
          </div>{" "}
          {/* our founding story */}
          <div>
            <img
              className="shadow-[1px_1px_5px_5px] shadow-pink-200  "
              src={founding}
              alt="foundary image "
            />
          </div>{" "}
          {/* image part */}
        </div>
        <div className="flex flex-row justify-between my-[4rem] ">
          {/* our vision */}
          <div className="flex flex-col text-richblack-400 w-5/12 justify-center">
            <p className="font-bold text-4xl bg-gradient-to-r from-[#FF512F] to-[#F09819]  font- text-transparent bg-clip-text">
              Our Vision
            </p>
            <p className="mt-[2rem]">
              With this vision in mind, we set out on a journey to create an
              e-learning platform that would revolutionize the way people learn.
              Our team of dedicated experts worked tirelessly to develop a
              robust and intuitive platform that combines cutting-edge
              technology with engaging content, fostering a dynamic and
              interactive learning experience..
            </p>
          </div>
          {/* our mission */}
          <div className="flex flex-col text-richblack-400 w-5/12 justify-center">
            <p className="text-4xl font-medium">
              <HighlightText text={"Our Mission"} />
            </p>
            <p className="mt-[2rem]">
              With this vision in mind, we set out on a journey to create an
              e-learning platform that would revolutionize the way people learn.
              Our team of dedicated experts worked tirelessly to develop a
              robust and intuitive platform that combines cutting-edge
              technology with engaging content, fostering a dynamic and
              interactive learning experience.
            </p>
          </div>
        </div>
      </section>
    <StatsComponent/>
    <LearningGrid/>
    <Contactformsection/>
    <ReviewSlider/>
    <Footerfoot/>
    </div>
  );
}
