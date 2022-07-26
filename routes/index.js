const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');
const ErrorNotFound = require('../errors/notFound');

const {
  createUser,
  login,
} = require('../controllers/users');

// Валидация - библиотека celebrate

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().pattern(/^[\w]{1}[\w-.]*@[\w-]+\.[a-z]{2,4}$/i),
    password: Joi.string().required().min(6),
    name: Joi.string().required().min(2).max(30),
  }),
}), createUser);

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().pattern(/^[\w]{1}[\w-.]*@[\w-]+\.[a-z]{2,4}$/i),
    password: Joi.string().required().min(6),
  }),
}), login);

router.use(auth); // Проверка авторизации

router.use('/users', require('./users'));
router.use('/movies', require('./movies'));

// Ошибка 404 -------------------------------
router.use('*', (req, res, next) => {
  next(new ErrorNotFound('Маршрут не найден'));
});

module.exports = router;
