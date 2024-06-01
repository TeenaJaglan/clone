import React from "react";
import { useState } from "react";
import CTAButton from "../../HomePage/Button";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineFileUpload } from "react-icons/md";
import { useRef } from "react";
import toast from "react-hot-toast";
import { useDropzone } from "react-dropzone";
import { useEffect } from "react";
import { Updateprofileimage } from "../../../../services/operations/profileAPI";
import { useNavigate } from "react-router-dom";
export default function Updateprofilepicture() {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [previewsource, setpreviewsource] = useState(null);
  const [selectedfile, setselectedfile] = useState(null);
  const [newImage, setnewImage] = useState(user.image);
  const inputref = useRef(null);

  const previewfile = (image) => {
    try {
      console.log("file is", image);
      const reader = new FileReader();
      reader.readAsDataURL(image);
      console.log("reader url ", reader);
      reader.onloadend = () => {
        setpreviewsource(reader.result);
      };
      console.log("reder resultt is", image);
    } catch (err) {
      console.log("the error in previewfile is : ", err);
      toast.error("failed to update profile pic");
    }
  };


  const onDrop = (acceptedfiles) => {
    const file = acceptedfiles[0];
    console.log("acceptfiles is", acceptedfiles, acceptedfiles[0]);
    if (file) {
      previewfile(file);
      setselectedfile(file);
    }
    console.log("final ans are", selectedfile, previewsource);
  
  };


  useEffect(() => {
    console.log("the finals are", previewsource, selectedfile);
  }, [previewsource, selectedfile]);

  const { getInputProps, getRootProps, isDragActive } = useDropzone({
    accept: { "image/*": [".jpg", ".png", ".jpeg"] },
    onDrop,
  });

async function profilepictureupload(){
const res = await Updateprofileimage(dispatch,selectedfile,token);
console.log("upload res",res);
if(!res){navigate("/about");}
setnewImage(res.image);
}

  return (
    <div>
      <div className=" my-10 flex mx-auto flex-row bg-richblack-800 md:flex-row flex-col justify-between items-center  py-7 px-10 border-[2px] border-richblack-500  rounded-[5px]">
        <div className="flex lg:flex-row flex-col justify-start   w-4/12 h-full items-center">
          <img
            src={newImage}
            className="w-[70px] h-[70px] rounded-[100%] my-1"
          />
          <div className="flex flex-col h-full  items-center  lg:items-start text-white mx-4">
            <p>Change Profile Picture</p>
            <div className=" my-1 flex flex-row ">
              <div {...getRootProps()}>
                <input type="file" {...getInputProps()} ref={inputref} />
                <button className={`p-2 bg-richblack-700 font-bold text-richblack-50 mr-4  ${
          isDragActive ? "bg-richblack-500" : "bg-richblack-700"
        }  
        rounded-[10px] px-5`}>
                  Select
                </button>
              </div>
              <button className="p-2 bg-yellow-50 flex flex-row items-center justify-between font-bold text-black  rounded-[10px] px-5" onClick= {profilepictureupload}>
                Upload{" "}
                <span className="ml-1">
                  <MdOutlineFileUpload />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
