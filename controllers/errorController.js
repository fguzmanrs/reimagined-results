exports.globalErrorHandler = (err, req, res, next) => {
  //   console.log(err, "this is global err");
  console.log("err.message", err.statusCode);
  res.status(403).json({
    status: "fail",
    message: "catched err from global err handler"
  });
};
