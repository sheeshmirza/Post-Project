const errorHandler = async (error, req, res, next) => {
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
  next();
};

module.exports = errorHandler;
