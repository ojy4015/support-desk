// make a protected route
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const User = require('../models/userModel');

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // get token from header
      token = req.headers.authorization.split(' ')[1];

      // console.log('token in protect in authMiddleware----> ', token);

      //Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // console.log('decoded : ', decoded);

      // Get user from token
      req.user = await User.findById(decoded.id).select('-password');
      // console.log('req.user in protect : ', req.user);
      // req.user in protect :  {
      //   [0]   _id: new ObjectId('66b96c04dafaecac4b2d55e7'),
      //   [0]   name: 'Brad',
      //   [0]   email: 'brad@gmail.com',
      //   [0]   isAdmin: false,
      //   [0]   createdAt: 2024-08-12T01:57:24.650Z,
      //   [0]   updatedAt: 2024-08-12T01:57:24.650Z,
      //   [0]   __v: 0
      //   [0] }
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error('Not authorized!!!!');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized????');
  }
});

module.exports = { protect };
