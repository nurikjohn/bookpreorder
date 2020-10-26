const mongoose = require('mongoose');

const PreorderSchema = new mongoose.Schema({
  fullName: String,
  phoneNumber: {
    type: String,
  },
  quantity: {
    type: Number,
    min: 1,
  },
  comment: String,
  isPreorder: Boolean,
  status: {
    type: mongoose.Schema.ObjectId,
    ref: 'Status',
    required: [true, 'Preorder must have status.'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

PreorderSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'status',
  });
  next();
});

const Preorder = mongoose.model('Preorder', PreorderSchema);

module.exports = Preorder;
