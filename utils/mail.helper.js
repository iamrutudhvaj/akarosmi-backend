const nodemailer = require("nodemailer");
const sendEmail = async (email, subject, text) => {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.HOST,
        service: process.env.SERVICE,
        port: 587,
        secure: true,
        auth: {
          user: process.env.USER_EMAIL,
          pass: process.env.USER_PASS,
        },
      });
  
      await transporter.sendMail({
        from: process.env.USER_EMAIL,
        to: email,
        subject: subject,
        text: text,
      });
    } catch (error) {
      console.log("email not sent" , error);
    }
  };
  
  module.exports = sendEmail;