import React, { useState, useEffect } from "react";
import { seteditcourse, setmycourse } from "../../../../../slices/courseSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { IoAddSharp } from "react-icons/io5";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { ImParagraphJustify } from "react-icons/im";
import { IoMdArrowDropdown } from "react-icons/io";
import SubSectionModal from "./subSectionModal";
import { useNavigate } from "react-router-dom";
import { SectionDeletion } from "../../../../../services/operations/sectionAPI";
import Confirmationmodal from "../../../../common/Confirmationmodal";
import { AiFillCaretDown } from "react-icons/ai"
import { FaPlus } from "react-icons/fa"
import { MdEdit } from "react-icons/md"
import { RiDeleteBin6Line } from "react-icons/ri"
import { RxDropdownMenu } from "react-icons/rx"
import { SubSectionCreation, SubSectionDeletion, SubSectionEdit } from "../../../../../services/operations/subsectionAPI";
export default function NestedView({
  data,
  register,
  setValue,
  getValues,
  formdata,
  seteditSectionName,
  handleChangeEditSectionName,
}) {
  const dispatch = useDispatch();
  const { editcourse, mycourse } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const [confirmationmodal,setconfirmationmodal] = useState(null);
  const [sectionId, setsectionId] = useState(null);
  const [modal, setmodal] = useState(null);
  const [hide,sethide] = useState(false);
  useEffect(() => {
    console.log(",modal ia", modal);
    console.log("mycourse is", mycourse);
  }, [modal, mycourse]);
 
  async function Deletesection(item) {
    console.log("delete section starts");
    try {
      console.log("item to be deleted is", item);
      const data = {
        sectionId: item._id,
        course_Id: mycourse._id,
      };
      const res = await SectionDeletion(data, token);
      console.log("deleted response is", res);
      if (res.data.success) {
        toast.success("section deleted successfully");
        dispatch(setmycourse(res.data.course));
      }
    } catch (err) {
      console.log("error in section deletion ");
      return;
    }
  }
  async function onDelete(subsectionId,sectionId){
    console.log("delete button working");
    const form = {
        sectionId,
        subsectionId,
        courseId:mycourse._id
    }
    console.log("data  for delete ",form);
    const res = await SubSectionDeletion(form,token);
    console.log("deletion subsection response",res);
    dispatch(setmycourse(res.data.data));
    setconfirmationmodal(null);
  }
  function editsection(id,name){
    console.log("edit section starts");
    seteditSectionName(true);
    handleChangeEditSectionName(
      name,
      id
    )}
  function editsubsection(id , sub){ 
    console.log("edit subsectuion strts");
    setsectionId(id);
    // console.log(sub);
    // const d = {...sub}
    // console.log("sub copy is",d,id);
        setmodal(sub);
    console.log("data to be send for edit subsection is", sectionId, modal);
  }
  function deletesubsection(sub_id,item_id){
   setconfirmationmodal({
              text1:"Delete this Sub Section",
              text2:"Selected lectures in this Sub Section will be deleted",
              btntext1:"Delete",btntext2:"Cancel",
              btn1Handler:()=>{onDelete(sub_id,item_id)},
              btn2Handler:()=>{setconfirmationmodal(null);console.log("confirmodal is",confirmationmodal)}
             })
  }


  return (
   
    <div className="  cursor-pointer  rounded-[15px] text-richblack-50 font-bold px-5 bg-richblack-700 my-4 flex flex-col border-[1px] border-richblack-600 p-5"> 
      {mycourse?.courseContent?.map((item, index) => (
        <div key={index}>
{/* section part */}
          <div className="cursor-pointer w-full py-2 b border-b-[1px] border-richblack-400 flex flex-row justify-between">
{/* section name */}
            <div
              className=" flex flex-row justify-evenly items-center cursor-pointer" 
            >
              <span  onClick={()=>sethide(!hide)}><IoMdArrowDropdown /></span>
              <span className="mx-2"><ImParagraphJustify /></span>
             <span>{item.section_name}</span> 
            </div>
 {/* //icons-edit,delete,dropdown */}
            <div className="h-auto  flex flex-row mx-1 px-2 text-[1.2rem] justify-evenly cursor-pointer">
            <button className="mx-1"
              onClick={() =>editsection(item._id,item.section_name) }
            >
              <FiEdit2 />
            </button >
            <button className="mx-1"
              onClick={() =>Deletesection(item)}
            >
             <RiDeleteBin5Line />
            </button>
            <p className="h-full w-[1px] border-[1px] mx-1 border-richblack-50"></p>
            <button className="mx-1" onClick={()=>sethide(!hide)}><IoMdArrowDropdown /></button>
            </div>

          </div>
          
{/* //subsection part */}
          {
            hide && 
          
          <div className="w-full justify-end flex flex-col">
            
          {item.subsection.map((sub, index) => (

            <div className="cursor-pointer mx-3 w-11/12 py-2 b border-b-[1px] border-richblack-400 flex flex-row justify-between" key = {index}>
                {/* subsection name */}
            <div
              className=" flex flex-row justify-evenly items-center cursor-pointer"
            >
              <span className="mx-2"><ImParagraphJustify /></span>
             <span>{sub.title}</span> 
            </div>
                 {/* icons-edit,delete,dropdown */}
            <div className="h-auto  flex flex-row mx-1 px-2 text-[1.2rem] justify-evenly">
            <button className="mx-1"
                onClick={() => (editsubsection(item._id,sub))
              }
            >
              <FiEdit2 />
            </button >
            <button className="mx-1"
              onClick={() => (deletesubsection(sub._id,item._id))}
            >
             <RiDeleteBin5Line />
            </button>
            </div>

          </div>
          ))}


 {/* Add Lecture */}
           <div className="mx-3 w-11/12 py-2"
            onClick={() => {
    console.log("data for add lecture is", sectionId, modal);
    setsectionId(item._id);
    setmodal(null);
    console.log("datafor add lecture is ", sectionId, modal);
  }}
  >
  <button  className = "text-yellow-100 text-md flex flex-row  items-center justify-center py-2"
  >
    <span className="mr-1"><IoAddSharp /></span><span>Add Lecture</span>{item?.subsection?.title}
  </button>
</div>
          </div>
}

     
        </div>


      ))}
     
      {
        confirmationmodal && <Confirmationmodal modal = {confirmationmodal}/>
      }
     
      {(modal || sectionId) && (
        
        <SubSectionModal
          data={modal}
          sectionId={sectionId}
        
          crosshandler={() => {
            setmodal(null);
            setsectionId(null);
          }}
        />
        
      )}
    </div>
  )
};
