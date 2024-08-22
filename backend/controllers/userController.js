// Simple middleware for handling exceptions inside of async express routes and passing them to your express error handlers.
// because mongoose returns a promise
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/userModel');

// @desc   Register a new user
// @route  http://localhost:5000/api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  // get data from body
  // console.log(req.body);
  // console.log('in registerUser');

  const { name, email, password } = req.body;
  console.log('name, email, password', name, email, password);

  // Validation
  // if (!name || !email || !password) {
  //   return res.status(400).json({ message: 'Please include all fields' });
  // }

  // gives a html file
  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please include all fields');
  }

  // Find if user already exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc   Login a user
// @route  http://localhost:5000/api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  // get data from body
  console.log(req.body);
  console.log('in loginUser');

  const { email, password } = req.body;
  console.log('email, password : ', email, password);

  // Find user
  const user = await User.findOne({ email });

  // Check user and passwords match
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401); // 이 라인 없으면 .addCase(login.fulfilled, (state, action) => { 로 이동
    throw new Error('Invalid credentials');
  }
});

// @desc   get current logged in user
// @route  http://localhost:5000/api/users/me
// @access Private
const getMe = asyncHandler(async (req, res) => {
  const user = {
    id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  };
  res.status(200).json(user);
});

// generate token, token안에 포함된 내용: id, 생성일시, 파기일시
// {
//   "id": "66b96c04dafaecac4b2d55e7",
//   "iat": 1723427844,
//   "exp": 1726019844
// }
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
