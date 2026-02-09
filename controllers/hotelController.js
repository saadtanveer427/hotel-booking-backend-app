const Hotel = require('../models/hotelModel');
const catchAsync = require('../utils/catchAsync');

exports.getAllHotels = catchAsync(async (req, res, next) => {
  const data = await Hotel.find({});

  res.status(200).json({
    status: 'success',
    data
  });
});

