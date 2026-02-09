const mongoose = require('mongoose');
const validator = require('validator');

const bookingSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'Please tell us your name!']
  },

  lastName: {
    type: String,
    required: [true, 'Please tell us your name!']
  },

  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },

  phoneNumber: {
    type: String,
    required: [true, 'Please tell us your phone number!']
  },

  totalRooms: {
    type: Number,
    required: [true, 'Room numbers must be selected'],
    enum: {
      values: [1, 2],
      message: 'Room type is either: 1, 2'
    },
  },

  roomType: {
    type: String,
    required: [true, 'Room type must be selected'],
    enum: {
      values: ['standard', 'executive'],
      message: 'Room type is either: standard, executive'
    }
  },

  checkIn: {
    type: Date,
    required: [true, 'check-In time is required'],
  },

  checkOut: {
    type: Date,
    required: [true, 'check-out time is required'],
  },

  message: {
    type: String,
  },

});


const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
