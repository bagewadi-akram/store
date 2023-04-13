const nodeMailer = require("nodemailer");

const sendEmail = async (options) => {
  // =============================================================
  //Using Gmail Service
  // =============================================================

  const transporter = nodeMailer.createTransport({
    host: process.env.GMAIL_SERVER_SMTP_HOST,
    port: process.env.GMAIL_SERVER_SMTP_PORT,
    service: process.env.GMAIL_SERVER_SMTP_SERVICE,
    auth: {
      user: process.env.GMAIL_SERVER_SMTP_MAIL,
      pass: process.env.GMAIL_SERVER_SMTP_PASSWORD,
    },

    // =============================================================
    //Using Private Service
    // =============================================================

    // const transporter = nodeMailer.createTransport({
    // host: process.env.PRIVATE_SERVER_SMTP_HOST,
    // port: process.env.PRIVATE_SERVER_SMTP_PORT,
    // service: process.env.PRIVATE_SERVER_SMTP_SERVICE,
    // secure: true,
    // auth: {
    //   user: process.env.PRIVATE_SERVER_SMTP_MAIL,
    //   pass: process.env.PRIVATE_SERVER_SMTP_PASSWORD,
    // },
  });

  const mailOptions = { 
    from: process.env.SMTP_MAIL,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  return await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
