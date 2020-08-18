const mongoose = require('mongoose'); // require mongoose

const { Schema } = mongoose; // use Schema

const requiredNumber = {
  type: Number,
  required: true,
};

// define log entry schema
const logEntrySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    comments: String,
    image: String,
    rating: {
      type: Number,
      min: 0,
      max: 10,
      default: 0,
    },
    latitude: {
      ...requiredNumber,
      min: -90,
      max: 90,
    },
    longitude: {
      ...requiredNumber,
      min: -180,
      max: 180,
    },
    visitDate: {
      type: Date,
      required: true,
    },
  },
  {
    // timestamps automatically assigns createdAt and updatedAt fields
    timestamps: true,
  },
);

// compile the model
const LogEntry = mongoose.model('LogEntry', logEntrySchema);

// export model
module.exports = LogEntry;
