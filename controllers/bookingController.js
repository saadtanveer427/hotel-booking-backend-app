const Booking = require('../models/bookingModel');
const catchAsync = require('../utils/catchAsync');


exports.createBooking = catchAsync(async (req, res) => {
  const doc = await Booking.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      data: doc
    }
  });
});
