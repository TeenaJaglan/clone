import axios from  'axios';

//create ek generic method h jisse hum sabhi type i.e, get , post ,put delete req call kar sakte h 
export const axiosInstance = axios.create({});
export const apiconnector = (method,url,bodydata,headers,params)=>{
    return axiosInstance({
        method:`${method}`,
        url:`${url}` ,
        data:bodydata?bodydata:null,
        headers: headers?headers:null,
        params :params?params:null
    });
}