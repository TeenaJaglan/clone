import { toast } from "react-hot-toast";
import { setloading,setToken} from "../../slices/authSlice";
import { authEndpoints ,profileendpoints} from "../api";
import {apiconnector } from "../apiconnector" 
import {setUser,setProfile} from "../../slices/profileSlice"

export function getPasswordResetToken(email,setemailsent){
    return async(dispatch)=>{
    dispatch(setloading(true));
try{
    const resetpasswordToken = authEndpoints.RESETPASSWORDTOKEN_API;
    console.log(resetpasswordToken);
     const response = await apiconnector("PUT",resetpasswordToken,{email});
     const res = response.data;
     console.log(res);
     if(!res.success){
        throw new Error(res.data.message);
     }
     toast.success("Email sent successfully");
     setemailsent(true);
}
catch(err){
    console.log("Error in getting password reset token , the error is:"+err);
    dispatch(setloading(false));
    toast.error("Failed to send email for resetting password");
}
dispatch(setloading(false));
}
}

export function sendOtp (email,navigate){
    return async function(dispatch){
        dispatch(setloading(true));
        try{
            //calling api here
           const otp_api = authEndpoints.OTP_API; 
           const response = await apiconnector("POST",otp_api,{email,});
           console.log(response);
           if(!response.data.success){
            toast.error(" Failed to send Otp.");
           }
           toast.success("Otp sent successfully. Please check your mail.");
           navigate("/verifyEmail")
        }catch(err){
console.log("failed to sent otp due to some error: "+ err);
toast.error("Something went wrong ");
        }
        dispatch(setloading(false));
    }
}
export function signUp(signUpData,otps,navigate){
    return async (dispatch)=>{
        dispatch(setloading(true));
        try{
            const signup_api = authEndpoints.SIGNUP_API;
            console.log("signupdata coming from function parameter is :");
            
           const signupData =signUpData;
           console.log(signupData.signUpData);
            const {firstname,
                lastname,
                emailaddress,
                password,
                confirmpassword,accountType} = signupData.signUpData;
                console.log("the data to be send is "+ firstname,
                    lastname,
                    emailaddress,
                    password,
                    confirmpassword,
                    otps,accountType);
            const response = await apiconnector("POST",signup_api,{ 
                
                firstname,
                lastname,
                email:emailaddress,
                password,
                confirmpassword,
                accountType,
                otp:otps,});

                console.log(JSON.stringify(response));
                console.log("this is response");
                console.log(response.data.success);
                console.log(response.data.message)
                if(!response.data.success){ toast.error(response.data.message);return;}
                else {
                    toast.success('signup successfull. Please login to continue.');
                }
                navigate("/login")
        }catch(err){
            console.log("error during signUp:" + err);
            toast.error("Signup failed!");
        }
        dispatch(setloading(false));
    };
}
export function login(formdata,navigate){

return async (dispatch)=>{
    dispatch(setloading(true));
    try{
        const login_api = authEndpoints.LOGIN_API;
        console.log(formdata);
        const response = await apiconnector("POST",login_api,formdata);
        console.log(response.data);
        if(!response.data.success){
            toast.error(response.data.message);
            return ;
        }
        toast.success(response.data.message);
        dispatch(setToken(response.data.token));
     
         const userImage = response?.data?.user?.image? response.data.user.image:`https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstname} ${response.data.user.lastname}`;
         console.log(userImage);     
       dispatch(setUser({...response.data.user,image:userImage}));
         dispatch(setProfile(response.data.user.additionalDetails));

//store in local memory 
localStorage.setItem("Token",JSON.stringify(response.data.token));
localStorage.setItem("User",JSON.stringify(response.data.user));
localStorage.setItem("profile",JSON.stringify(response.data.user.additionalDetails));
        navigate("/dashboard/my-profile");
    }catch(err){
        console.log("error during signIn:" + err);
        toast.error("Login failed!");
    }
    dispatch(setloading(false));
}
}

export function logout(navigate){
    return async (dispatch) => {
        try{
            const logout_api = profileendpoints.LOGOUT_API;
            const response = await apiconnector("DELETE",logout_api);
            console.log("deleting profile response is :");
            console.log(response);
            dispatch(setToken(null));
            toast.success("Logout successfully");
            navigate("/");
        }catch(err){
            console.log("error occurred  during logging out" + err);
            toast.error("failed to logout");
        }
    }
}