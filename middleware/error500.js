function error500(err, req, res, next) {
  res.status(500).json({
    status: 500,
    error: err.message,
  });
}
export default error500;
