// Catch error from asynchronous functions
<<<<<<< HEAD
module.exports = function catchAsync(req, res, next) {
=======
module.exports = fn => {
>>>>>>> backEnd
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};
