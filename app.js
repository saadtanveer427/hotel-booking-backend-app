const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
var cors = require('cors')


const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const hotelRouter = require('./routes/hotelRoutes');
const staffRouter = require('./routes/staffRoutes');
const bookingRouter = require('./routes/bookingRoutes');

const app = express();


const allowedDomainsList = ['http://127.0.0.1:5173','http://localhost:5173'];

const corsConfig = {
  credentials: true,
  origin: allowedDomainsList
};


app.use((req, res, next) => {
  Object.defineProperty(req, 'query', {
    value: { ...req.query },
    writable: true,
    configurable: true,
    enumerable: true,
  });
  next();
});



app.use(cors(corsConfig));
// Use a regex path to avoid path-to-regexp wildcard parsing.
app.options(/.*/, cors(corsConfig));

// Set security HTTP headers
app.use(helmet());



// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!'
});

app.use('/api', limiter);


// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));




// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());


app.use('/api/hotel', hotelRouter);
app.use('/api/staff', staffRouter);
app.use('/api/booking', bookingRouter);

app.all(/.*/, (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
