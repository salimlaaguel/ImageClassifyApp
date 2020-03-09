const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const imageSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  question: {
    type: String,
    required: true
  },
  done: {
    type: Boolean,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  poster: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  imageLabels: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Label'
    }
  ]
});

module.exports = mongoose.model('Image', imageSchema);
