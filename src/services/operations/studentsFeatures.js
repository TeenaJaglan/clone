import { payment } from "../api"
import toast from "react-hot-toast";
import { apiconnector } from "../apiconnector";
import { resetCart,setpaymentLoading } from "../../slices/cartSlice";
import rzp_logo  from "../../assets/Logo/rzp_logo.png";
import { RAZORPAY } from "../../utils/constants";

function loadScript(src){
    return new Promise ((resolve)=>{
        const script = document.createElement("script");
        script.src = src;
        script.onload = ()=>{resolve(true);}
        script.overload = ()=>{resolve(false);}
        document.body.appendChild(script);
    })
}

export async function buycourse(courseslist,token,user,navigate,dispatch){
    //const toastId = toast.loading("Loading...");
    try{
       const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

       if(!res) {
        toast.error("RazorPay SDK failed to load");
        return;
    }
    const orderResponse = await apiconnector("POST",payment.PAYMENT_API,{courses:[courseslist]},{Authorization:`Bearer ${token}`,});
console.log("PRINTING ORDERRESPONSE",orderResponse);
    if(!orderResponse.data.success){
        throw new Error(orderResponse.data.message);
    }
    
    const options = {
        key:RAZORPAY.RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
        amount: `${orderResponse.data.message.amount}`, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: `${orderResponse.data.message.currency}`,
        name: "StudyNotion", //your business name
        order_id:`${orderResponse.data.message.id}`,
        description: "Thank You for Purchasing the Course",
        image: `${rzp_logo}`,
      
         prefill : { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
             name :  `${user.firstname} ${user.lastname}` , //your customer's name
             email :  `${user.email}`,
            contact:`${user?.contactNo}`
        },
       handler: function(response){

        //verify payment
        verifyPayment({...response, 
            courses:[courseslist],
            razorpay_order_id :orderResponse.data.message.id,
            
        }, token, navigate, dispatch)

        //send successfull wala email
        sendPaymentSuccessfullEmail(response,orderResponse.data.message.amount,token );
        
       }
    };
    console.log("the options is",options);
    //miss hogya tha 
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
    paymentObject.on("payment.failed", function(response) {
        toast.error("oops, payment failed");
        console.log(response.error);
    })
    
    }
    catch(err){
     //   toast.dismiss("Loading");
        console.log("failed to buy course",err);
    }
}

export async function sendPaymentSuccessfullEmail(response,amount,token){
    console.log("payment successfull email starts");
    try{
        await apiconnector("POST",payment.SEND_PAYMENT_SUCCESSFULL_EMAIL_API,{
            orderId:response.razorpay_order_id,
            paymentId:response.razorpay_payment_id,
            amount,
        },{
            Authorization:`Bearer ${token}`
        })
    }
    catch(error){
        console.log("PAYMENT SUCCESS EMAIL ERROR....", error);
    }
}

//verify payment 
async function verifyPayment(bodydata,token,navigate,dispatch){
    console.log("verify signature");
    const toastId = toast.loading("Verifying Payment....");
   // dispatch(setpaymentLoading(true));
    try{
        const response  = await apiconnector("POST",payment.VERIFY_SIGNATURE_API , bodydata, { Authorization:`Bearer ${token}`,})
console.log("response ",response);
        if(!response.data.success) {
            throw new Error(response.data.message);
        }
        toast.success("payment Successful, ypou are addded to the course");
        navigate("/dashboard/enrolled-courses");
        dispatch(resetCart());
    }catch(err){
        console.log("PAYMENT VERIFY ERROR....", err);
        toast.error("Could not verify Payment"); 
    }
    toast.dismiss(toastId);
  //  dispatch(setpaymentLoading(false));

}