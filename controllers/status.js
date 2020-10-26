const Status = require('../models/status');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAll = catchAsync(async (req, res, next) => {
  const statuses = await Status.find();

  //Send response
  res.status(200).json({
    status: 'success',
    results: statuses.length,
    data: statuses,
  });
});

exports.get = catchAsync(async (req, res, next) => {
  const status = await Status.findById(req.params.id);

  //Send response
  res.status(200).json({
    status: 'success',
    data: status,
  });
});

exports.create = catchAsync(async (req, res, next) => {
  const status = await Status.create(req.body);

  //Send response
  res.status(201).json({
    status: 'success',
    data: status,
  });
});

exports.update = catchAsync(async (req, res, next) => {
  const status = await Status.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!status) {
    return next(new AppError('No document found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: status,
  });
});

exports.delete = catchAsync(async (req, res, next) => {
  const status = await Status.findByIdAndDelete(req.params.id);

  if (!status) {
    return next(new AppError('No document found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
