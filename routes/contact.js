var express = require('express');
var nodemailer = require('nodemailer');
var router = express.Router();

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // secure:true for port 465, secure:false for port 587
  auth: {
    user: process.env.USER_EMAIL || null,
    pass: process.env.USER_PASSWD || null
  }
});

/* GET users listing. */
router.post('/', function (req, res, next) {
  // setup email data with unicode symbols
  let mailOptions = {
    from: 'info@dogtrainingclub.cl', // sender address
    to: 'info@dogtrainingclub.cl', // list of receivers
    subject: `Mensaje de ${req.body.name} <${req.body.email}>`, // Subject line
    text: req.body.message // plain text body
  };
  let replyOptions = {
    from: 'info@dogtrainingclub.cl', // sender address
    to: req.body.email, // list of receivers
    subject: 'Dog Traning Club - Contacto', // Subject line
    text: 'Hemos recibido tu mensaje, responderemos a tu duda en la brevedad posible. Gracias.'// plain text body
  };
  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.message);
    }
    return res.status(200).send('Message sent');
  });
  // send reply email
  transporter.sendMail(replyOptions, (error_reply, info_reply) => {
    if (error_reply) {
      console.log(error_reply);
    }
    console.log(info_reply);

  });
});

module.exports = router;
