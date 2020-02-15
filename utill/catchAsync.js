// Catch error from asynchronous functions
module.exports = function catchAsync(fn) {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};
