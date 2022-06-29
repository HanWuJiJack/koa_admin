const nodemailer = require('nodemailer')

const sendEmail = async (email,code) => {
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD
    }
  })
  // console.log('=>mailAll',2)
  // send mail with defined transport object
  const message = {
    from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`, // sender address
    to: email, // list of receivers
    subject:'LM验证码', // Subject line
    text: `验证码：${code}` // plain text body
  }
  return transporter.sendMail(message)
}

module.exports = sendEmail