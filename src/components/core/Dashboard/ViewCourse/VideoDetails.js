import React, { useRef ,useState,useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { BigPlayButton, Player } from 'video-react'; 
import { FaPlay } from "react-icons/fa";
import "video-react/dist/video-react.css";
import {updatecompletedLectures} from "../../../../slices/ViewcourseSlice";
import { markLectureAsComplete } from '../../../../services/operations/ratingsApi';
import IconBtn from '../../../common/IconBtn';
export default function VideoDetails() {
  const {courseId,sectionId,subsectionId} = useParams();
  let last = true;let first= true;
  const {courseSectionData,courseEntireData,completedLectures,totalNoOfLecturess} 
  = useSelector((state)=>state.viewcourse);
  const {token} = useSelector((state)=>state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const PlayerRef = useRef(null);
  const [videoData,setvideoData] = useState([]);
  const [videoEnded,setvideoEnded] = useState(false);
  const [videoThumbnail,setvideoThumbnail] = useState(null);

  // check if the lecture is the first video of the course
  let isfirstvideo = ()=>{
    const sectionIndex = courseSectionData.findIndex((data)=>data._id===sectionId);
    const subsectionIndex = courseSectionData[sectionIndex].subsection?.findIndex((data)=>data._id===subsectionId); 
    if(sectionIndex===0 && subsectionIndex===0){first = true;return true;}
    return false;
  };
  // check if the lecture is the last video of the course
  let islastvideo = ()=>{
    const sectionIndex = courseSectionData.findIndex((data)=>data._id===sectionId);
    const NoOfSubsection = courseSectionData[sectionIndex].subsection;
    const subsectionIndex = courseSectionData[sectionIndex].subsection?.findIndex((data)=>data._id===subsectionId);
    console.log("last video function",sectionIndex,subsectionIndex,NoOfSubsection);
    if(sectionIndex==courseSectionData.length-1 && subsectionIndex===NoOfSubsection.length-1){
      last = true;
      return true;}
    return false;
  };
  //go to the next video
  const goToNext= ()=>{
    const sectionIndex = courseSectionData.findIndex((data)=>data._id===sectionId);
    const subsectionlength = courseSectionData[sectionIndex].subsection.length;
    const subsectionIndex = courseSectionData[sectionIndex].subsection?.findIndex((data)=>data._id===subsectionId); 
    if(subsectionIndex!==subsectionlength-1){
      const nextsubsectiondata = courseSectionData[sectionIndex].subsection[subsectionIndex+1];
    navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextsubsectiondata?._id}`)
    }
    else{
     const nextsection = courseSectionData[sectionIndex+1];
     const nextsubsection = courseSectionData[nextsection].subsection[0]._id;
      navigate(`/view-course/${courseId}/section/${nextsection._id}/sub-section/${nextsubsection}`)
    }
  };
  // go to the previous video
  const goToPrev = ()=>{
    const sectionIndex = courseSectionData.findIndex((data)=>data._id===sectionId);
    const subsectionIndex = courseSectionData[sectionIndex].subsection?.findIndex((data)=>data._id===subsectionId); 
    if(subsectionIndex!==0){
      const prevsubsectiondata = courseSectionData[sectionIndex].subsection[subsectionIndex-1];
    navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${prevsubsectiondata?._id}`)
    }
    else{
    const  prevsection = courseSectionData[sectionIndex-1];
    const  prevsubsection = courseSectionData[prevsection].subsection.length-1;
    const  prevsubsectiondata = courseSectionData[prevsection].subsection[prevsubsection];
      navigate(`/view-course/${courseId}/section/${prevsection._id}/sub-section/${prevsubsectiondata?._id}`)
    }
  };

  const handlecompletedLectures = async ()=>{
    console.log("function starts");
    const res = await markLectureAsComplete( {courseId: courseId, subsectionId: subsectionId },token);
    if(res)dispatch(updatecompletedLectures(subsectionId))
  };

  useEffect(()=>{
   const fun = async()=>{
      if (!courseSectionData.length) return
      if (!courseId && !sectionId && !subsectionId) {
        navigate(`/dashboard/enrolled-courses`)
      } 
      else{
        const filterdata = courseSectionData.filter((data)=>data._id===sectionId);
        let final= filterdata[0]?.subsection?.filter((data)=>data._id===subsectionId); 
        console.log("filter and data is",filterdata,final);
        setvideoData(final[0]);
        setvideoEnded(false);
        setvideoThumbnail(courseEntireData?.thumbnail)
      }
      
    }
    fun();
  },[courseEntireData,courseSectionData,location.pathname])
  return (
    <div className='text-white m-2'>
      {!videoData ?(<div>
        <img src={videoThumbnail} alt="Preview" className="h-full w-full rounded-md object-cover" />
      </div>):(
      <div className='w-full h-full'>
        <Player
      playsInline
      ref={PlayerRef}
    poster={videoThumbnail}
      src={videoData?.video_url}
      onEnded ={()=>setvideoEnded(true)}
    >
       <BigPlayButton position="center" />
           {/* Render when the loop ends */}
       <div className='    w-full h-full'>
       {
        videoEnded  && 
        <div style = {{backgroundImage:  "linear-gradient(to top, rgb(0, 0, 0), rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.1)", }} 
        className='w-full flex  absolute z-[100] w-full h-full font-inter inset-0 flex-col items-center justify-center'>
          {
            !completedLectures.includes(subsectionId) &&  <button onClick ={()=>{console.log('hi');handlecompletedLectures()}} className='p-2 text-xl m-2 rounded-[10px]  bg-yellow-100 text-black  font-bold'>Mark As Completed</button>
          }
          <button onClick ={()=>{
            console.log(PlayerRef,"Playerref is this")
            if(PlayerRef.current){
              PlayerRef.current.seek(0);
              setvideoEnded(false);
            }
            setvideoEnded(false)
          }} className='p-2 m-2 rounded-[10px] text-xl bg-yellow-100 text-black text-xl font-bold'>Rewatch</button>
          <div className='flex flex-row items-center justify-center'>
          {
           (!isfirstvideo) &&  <button onClick ={()=>(goToPrev)} className='p-2 m-2 rounded-[10px] text-xl bg-richblack-600 text-white  font-bold'>Prev</button>
          }
          {
          ( !islastvideo) && <button onClick ={()=>(goToNext)} className='p-2 m-2 rounded-[10px] text-xl bg-richblack-600 text-white  font-semibold'>Next</button>
          }
          </div>
        </div>
        
       }
       </div>
      </Player>
      </div>)}
      <h1 className="mt-4 text-3xl font-semibold">{videoData?.title}</h1>
      <p className="pt-2  pb-6">{videoData?.description}</p>
    </div>
  )
}
