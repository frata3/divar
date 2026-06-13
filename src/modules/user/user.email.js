const nodemailer = require("nodemailer");
require('dotenv').config();


const MAIL_HOST = process.env.MAIL_HOST;
const MAIL_PORT = process.env.MAIL_PORT;
const MAIL_USER = process.env.MAIL_USER;
const MAIL_PASSWORD = process.env.MAIL_PASSWORD;

const transporter = nodemailer.createTransport({
    host: MAIL_HOST,
    port: MAIL_PORT,
    tls: true,
    auth: {
      user: MAIL_USER,
      pass: MAIL_PASSWORD,
    }
  });

const sendEmail = (to, subject, text) => {
  const mailOptions = {
    from: 'email@fratagone.ir',
    to: to,
    subject: subject,
    text: text
  };

  return transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
