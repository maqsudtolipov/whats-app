module.exports = (err, req, res, next) => {
  console.log('💥 ERROR: ', err.message);

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};
