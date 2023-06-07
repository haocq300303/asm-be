/* eslint-disable linebreak-style */
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const generateToken = async (data) => {
  const token = jwt.sign(data, process.env.SECRETKEY, {
    expiresIn: '1h',
  });
  return token;
};

module.exports = { generateToken };
