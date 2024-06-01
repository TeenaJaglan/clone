import { createSlice } from "@reduxjs/toolkit";
const InitialState = {
    courseSectionData:[],
    courseEntireData:[],
    completedLectures:[],
    totalNoOfLectures:0,
}

const viewcourseSlice = createSlice({
    name:"viewcourse",
    initialState:InitialState,
    reducers:{
        setcourseSectionData : (state,action)=>{
            state.courseSectionData = action.payload;
        },
        setcourseEntireData : (state,action)=>{
            state.courseEntireData = action.payload;
        },
        setcompletedLectures : (state,action)=>{
            state.completedLectures = action.payload;
        },
        settotalNoOfLectures : (state,action)=>{
            state.totalNoOfLectures = action.payload;
        },
        updatecompletedLectures :(state,action)=>{
            state.completedLectures = [...state.completedLectures,action.payload];
        }
    }
});

export const {setcompletedLectures,setcourseEntireData,setcourseSectionData,settotalNoOfLectures,updatecompletedLectures} = viewcourseSlice.actions;

export default viewcourseSlice.reducer; 