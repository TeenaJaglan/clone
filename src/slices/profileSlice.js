import { createSlice } from "@reduxjs/toolkit";

//initial state define karo
const initialState = {
   user:localStorage.getItem("user")? JSON.parse(localStorage.getItem("user")):{} ,
   profile:localStorage.getItem("profile")? JSON.parse(localStorage.getItem("profile")):{},
   loading:false
};

const profileSlice = createSlice({
    name:"profile",
    initialState:initialState,
    reducers:{
        setUser(state,value){
            state.user = value.payload;
            localStorage.setItem("user",JSON.stringify(value.payload));
        },
        setProfile(state,value){
            state.profile = value.payload
            localStorage.setItem("profile", JSON.stringify(value.payload));
        },
        setloading(state,value){
            state.loading = value.payload
            localStorage.setItem("loading", JSON.stringify(value.payload));
        } ,
    }
});

export const {setUser,setloading,setProfile}  = profileSlice.actions;
export default profileSlice.reducer; 