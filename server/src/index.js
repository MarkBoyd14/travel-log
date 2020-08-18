// require express
const express = require('express');
// require middlewares
const morgan = require('morgan'); // morgan logs all incoming requests
const helmet = require('helmet'); // helmet removes/adds some headers to improve security
const cors = require('cors'); // cross-origin resource sharing: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
const mongoose = require('mongoose'); // connect to db

require('dotenv').config(); // access .env file

const middlewares = require('./middlewares');
const logs = require('./api/logs');

// create express app
const app = express();

// connect to database
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// set up middlewares
app.use(morgan('common'));
app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN, // only requests from this origin can reach our back end
  }),
);

app.use(express.json()); // add JSON body parsing middleware

app.get('/', (req, res) => {
  res.json({
    message: 'Hello World!',
  });
});

// when request comes into /api/logs, it will check logs router for matching route
app.use('/api/logs', logs);

// use middlewares
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

// set port from env variable or default 3000
const port = process.env.PORT || 8008;

// listen to port
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
