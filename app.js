const express = require('express');
const morgan = require('morgan');
const globalErrorHandler = require('./controllers/error');
const AppError = require('./utils/appError');
const preorderRouter = require('./routes/preorder');
const statusRouter = require('./routes/status');

// Initialize express app
const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.get('/ping', (req, res, next) => {
  res.status(200).json({ data: 'pong' });
});
app.use('/preorders', preorderRouter);
app.use('/statuses', statusRouter);

// 404 Error
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Error handling middleware
app.use(globalErrorHandler);

module.exports = app;
