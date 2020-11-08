const Preorder = require('../models/preorder');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Telegram = require('../utils/telegram');

exports.getAll = catchAsync(async (req, res, next) => {
  const preorders = await Preorder.find();

  //Send response
  res.status(200).json({
    status: 'success',
    results: preorders.length,
    data: preorders,
  });
});

exports.get = catchAsync(async (req, res, next) => {
  const preorder = await Preorder.findById(req.params.id);

  //Send response
  res.status(200).json({
    status: 'success',
    data: preorder,
  });
});

exports.create = catchAsync(async (req, res, next) => {
  const preorder = await Preorder.create(req.body);

  //Send response
  res.status(201).json({
    status: 'success',
    data: preorder,
  });

  // Send preorder to Telegram channel
  Telegram.sendOrder(`
Янги буюртма:

Исм: ${preorder.fullName}
Телефон: ${preorder.phoneNumber}
Эмаил: ${preorder.email ? preorder.email : '---'}
Китоб тури: ${preorder.bookType}
Хабар: ${preorder.comment ? preorder.comment : '---'}
Нархи: ${preorder.totalPrice}
  `);
});

exports.update = catchAsync(async (req, res, next) => {
  const preorder = await Preorder.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!preorder) {
    return next(new AppError('No document found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: preorder,
  });
});

exports.delete = catchAsync(async (req, res, next) => {
  const preorder = await Preorder.findByIdAndDelete(req.params.id);

  if (!preorder) {
    return next(new AppError('No document found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
