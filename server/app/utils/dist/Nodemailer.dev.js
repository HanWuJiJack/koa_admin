"use strict";

var nodemailer = require('nodemailer');

var sendEmail = function sendEmail(email, code) {
  var transporter, message;
  return regeneratorRuntime.async(function sendEmail$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            auth: {
              user: process.env.SMTP_EMAIL,
              pass: process.env.SMTP_PASSWORD
            }
          });
          message = {
            from: "".concat(process.env.FROM_NAME, " <").concat(process.env.FROM_EMAIL, ">"),
            // sender address
            to: email,
            // list of receivers
            subject: 'Hsueh验证码',
            // Subject line
            text: "\u9A8C\u8BC1\u7801\uFF1A".concat(code) // plain text body

          };
          return _context.abrupt("return", transporter.sendMail(message));

        case 3:
        case "end":
          return _context.stop();
      }
    }
  });
};

module.exports = sendEmail;