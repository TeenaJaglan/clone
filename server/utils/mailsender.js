const nodemailer = require('nodemailer');
const mailsender = async function(email,title,body){
try{
    const transporter =  nodemailer.createTransport({
        host:process.env.MAIL_HOST,
        auth:{
            user:process.env.MAIL_USER,
            pass:process.env.MAIL_PASS
        }
    });
    let info =  await transporter.sendMail({
        from:"StudyNotion - Teena",
        to:`${email}`,
        subject: `${title}`,
        html:`${body}`
    });
    return info;
}catch(err){
    console.log("error occurred during sending mail:",err);
    throw err;
}
};
module.exports = mailsender;