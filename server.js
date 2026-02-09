const mongoose = require('mongoose');
const dotenv = require('dotenv');


process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message,err);
  process.exit(1);
});






dotenv.config({ path: './config.env' });
const app = require('./app');
//const apps = require('https').Server( keysOpt,app); //ssl certificate code

const DB = process.env.DATABASE_LOCAL.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {    
  })
  .then(() => console.log('DB connection successful!'));


const port = process.env.PORT || 3000;

//const server=app.listen(port, () => {  original code  is replaced by below line

const server=app.listen(port, () => { //this one only
  console.log(`App running on ports ${port}...`);
});

process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! 💥 Shutting downs...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});


