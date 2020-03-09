const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const labelSchema = new Schema({
    answer: {
        type: Number,
        required: true
      },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    image: {
      type: Schema.Types.ObjectId,
      ref: 'Image'
    }
  },
  {timestamps: true}
);

module.exports = mongoose.model('Label', labelSchema);
