//cloudinary m images or videos store karni hai
const cloudinary = require("cloudinary").v2;

exports.uploader  = async function (file,folder,quality,video=false){
    try{
        let resource="auto";
       // video?resource="video":resource="auto";
        const options ={
        folder:folder , quality:quality , resource_type:resource ,
        eager: [
          
            { fetch_format: "mp4", video_codec: "h265", format: "" }], 
             //y default image hota h 
        eager_async: true,

        }
      //  if(file.size<=61440){return await cloudinary.uploader.upload(file.tempFilePath,options);}
      return await cloudinary.uploader.upload(file.tempFilePath,options);
      //upload_large for uploading large files 
      
    }catch(err){
       
        console.log('the error is :',err);
        throw err;
    }
}


// indexe.js m =>
//  app.use(fileupload({
//     useTempFiles : true,
//     tempFileDir : '/tmp/'
// }));