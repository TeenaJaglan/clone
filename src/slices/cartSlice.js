import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

//initial state define karo
const initialState = {
    //hum localstorage se value le lenge aur koi bhi value hogi usse waha se update kar lenge otherwise khud se de denge as local storage m value agr tab band bhi kar de toh bhi sustain karti h 
    cartlist:localStorage.getItem("cartlist")? JSON.parse(localStorage.getItem("cartlist")):[] ,
    totalprice:localStorage.getItem("totalprice")? JSON.parse(localStorage.getItem("totalprice")):0 ,
    totalItems:localStorage.getItem("totalItems")? JSON.parse(localStorage.getItem("totalItems")):0 ,
};

const cartSlice = createSlice({
    name:"cart",
    initialState:initialState,
    reducers:{
        //output m cartslice object aa raha h therefore convert it to array
        addToCart (state,action){
            const course = action.payload;
            console.log("inside slice the data is",action.payload,typeof state.cartlist);
            console.log(state.cartlist);
              
            let index = state.cartlist.findIndex((item)=>item._id===course._id)||-1;
            console.log(index);
            if(index>=0){
                toast.error("course already in the cart");
                return ;
            }
            //else add
           
            state.cartlist.push(course);
            state.totalprice = state.totalprice + course.price ;
            state.totalItems= state.totalItems + 1 ;
            
            
            //update it to localstorage 
            localStorage.setItem("cartlist",JSON.stringify(state.cartlist));
            localStorage.setItem("totalItems",JSON.stringify(state.totalItems));
            localStorage.setItem("totalprice",JSON.stringify(state.totalprice));

            //print
            console.log('updated cartlist is ',state.cartlist,state.totalItems,state.totalprice,typeof state.cartlist);
            console.log("the values are",localStorage.getItem("cartlist"),typeof localStorage.getItem("cartlist"),state.cartlist,typeof state.cartlist);
           
            //toast 

            toast.success( "Course added to Cart Successfully!");
            return;
    } ,
        removeFromCart(state,action){
            let course = action.payload;
            console.log("the cart i s" ,state.cartlist);
            let index=-1;
            index = state.cartlist.findIndex((item)=>item._id===course._id);
            if(index<0){
                toast.error("no such course found");return;
            }
            state.cartlist.splice(index,1);
            state.totalprice = state.totalprice -course.price ;
            state.totalItems= state.totalItems -1  ;
            //update localstorage
            localStorage.setItem("cartlist", JSON.stringify(state.cartlist));
            localStorage.setItem("totalItems",JSON.stringify(state.totalItems));
            localStorage.setItem("totalprice",JSON.stringify(state.totalprice));
            //toast 
            toast.success( "Course removed from  Cart Successfully!");
            return;
        }
      ,
      resetCart(state,action){
        state.cartlist =[];
        state.totalItems = 0;
        state.totalprice=0;
        localStorage.removeItem('cartlist');
        localStorage.removeItem("totalItems");
        localStorage.removeItem("toalprice");
        toast.success("cart reset successfully");
        return ;
      }  
}
}
);

export const {addToCart,removeFromCart,resetCart}  = cartSlice.actions;
export default cartSlice.reducer; 

// // The action is an object containing a type and a payload property - you can think of an action as an event that describes something that happened in the application.,Like the state data, actions should contain the smallest amount of information needed to describe what happened.. 
// // In React, the state is an object containing all states declared within the application. The reducer function manipulates the state directly and returns a copy of the result, and the dispatch function triggers the reducer function when various events occur
