function error404(req, res, next) {
  res.status(404).json({
    status: 404,
    error: "Error 404, page not found eheh",
  });
}

export default error404;
