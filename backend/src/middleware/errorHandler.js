function errorHandler(err, req, res, next) {
  console.error("Unhandled Error:", err);
  const status = err.status || 500;
  res.status(status).json({
    success: false,
    error: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "production" ? undefined : err.stack
  });
}

module.exports = errorHandler;

