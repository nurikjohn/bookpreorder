const mongoose = require('mongoose');

const StatusSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Status name is required'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Virtual populate
StatusSchema.virtual('preorders', {
  ref: 'Preorder',
  foreignField: 'status',
  localField: '_id',
});

const Status = mongoose.model('Status', StatusSchema);

module.exports = Status;
