const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    price:{
      type:Number,
    },
    totalGuests: {
      type: Number,
    },
    totalBedrooms: {
      type: Number,
    },
    totalBathrooms: {
      type: Number,
    },
  });


const Hotel = mongoose.model('Hotel', hotelSchema);

module.exports = Hotel;
