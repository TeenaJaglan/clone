import { createSlice } from "@reduxjs/toolkit";

//initial state define karo
const initialState = {
    //hum localstorage se value le lenge aur koi bhi value hogi usse waha se update kar lenge otherwise khud se de denge as local storage m value agr tab band bhi kar de toh bhi sustain karti h 
    signUpData:null ,
    loading : false,
    token:localStorage.getItem("token")? JSON.parse(localStorage.getItem("token")):null ,
};

const authSlice = createSlice({
    name:"auth",
    initialState:initialState,
    reducers:{
        setsignUpData(state,value){
            state.signUpData = value.payload
        } ,
        setloading(state,value){
            state.loading = value.payload
        } ,
        setToken(state,value){
            state.token = value.payload
        }
    }
});

export const {setToken,setloading,setsignUpData}  = authSlice.actions;
export default authSlice.reducer; 