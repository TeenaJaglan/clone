import React from "react";
import HighlightText from "../core/HomePage/HighlightText";
import { Link } from "react-router-dom";
export default function LearningGrid() {
  const card = [
    {
      order: -1,
      title: `World-Class Learning for`,
      title2: "Anyone, Anywhere",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
        btntext:"Learn More",
        link : "/"
    },
    {
      order: 1,
      title: "Curriculum Based on Industry Needs",
      description:
        "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
    },
    {
      order: 2,
      title: "Our Learning Methods",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
      order: 3,
      title: "Certification",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
      order: 4,
      title: `Rating "Auto-grading"`,
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
      order: 5,
      title: "Ready to Work",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
  ];
  return (
    <div className="my-8 grid grid-cols-4 m-[10rem]">
      {card.map((box, index) => {
        return box.order < 1? (
        <div key = {index} className="flex flex-col w-auto p-2 h-[294px] col-span-2 gap-8"> 
          <div className="text-white text-4xl font-bold ">{box.title} <HighlightText text = {box.title2}/></div>
          <div className="text-md text-richblack-5">{box.description}</div>
          <button  className="bg-yellow-50 text-black p-2  hover:p-2 scale-95 font-semibold text-center w-3/12 transition-all duration-200 rounded-lg hover:drop-shadow-[0]"><Link to = {box.link}>{box.btntext}</Link></button>
         
        </div>
        ):(
        <div key = {index} className={`p-5 w-auto text-richblack-50 h-[294px] ${box.order===3?("col-start-2"):("")} ${box.order%2===0?("bg-richblack-800 "):("bg-richblack-700")}`}>
          <div className="text-white font-bold my-3 mb-5">{box.title}</div>
          <div>{box.description}</div>
        </div>
        )
      })}
    </div>
  );
}
