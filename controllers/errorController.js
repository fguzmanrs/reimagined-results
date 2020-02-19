module.exports = (err, req, res, next) => {
  console.log(err, "this is global err");
  res.status(403).json({
    status: "fail",
    message: "catched err from global err handler"
  });
};
