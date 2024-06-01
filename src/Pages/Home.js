import React from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import HighlightText from "../components/core/HomePage/HighlightText";
import CTAButton from "../components/core/HomePage/Button";
import Banner from "../assets/Images/banner.mp4";
import Codeblocks from "../components/core/HomePage/Codeblocks";
import Timeline from "../components/core/HomePage/Timeline";
import Learninglanguage from "../components/core/HomePage/Learninglanguage";
import ExploreMore from "../components/core/HomePage/ExploreMore";
import Instructor from "../components/core/HomePage/Instructor";
import Footerfoot from "../components/common/Footer";
import ReviewSlider from "../components/common/ReviewSlider";
const Home = function () {
  const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];
  return (
    <div className="max-w-full   max-h-screen object-contain">
      {/* section 1*/}
      <div className=" bg-black flex flex-col w-full object-contain gap-8 relative mx-auto text-[1.2rem] text-white items-center ">
        <Link
          to="/Signup"
          className=" mt-16 p-1 flex text-center shadow-bg-richblue-600 gap-2 justify-center items-center group drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] hover:drop-shadow-none hover:border-[0.2rem] hover:scale-95 transition-all duration-200 rounded-full border-richblack-600"
        >
          <div className="text-center  px-10 py-[5px] bg-richblack-800 rounded-full text-richblack-200  px-[15px] py-[5px] w-fit group-hover:bg-richblack-900  flex items-center">
            <p className="px-5">Become an Instructor</p>
            <FaLongArrowAltRight />
          </div>
        </Link>
        <div className=" text-4xl font-semibold text-center items-center">
          Empower your Future with <HighlightText text={"Coding Skills"} />
        </div>
        <div className=" text-center items-center  font-bold mt-3 w-[80%]  text-lg text-richblue-300">
          With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on projects, quizzes, and personalized feedback from
          instructors.
        </div>
        <div className="text-center flex gap-2 b mt-8 items-center">
          <CTAButton route="/About" active={true}>
            Learn more
          </CTAButton>
          <CTAButton route="/Signup" active={false}>
            Book a demo
          </CTAButton>
        </div>
      

      <div className="w-10/12 bg-black mx-auto my-8 shadow-[10px_-5px_30px_5px] shadow-blue-300 ">
        <video
          className="  shadow-[30px_30px_0px_0px] shadow-white "
          muted
          autoPlay
          loop
        >
          <source src={Banner} type="video/mp4" ></source>
          Your browser does not support the video Your browser do not suppport
          this video type
        </video>
      </div>

<div className="bg-black py-[1rem]">
      <Codeblocks
        heading="Coding Skills"
        alignment="flex flex-row"
        button1={{ text: "Try it Yourself", route: "/Signup", active: true }}
        button2={{ text: "Learn more", route: "/About", active: false }}
        text_part1="Unlock Your"
        text_part2="with our online courses"
        code={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
        codeColor="white"
        bggradient={<div className="codeBlock1 absolute"></div>}
      >
        Our courses are designed and taught by industry experts who have years
        of experience in coding and are passionate about sharing their knowledge
        with you.
      </Codeblocks>
      <Codeblocks
        heading="Coding in seconds"
        alignment=" flex flex-row-reverse"
        button1={{ text: "Continue Lesson", route: "/Signup", active: true }}
        button2={{ text: "Learn more", route: "/About", active: false }}
        text_part1="Start"
        code={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
        codeColor="white"
        bggradient={<div className="codeBlock2 absolute"></div>}
      >
        Go ahead, give it a try. Our hands-on learning environment means you'll
        be writing real code from your very first lesson.
      </Codeblocks>
</div>
</div>
      {/* section 2*/}
      <ExploreMore />
      <div className="bg-white pb-[4rem]">
        <div className="flex flex-row flex-wrap w-11/12 mx-auto items-center justify-between h-full">
          <div className="font-bold w-5/12 text-black text-4xl font-semibold ">
            Get the Skills you need for a{" "}
            <HighlightText text={"Job that is in demand"} />
          </div>
          <div className="w-5/12 h-full flex flex-col justify-center items-center p-2">
            <p className="text-black p-5 ">
              The modern StudyNotion is the dictates its own terms. Today, to be
              a competitive specialist requires more than professional skills.
            </p>
            <CTAButton route="/About" active={true}>
              Learn more
            </CTAButton>
          </div>
          <Timeline />
          <Learninglanguage />
          <div></div>
        </div>
      </div>
      {/* section 3*/}
      <div className="bg-black">
        <Instructor />
        <div className="py-2">
          <h1 className="text-white text-4xl font-bold text-center">
            Reviews from Other Learners
          </h1>
          <ReviewSlider/>
        </div>
      </div>
      {/* section 4 */}
      <div className="py-[3rem] bg-richblack-800">
        <Footerfoot />
        <div className="   border-richblack-700  border-[1px] w-11/12 h-auto mx-auto"></div>
        <div className="my-2 flex  mx-[52px]  flex-row justify-between items-center">
          <div className="  text-richblack-200 my-2 flex flex-row w-3/12  justify-center">
            {BottomFooter.map((data,index) => {
              return (
                <div className=" flex flex-row  text-[1rem] m-0" key = {index}>
                  <Link to="" className="mx-2">
                    {data}
                  </Link>
                  {data !== "Terms" ? (
                    <div className="border-[1px] border-richblack-200 h-full"></div>
                  ) : (
                    <div></div>
                  )}
                </div>
              );
            })}
          </div>
          <div className="mr-2 text-richblack-200">
            Made with so much of love and hardwork
          </div>
        </div>
      </div>
      
      
    </div>
  );
};

export default Home;
