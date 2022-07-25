require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const { NODE_ENV, JWT_SECRET } = process.env;

const User = require('../models/user');

function addError(res, user) {
  if ((res.statusCode === 200 && !user)) {
    const err = 'error';
    throw err;
  }
}

module.exports.createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => {
      res.send({
        name: user.name,
        email: user.email,
      });
    })
    .catch((err) => next(err));
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
      });
      res.send({
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
        },
      });
    })
    .catch((err) => next(err));
};

module.exports.signout = (req, res, next) => {
  res.clearCookie('jwt');
  res.send({ message: 'OK' });

  next();
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      addError(res, user);

      res.send(user);
    })
    .catch((err) => next(err));
};

module.exports.updateUser = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => res.send(user))
    .catch((err) => next(err));
};
