const jwt = require('jsonwebtoken');
require('dotenv').config();

const ErrorAuth = require('../errors/errorAuth');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    throw new ErrorAuth('Неправильные почта или пароль');
  }

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    if (err) {
      throw new ErrorAuth('Неправильные почта или пароль');
    }

    next(err);
  }

  req.user = payload;

  next();
};
