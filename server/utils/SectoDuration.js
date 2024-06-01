

 function convertSecondsToDuration(seconds) {
    
 let hours = Math.floor(seconds/3600);
 let minutes = Math.floor((seconds%3600)/60);
 let second = Math.floor((seconds%3600)%60);
if(hours>0){
    return `${hours} h ${minutes} m ${second} s`; 
}
else if(minutes>0){
    return `${minutes} m ${second} s`;  
}
else{
        return `${second} s`
}
}
module.exports = {
    convertSecondsToDuration,
  }