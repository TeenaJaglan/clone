import React, { useState, useEffect, useRef } from "react";
import { Player } from "video-react";
import { TbCloudUpload } from "react-icons/tb";
import { useDropzone } from "react-dropzone";
export default function Upload({
  name,
  register,
  setValue,
  label,
  video = false,
  viewData = null,
  editData = null,
}) {
  const [selectedfile, setselectedfile] = useState(null); //isme file save hogi
  const [previewsource, setpreviewsource] = useState(
    viewData ? viewData : editData ? editData : ""
  ); //isme file url save hoga
  const inputRef = useRef(null);
useEffect(()=>{
  if(viewData){
    setpreviewsource(editData)
  }
})
  //ye function file ko selectedfile m store karta h
  const onDrop = (acceptedfiles) => {
    console.log("accepted file is ", acceptedfiles,acceptedfiles[0]);
    const file = acceptedfiles[0];
    if (file) {
      previewFile(file);
      setselectedfile(file);
    }
    
  };
  const previewFile = (file) => {
    try {
      const reader = new FileReader();
      console.log("file is", file);

      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setpreviewsource(reader.result);
      };
      console.log("reader is:",reader);
    } catch (error) {
      console.error('Error previewing file:', error);
    }
  };

  const { getInputProps, getRootProps, isDragActive } = useDropzone({
    accept: !video
      ? { "image/*": [".jpg", ".png", ".jpeg"] }
      : { "video/*": [".mp4"] },
    onDrop,
  });



  useEffect(() => {
    register(name, { required: true });
  }, [register]);

  
  useEffect(() => {
    setValue(name, selectedfile);
    console.log("file upload is:",selectedfile);
    console.log("previewsource and selectedfiles is:",previewsource);
  }, [selectedfile, setValue]);


  return (
    <div className="px-2 py-4 flex flex-col">
      <label htmlFor={name}>
        {label}
        {!viewData && <sup className="text-pink-200">*</sup>}
      </label>
      <div
        className={`px-2 flex flex-col ${
          isDragActive ? "bg-richblack-600" : "bg-richblack-800"
        }  w-full h-auto px-2 py-4  border-b-[1px] border-white rounded-[10px]`}
      >
        {previewsource ? (
          <div className="w-full flex flex-col justify-center items-center mx-auto">
            {!video ? (
              <img src={previewsource} alt="Preview Image"
               className=" bg-pink-700 w-[300px] h-[300px] " />
            ) : (
              <Player src={previewsource} playInline aspectRatio="16:9" />
            )}
            <button
              className="text-richblack-400 underline my-4"
              type="button"
              onClick={() => {
                setpreviewsource("");
                setselectedfile("");
                setValue(name, null);
              }}
            >
              Cancel
            </button>
          </div>
        ) : (
          <div
            {...getRootProps()}
            className="text-center w-9/12 mx-auto text-richblack-500 text-sm cursor-pointer"
          >
            <input {...getInputProps()} ref={inputRef} />
            <div className="">
              <TbCloudUpload className="w-full h-[3rem] font-bold text-yellow-100" />
            </div>
            <p className="w-8/12 mx-auto">
              Drag or Drop {!video ? "an image" : "a video"} or click to{" "}
              <span className="font-bold text-yellow-100 mx-1">Browse</span> a file
            </p>
            <ul className="flex flex-row justify-evenly w-8/12 mx-auto">
              <li>Aspect Ratio : 16:9</li>
              <li>Recommended size : 1024X576</li>
            </ul>
          </div>
        )}

        {/* {errors.courseTitle && <p>Course Thumbnail is required.</p>} */}
      </div>
    </div>
  );
}

//summary :-
// In this code, selectedfile and previewsource are state variables used to manage the selected file and its preview source, respectively.
// selectedfile is used to store the selected file object, which is updated when a file is dropped or selected using the file input. The onDrop function is responsible for updating the selectedfile state when a file is dropped onto the dropzone.
// previewsource is used to store the URL or data URL of the selected file, which is used to display a preview of the selected file. The previewFile function is responsible for creating a data URL from the selected file and updating the previewsource state.
// When a file is selected or dropped, the selectedfile state is updated with the new file object, and the previewsource state is updated with the preview source of the file. This allows the component to display a preview of the selected file and provide a way to cancel the selection or remove the file.
// In the useEffect hook, the selectedfile state is registered with the form using the register function, which associates the selected file with the corresponding form field. This allows the form to include the selected file as part of its data when it is submitted.
// getInputProps: This function provided by the useDropzone hook returns props that need to be applied to an input element to enable file selection. These props include event handlers like onClick and onKeyDown that are necessary for the input element to function correctly within the dropzone component.
// getRootProps: This function from useDropzone returns props that should be applied to the root element of the dropzone component. These props include event handlers like onDragEnter, onDragLeave, and onDrop, which are essential for handling drag-and-drop interactions within the dropzone area.
// isDragActive: This variable from useDropzone is a boolean value that indicates whether a user is currently dragging a file over the dropzone area. When isDragActive is true, it signifies that a file is being dragged over the dropzone, allowing the component to provide visual feedback or change its appearance to indicate that a file can be dropped in that area.