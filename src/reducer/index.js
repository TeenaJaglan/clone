import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import profileReducer from "../slices/profileSlice";
import cartReducer from "../slices/cartSlice";
import courseReducer from "../slices/courseSlice";
import viewcourseReducer from "../slices/ViewcourseSlice";
//sare reducers yaha mwention kar do
const rootReducer = combineReducers({
    auth:authReducer,
    profile:profileReducer,
    cart:cartReducer,
    course:courseReducer,
    viewcourse : viewcourseReducer,
})

export default rootReducer;