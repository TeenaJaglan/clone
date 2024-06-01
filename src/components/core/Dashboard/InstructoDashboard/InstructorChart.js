import React,{useState} from 'react';
import {Chart,registerables} from "chart.js";
import { Pie } from 'react-chartjs-2';
import { useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';


export default function InstructorChart(courselist) {
  const [currChart,setcurrChart] = useState("students");
  const courses = courselist.courselist;
  Chart.register(ArcElement, Tooltip, Legend);
  Chart.register(...registerables);
  useEffect(()=>{
    console.log("courses in chart is",typeof courses,courses,dataforIncome,dataforStudents)
  })
  //generate random colors 
  const randomColors = (numColors)=>{
    let colors = [];
    for(let i = 0; i < numColors; i++){
      const color = `rgb(${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)})`
      colors.push(color);
    }
    return colors;

  }

//create data for chart displaying student info
const dataforStudents ={
 labels:courses?.map((course)=>course.course_name),
  datasets:[{
    data:courses.map((course)=>course?.students_enrolled?.length||0),
    backgroundColor:randomColors(courses.length||0),
  }]
}
//create data for chart displaying instructor info
const dataforIncome ={
  labels:courses?.map((course)=>course.course_name),
  datasets:[{
    data:courses.map((course)=>course?.students_enrolled?.length*course?.price),
    backgroundColor:randomColors(courses?.length||0),
  }]
}
//options creation 
const options = {
  maintainAspectRatio: false,
}

  return (
    <div className="flex flex-1 flex-col gap-y-4 rounded-md bg-richblack-800 p-6">
     
    <p className="text-lg font-bold text-richblack-5">Visualize</p>
    <div className="space-x-4 font-semibold">
      {/* Button to switch to the "students" chart */}
      <button  onClick={() => setcurrChart("students")}  className={`rounded-sm p-1 px-3 transition-all duration-200 ${currChart === "students" ? "bg-richblack-700 text-yellow-50" : "text-yellow-400" }`} >
        Students
      </button>
      {/* Button to switch to the "income" chart */}
      <button onClick={() => setcurrChart("income")} className={`rounded-sm p-1 px-3 transition-all duration-200 ${currChart === "income" ? "bg-richblack-700 text-yellow-50" : "text-yellow-400" }`} >
        Income
      </button>
    </div>
    <div className="relative mx-auto aspect-square h-full w-full p-1">
      {/* Render the Pie chart based on the selected chart */}
      <Pie data={currChart === "students" ? dataforStudents : dataforIncome} options={options} />
    </div>
 
  </div>
  )
}
