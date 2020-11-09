const nodemailer = require("nodemailer");
// read secrets from .env
require('dotenv').config();

/* Use this part if you have account*/
// Please set .env file for user and pass
// const transporter = nodemailer.createTransport({
//   host: 'smtp.ethereal.email',
//   port: 587,
//   auth: {
//       user: process.env.MAIL_USER,
//       pass: process.env.MAIL_PASS
//   }
// });
/* Use this part if you have account*/

/* Only needed if you don't have a real mail account for testing*/
// Generate test SMTP service account from ethereal.email
let transporter;
nodemailer.createTestAccount().then(function(testAccount){
  // create reusable transporter object using the default SMTP transport
  transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });
});
/* Only needed if you don't have a real mail account for testing*/

class MailService {
  static async sendMail(content, html){
      // send mail with defined transport object
      const info = await transporter.sendMail({
      from: '"Do Not Reply Northpole" <do_not_reply@northpole.com>',
      to: "santa@northpole.com",
      subject: "Wishes",
      text: content, // plain text body,
      html: html // html body
    });
    console.log("Message sent: %s", info.messageId);
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  }
}

module.exports = MailService;