const express = require('express');
const hotelController = require('../controllers/hotelController');

const router = express.Router();

router
  .route('/')
  .get(hotelController.getAllHotels)



module.exports = router;
