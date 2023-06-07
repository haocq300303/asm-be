const nodemailer = require('nodemailer');
const transporterEmail = (mailOptions) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'chu302003@gmail.com',
      pass: 'cbmmpcmnkccdbdak',
    },
  });

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Failed to send verification email');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Gửi email xác minh');
    }
  });
};

module.exports = { transporterEmail };
