// Use 'esversion: 6'; to avoid linting errors related to ES6 features
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cars = new Schema({
  dealer_id: {
    type: Number,
    required: true,
  },
  make: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  bodyType: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  mileage: {
    type: Number,
    required: true,
  },
});

// Exporting the model
module.exports = mongoose.model('Cars', cars);
