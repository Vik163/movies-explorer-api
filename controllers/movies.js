const Movie = require('../models/movie');
const ErrorNotFound = require('../errors/notFound');
const ErrorOwnerId = require('../errors/errorOwnerId');

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((cards) => {
      res.send(cards);
    })
    .catch(next);
};

module.exports.createMovies = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user._id,
  })
    .then((card) => res.send(card))
    .catch(next);
};

module.exports.deleteMovies = (req, res, next) => {
  Movie.findOne({ _id: req.params._id })
    .then((card) => {
      if ((res.statusCode === 200 && !card)) {
        throw new ErrorNotFound('Карточка или пользователь не найдены');
      }
      return Movie.findOneAndRemove({ _id: req.params._id, owner: req.user._id })
        .populate('owner')
        .then((cardOwnerId) => {
          if (cardOwnerId === null) {
            throw new ErrorOwnerId('Попытка удалить чужую карточку');
          }
          res.send(card);
        });
    })
    .catch(next);
};
