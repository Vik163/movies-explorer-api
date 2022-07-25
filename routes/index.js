const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');
const {
  createUser,
  login,
  signout,
  getCurrentUser,
  updateUser,
} = require('../controllers/users');
const {
  getMovies,
  createMovies,
  deleteMovies,
} = require('../controllers/movies');

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
    name: Joi.string().min(2).max(30),
  }),
}), createUser);
router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
}), login);
router.post('/signout', signout);

router.use(auth);

router.get('/users/me', getCurrentUser);
router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
}), updateUser);

router.get('/movies', getMovies);
router.post('/movies', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    movieId: Joi.string().required().hex().length(24),
    image: Joi.string().required().pattern(/(https?:\/\/)([\da-z.-]+)\.([a-z.]{2,6})([/\w.-]*)*\/?/),
    trailerLink: Joi.string().required().pattern(/(https?:\/\/)([\da-z.-]+)\.([a-z.]{2,6})([/\w.-]*)*\/?/),
    thumbnail: Joi.string().required().pattern(/(https?:\/\/)([\da-z.-]+)\.([a-z.]{2,6})([/\w.-]*)*\/?/),
  }),
}), createMovies);
router.delete('/movies/:_id', celebrate({
  params: Joi.object().keys({
    _id: Joi.string().hex().length(24),
  }),
}), deleteMovies);

module.exports = router;
