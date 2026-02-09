const mongoose = require('mongoose');
const dotenv = require('dotenv');

const Hotel = require('../models/hotelModel');
const Staff = require('../models/staffModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE_LOCAL.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

const seedLogSchema = new mongoose.Schema({
  key: { type: String, unique: true },
  ranAt: { type: Date, default: Date.now }
});

const SeedLog = mongoose.model('SeedLog', seedLogSchema);

const seedKey = 'seed_hotels_and_staff_v1';

const hotelData = [
  { name: 'Harbor View', totalGuests: 120, totalBedrooms: 60, totalBathrooms: 60, price: 90 },
  { name: 'Cedar Lodge', totalGuests: 80, totalBedrooms: 40, totalBathrooms: 40, price: 100 },
  { name: 'Maple Suites', totalGuests: 150, totalBedrooms: 75, totalBathrooms: 75, price: 220 }
];

const staffData = [
  { name: 'Amina Yusuf', role: 'manager', photo: 'chef-1.png' },
  { name: 'Muhammad Ali', role: 'reception', photo: 'chef-2.png' },
  { name: 'Abdullah Hasan', role: 'housekeeping', photo: 'chef-3.png' },
  { name: 'Umair Ahmed', role: 'security', photo: 'chef-4.png' }
];

async function run() {
  try {
    await mongoose.connect(DB);

    const alreadyRan = await SeedLog.findOne({ key: seedKey });
    if (alreadyRan) {
      console.log('Seed already ran. Skipping.');
      await mongoose.disconnect();
      process.exit(0);
    }

    await Hotel.insertMany(hotelData);
    await Staff.insertMany(staffData);

    await SeedLog.create({ key: seedKey });

    console.log('Seed complete.');
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Seed failed:', err);
    try {
      await mongoose.disconnect();
    } catch (_) {
      // ignore
    }
    process.exit(1);
  }
}

run();
