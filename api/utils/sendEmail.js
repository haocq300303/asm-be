/* eslint-disable linebreak-style */
const ejs = require('ejs');
const { transporterEmail } = require('./transporterEmail');

const sendEmail = async (otp, email) => {
  const template = await EmailTemplate.findOne({ name: 'Send-otp' });

  // Truyền dữ liệu vào template
  let html = ejs.render(template.html, { otp: otp, email: email });

  const mailOptions = {
    from: 'chu302003@gmail.com',
    to: email,
    subject: template.subject,
    html: html,
  };
  transporterEmail(mailOptions);
};

module.exports = { sendEmail };
