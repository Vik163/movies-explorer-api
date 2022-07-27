const ErrorEmail = require('../errors/errorEmail');

const handleErrors = (err, req, res, next) => {
  const DUPLICATE_ERROR_CODE = 11000;

  if (err.code === DUPLICATE_ERROR_CODE) {
    throw new ErrorEmail('При регистрации указан email, который уже существует на сервере');
  }
  next(err);
};

module.exports = handleErrors;
