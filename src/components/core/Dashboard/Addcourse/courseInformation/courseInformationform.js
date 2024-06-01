import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { HiOutlineCurrencyRupee } from "react-icons/hi2";
import { IoIosArrowForward } from "react-icons/io";
import { setstep, setmycourse } from "../../../../../slices/courseSlice";
import { getcategory } from "../../../../../services/operations/categoryAPI";
import toast from "react-hot-toast";
import {
  CreateCourse,
  updatecourse,
} from "../../../../../services/operations/courseAPI";
import RequirementField from "./RequirementField";
import Upload from "../Upload";
//react-form hook use
export default function CourseInformationform() {
  const [categoryoption, setcategoryoption] = useState([]);
  // ["Full Stack","Mern Stack","Android Development","Web Development","AI","ML","Data Science","Data Analyst"];
  const dispatch = useDispatch();
  const { editcourse, mycourse } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const { register, getValues, setValue, handleSubmit } = useForm();
  const Level = ["All", "Beginner", "Intermediate", "Advanced"];
  const Language = ["English", "Hindi"];

  useEffect(() => {
    console.log("mycourse is",mycourse);
    // if form is in edit mode
    if (editcourse) {
      const curr = getValues();
      console.log("editcourse is", editcourse);
      setValue("courseTitle", mycourse.course_name);
      setValue("courseDescription", mycourse.course_description);
      setValue("coursePrice", mycourse.price);
      setValue("courseCategory", mycourse.category);
      setValue("courseThumbnail", mycourse.thumbnail);
      setValue("courseBenefits", mycourse.what_you_will_learn);
      setValue("courseRequirements", mycourse.Instructions);
      setValue("courseThumbnail", mycourse.thumbnail);
      setValue("courseLevel",mycourse.level);
      setValue("courseLanguage",mycourse.language);
      console.log("curr in useeffect is ");
      console.log(curr);
    }
    setcategoryoption(["Full Stack","Mern Stack","Android Development","Web Development","AI","ML","Data Science","Data Analyst"]);
   // fetchcategory();
  }, []);
  async function fetchcategory() {
    try {
      const res = await getcategory();
      setcategoryoption(res);
    } catch (err) {
      console.log("error occurred during category fetching in curse", err);
    }
  }

  function isformupdated() {
    const currentvalues = getValues(); //use form hook m jo values store ki gayi h wo recieve ho jayegi
    if (
      currentvalues.courseTitle !== mycourse.course_name ||
      currentvalues.courseDescription !== mycourse.course_description ||
      currentvalues.coursePrice !== mycourse.price ||
      currentvalues.courseCategory !== mycourse.category ||
      currentvalues.courseThumbnail !== mycourse.thumbnail ||
      currentvalues.courseBenefits !== mycourse.what_you_will_learn ||
      currentvalues.Reguirements !== mycourse.Instructions
    ) {
      return true;
    }
    return false;
  }
  const onSubmit = async (data) => {
    console.log("data is", data);
    try {
      if (editcourse) {
        console.log("formdata");

        if (isformupdated()) {
          const currentvalues = getValues();
          const formdata = new FormData();
          formdata.append("CourseId", mycourse._id);
          if (currentvalues.courseTitle !== mycourse.course_name) {
            formdata.append("course_name", data.courseTitle);
          }
          if (currentvalues.courseDescription !== mycourse.course_description) {
            formdata.append("course_description", data.courseDescription);
          }
          if (currentvalues.coursePrice !== mycourse.price) {
            formdata.append("price", data.coursePrice);
          }
          if (currentvalues.courseCategory !== mycourse.category) {
            console.log("courseCategory",typeof data.courseCategory,data.courseCategory);
            formdata.append("category", data.courseCategory);
          }
          if (currentvalues.courseThumbnail !== mycourse.thumbnail) {
            formdata.append("thumbnailImage", data.courseThumbnail);
          }
          if (currentvalues.courseBenefits !== mycourse.what_you_will_learn) {
            formdata.append("what_you_will_learn", data.courseBenefits);
          }
          if (currentvalues.CourseRequirements !== mycourse.Instructions) {
            formdata.append("Instructions", data.CourseRequirements);
          }
          console.log("formdata in updated way is ", formdata,typeof formdata);
          const updates = Object.fromEntries(formdata.entries());
          console.log("formdata from updates is",updates);
          const res = await updatecourse({courseId:mycourse._id,updates}, token);
          console.log("data recieved is:", res);
          if(res.data.success){
            console.log('success')
              dispatch(setstep(2));
              dispatch(setmycourse(res.data.data));
          }
          console.log("the final ans is",mycourse);
        } else {
          toast.error("Please make some changes in the course");
          return;
        }
      } else {
        //new course is being created
        console.log("new data will be created");
        const formdata = new FormData();

        formdata.append("course_name", data.courseTitle);
        formdata.append("course_description", data.courseDescription);
        formdata.append("price", data.coursePrice);
        formdata.append("category", data.courseCategory);
        formdata.append("what_you_will_learn", data.courseBenefits);
        formdata.append("Instructions", data.CourseRequirements);
        formdata.append("thumbnail", data.courseThumbnail);
        const updates = Object.fromEntries(formdata.entries());
        console.log("formdata is", typeof formdata, data,updates);
        console.log(formdata);
        let res = await CreateCourse(formdata, token);
        console.log("the response from server is ", res);
        if (res.data.data) {
          dispatch(setstep(2));
          dispatch(setmycourse(res.data.data));
        }
        console.log("new course is", mycourse);
      }
    } catch (err) {
      toast.error("error while submitting");
    }
  };

  return (

    <form
      onSubmit={(e) => {
        e.preventDefault();
        console.log("getvalues is", getValues());
        onSubmit(getValues());
      }}
      className=" text-white  mx-auto flex flex-col w-10/12 justify-center flex flex-col mx-auto "
    >
      {/* course Title */}
      <div className=" px-2 my-[1rem]  flex flex-col">
        <label htmlFor="courseTitle">
          Course Title<sup className="text-pink-200">*</sup>
        </label>
        <input
          type="text"
          name="courseTitle"
          id="courseTitle"
          className="bg-richblack-800 h-[3rem] px-2 py-4  border-b-[1px]  border-white rounded-[10px] w-full"
          placeholder="Enter your Firstname"
          {...register("courseTitle", { required: true })}
        />
        {/* {errors.courseTitle && <p>Course Title is required.</p>} */}
      </div>

      {/* course Description */}
      <div className=" pr-4 pl-2 flex flex-col">
        <label htmlFor="courseDescription">Course Description</label>
        <textarea
          row={60}
          cols={30}
          name="courseDescription"
          id="courseDescription"
          className="bg-richblack-800 h-[3rem] px-2 py-2 border-b-[1px] border-white rounded-[10px] w-full"
          placeholder="Enter Description"
          {...register("courseDescription")}
        />
      </div>

      {/*Course Prices */}
      <div className="w-full py-2  mx-auto">
        <div className="flex flex-col  justify-center p-3  relative ">
          <label htmlFor="coursePrice">Course Price</label>
          <input
            type="coursePrice"
            name="coursePrice"
            id="coursePrice"
            placeholder="300"
            className="bg-richblack-800 h-[3rem] px-10 py-4  border-b-[1px] border-white rounded-[10px]"
            {...register("coursePrice", { required: true })}
          />
          {/* {errors.coursePrice && <p>Please enter the Course Price.</p>} */}
        </div>
        <div className="text-white absolute translate-y-[-3.2rem]  translate-x-[1rem]">
          <HiOutlineCurrencyRupee className="w-[30px] h-[30px]" />
        </div>
      </div>

      {/* Course Category */}
      <div className="flex flex-col  justify-center p-3 w-full mx-auto">
        <label htmlFor="courseCategory">Course Category</label>
        <div className="flex flex-row justify-between w-full">
          <select
            className="bg-richblack-800 h-[3rem] px-2 w-full  border-b-[1px] border-white rounded-[10px] "
            name="courseCategory" 
            {...register("courseCategory", { required: true })}
          >
            <option className="h-[3rem] rounded-0 text-richblack-200">
              Choose any category
            </option>
            {categoryoption.map((item, index) => (
              <option
                key={index}
                className="h-[3rem] rounded-0"
                value={item.category}
              >
                {item?.category}{item}
              </option>
            ))}
          </select>
        </div>
        {/* {errors.courseCategory && <p>Please choose the valid course Category.</p>} */}
      </div>

      {/* chipInput for tags */}

      {/* Course Level*/}
      <div className="flex flex-col  justify-center p-3 w-full mx-auto">
        <label htmlFor="courseLevel">Course Level</label>
        <div className="flex flex-row w-full justify-between">
          <select
            className="bg-richblack-800 h-[3rem] px-2 w-full  border-b-[1px] border-white rounded-[10px] "
            name="courseLevel"
            {...register("courseLevel", { required: true })}
          >
            {Level.map((item, index) => (
              <option
                key={index}
                
              >
                {item}
              </option>
            ))}
          </select>
        </div>
        {/* {errors.courseLevel && <p>Please choose the course level.</p>} */}
      </div>

      {/* Course Language */}
      <div className="flex flex-col w-full justify-center p-3  mx-auto">
        <label htmlFor="courseLanguage">Course Language</label>
        <div className="flex flex-row w-full justify-between">
          <select
            className="bg-richblack-800 h-[3rem] px-2 w-full  border-b-[1px] border-white rounded-[10px] "
            name="courseLanguage"
            {...register("courseLanguage", { required: true })}
          >
            {Language.map((item, index) => (
              <option
                key={index}
                
              >
                {item}
              </option>
            ))}
          </select>
        </div>
        {/* {errors.courseLanguage && <p>Please choose the valid course Language.</p>} */}
      </div>

      {/* course Thumbnail */}
      <Upload
        name={"courseThumbnail"}
        register={register}
        setValue={setValue}
        label="Course Thumbnail"
      />

      {/* Benefits of this course */}
      <div className="flex flex-col  justify-center p-3 w-full mx-auto">
        <label htmlFor="courseBenefits" className="py-1">
          Benefits of the course<sup className="text-pink-200">*</sup>
        </label>
        <textarea
          name="courseBenefits"
          id="courseBenefits"
          cols={30}
          rows={8}
          className="bg-richblack-800 w-full h-[2rem] px-2 py-4  border-b-[1px] border-white rounded-[10px]"
          placeholder=""
          {...register("courseBenefits", { required: true })}
        />
      </div>

      {/* course Requirements/Instructions */}
      <RequirementField
        register={register}
        name="CourseRequirements"
        setValue={setValue}
        getValues={getValues}
        label="Requirements / Instructions"
      />

      {/* button */}
      <div className="text-black font-bold w-full  flex justify-end">
        {editcourse && (
          <button
            className="bg-richblack-400 rounded-[10px] p-3 mx-2"
            // onClick={()=>dispatch(setstep(1))}
          >
            Continue without saving
          </button>
        )}

        <button
          className="bg-yellow-200 rounded-[10px] p-3 flex flex-row items-center"
          // onClick={(e)=>{e.preventDefault();console.log("function call");}}
        >
          {!editcourse ? "Next" : "Save Changes"}
          <span>
            <IoIosArrowForward />
          </span>
        </button>
      </div>
    </form>
    
  );
}
//   In your useEffect hook, when editcourse is true, the curr variable is logging all the properties of the mycourse object along with the values set by setValue. This behavior is expected because curr is capturing the entire state of the mycourse object, including any default or initial values.
