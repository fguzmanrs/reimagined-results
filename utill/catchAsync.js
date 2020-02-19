// Catch error from asynchronous functions
module.exports = function catchAsync(req, res, next) {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};
