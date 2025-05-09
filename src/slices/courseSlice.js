import {createSlice} from "@reduxjs/toolkit";
const InitialState ={
    step:1,
    editcourse:false,
    mycourse:localStorage.getItem("mycourse")? JSON.parse(localStorage.getItem("mycourse")):{},
    paymentLoading:false
}

const courseSlice = createSlice({
    name:"course",
    initialState:InitialState,
    reducers:{
        setstep(state,action){
            state.step = action.payload
        },
        seteditcourse(state,action){
            state.editcourse = action.payload
        },
        setmycourse(state,action){
            state.mycourse = action.payload;
            localStorage.setItem("mycourse",JSON.stringify(state.mycourse));
        },
        setpaymentLoading(state,action){
            state.paymentLoading = action.payload
        },
        resetcourseState(state){
            state.step = 1;
            state.editcourse= false;
            state.mycourse = null;
            
        }
    }
})

export const {setstep,seteditcourse,setmycourse,resetcourseState} = courseSlice.actions ;
export default courseSlice.reducer;