const ErrorEmail = require('../errors/errorEmail');
const ErrorAuth = require('../errors/errorAuth');

const handleErrors = (err, req, res, next) => {
  const DUPLICATE_ERROR_CODE = 11000;

  if (err.code === DUPLICATE_ERROR_CODE) {
    throw new ErrorEmail('При регистрации указан email, который уже существует на сервере');
  }
  if (err.message === 'Неправильные почта или пароль') {
    throw new ErrorAuth('Неправильные почта или пароль');
  }
  next(err);
};

module.exports = handleErrors;
