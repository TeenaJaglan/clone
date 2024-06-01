import React from 'react'

export default function Averagerating(data) {
 if (data.length==0) return 0;
 let totalsum = data.reduce((sum,curr)=>{
    sum = curr.rating;
    return sum;
},0);//iinitial value of sum is set to be 0
let multiplier = Math.pow(10,1);
let avg = Math.round((totalsum/data.length)*multiplier)/multiplier;
return avg;
}
