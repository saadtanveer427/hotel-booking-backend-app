const mongoose = require('mongoose');


const staffSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name!']
  },
  photo: {
    type: String,
    default: 'default.jpg'
  },
  role: {
    type: String,
    default: 'staff'
  },
});

const Staff = mongoose.model('Staff', staffSchema);

module.exports = Staff;
