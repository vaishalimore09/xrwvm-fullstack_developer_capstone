// Use 'esversion: 6'; to avoid linting errors related to ES6 features
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reviews = new Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  dealership: {
    type: Number,
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
  purchase: {
    type: Boolean,
    required: true,
  },
  purchase_date: {
    type: String,
    required: true,
  },
  car_make: {
    type: String,
    required: true,
  },
  car_model: {
    type: String,
    required: true,
  },
  car_year: {
    type: Number,
    required: true,
  },
});

// Exporting the model
module.exports = mongoose.model('Reviews', reviews);
