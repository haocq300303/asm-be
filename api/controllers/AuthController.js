const bcrypt = require('bcryptjs');
const { signupSchema, signinSchema } = require('../schemas/auth');
const notFound = require('../blueprints/notFound');
const serverError = require('../blueprints/serverError');
const badRequest = require('../blueprints/badRequest');
const { generateToken } = require('../utils/generateToken');
const { firebase } = require('../../config/firebase');
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  async register(req, res) {
    try {
      // Validate input data
      const { error } = signupSchema.validate(req.body);
      if (error) {
        return res.json(badRequest(error.details[0].message));
      }

      const { email, password, name } = req.body;
      const nameUser = await Customers.findOne({ name });
      if (nameUser) {
        return res.json(badRequest('Tên người dùng đã tồn tại, vui lòng nhập tên khác'));
      }

      const emailUser = await Customers.findOne({ email });
      if (emailUser) {
        return res.json(badRequest('Email đã tồn tại, vui lòng nhập email khác'));
      }
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await Customers.create({
        name: name,
        email: email,
        password: hashedPassword,
      }).fetch();

      return res.ok({
        error: false,
        message: 'Đăng ký thành công',
        datas: newUser,
      });
    } catch (error) {
      res.status(500).json(serverError(error.message));
    }
  },
  async login(req, res) {
    try {
      // Validate input data
      const { error } = signinSchema.validate(req.body);
      if (error) {
        return res.json(badRequest(error.details[0].message));
      }
      const { email, password } = req.body;

      // Check if email exists
      const user = await Customers.findOne({ email });
      if (!user) {
        return res.json(notFound('Email does not exist'));
      }

      // Check if password is correct
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.json(badRequest('Invalid password'));
      }

      // create token
      const token = await generateToken({ id: user.id, name: user.name, email: user.email, role: user.role });

      return res.ok({
        error: false,
        message: 'Đăng nhập thành công',
        accessToken: token,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json(serverError(error.message));
    }
  },
  async loginWithGoogle(req, res) {
    try {
      const idToken = req.body.idToken;
      const decodedToken = await firebase.auth().verifyIdToken(idToken);
      let checkUser = await Customers.findOne({ email: decodedToken.email });
      if (checkUser) {
        const token = await generateToken({
          id: checkCustomers.id,
          name: checkCustomers.name,
          email: checkCustomers.email,
        });
        return res.ok({
          error: false,
          message: 'Đăng nhập thành công',
          accessToken: token,
        });
      } else {
        const newUser = await Customers.create({
          email: decodedToken.email,
          name: decodedToken.name,
        }).fetch();
        const token = await generateToken({ id: newUser.id, name: newUser.name, email: newUser.email });
        return res.ok({
          error: false,
          message: 'Đăng nhập thành công',
          accessToken: token,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json(serverError(error.message));
    }
  },
};
