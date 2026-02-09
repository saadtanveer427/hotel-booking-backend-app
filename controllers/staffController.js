const Staff = require('../models/staffModel');
const catchAsync = require('./../utils/catchAsync');



exports.getAllStaff = catchAsync(async (req, res, next) => {
  const data = await Staff.find();
  res.status(200).json({
    status: 'success',
    data
  });
});


