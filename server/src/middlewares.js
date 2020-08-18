// not found middleware (should be the last middleware)
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`); // create not found error
  res.status(404); // set status code to 404 (not found)
  next(error); // pass error into next to go to error handling middleware
};

// error handling middleware (4 params)
// eslint-disable-next-line no-unused-vars
const errorHandler = (error, req, res, next) => {
  // if status code is 200, set to 500 (Internal Server Error), otherwise, set to statusCode
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode); // set status code
  res.json({
    // send json response
    message: error.message, // error message
    stack: process.env.NODE_ENV === 'production' ? '' : error.stack, // only send stack if in development - send nothing if in production
  });
};

module.exports = {
  notFound,
  errorHandler,
};
