const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
require('dotenv').config();

const auth_secret = process.env.JWT_SECRET;
const auth_password = process.env.AUTH_PASSWORD;
const auth_code = process.env.AUTH_CODE;

const signToken = () => jwt.sign({ code: auth_code }, auth_secret);

exports.login = catchAsync(async (req, res, next) => {
  const { password } = req.params;

  console.log(password, auth_password);

  // 1) Check if password exist and correct
  if (!password || password !== auth_password)
    return next(new AppError('Please provide a valid password!', 400));

  // 3) If everything ok, send token to client
  const token = signToken();

  res.status(200).json({
    status: 'success',
    token,
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) return next(new AppError('You are not logged in!', 401));

  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, auth_secret);

  // 3) Check if token is valid
  if (decoded.code !== auth_code)
    return next(new AppError('Invalid token.', 401));

  // GRANT ACCESS TO PROTECTED ROUTE
  next();
});
