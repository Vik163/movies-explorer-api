const Movie = require('../models/movie');

function addError(res, card) {
  if ((res.statusCode === 200 && !card)) {
    const err = 'error';
    throw err;
  }
}

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((cards) => {
      res.send(cards);
    })
    .catch((err) => next(err));
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
    .catch((err) => next(err));
};

module.exports.deleteMovies = (req, res, next) => {
  Movie.findOne({ _id: req.params._id })
    .then((card) => {
      if (!card) {
        addError(res, card);
      }
      return Movie.findOneAndRemove({ _id: req.params._id, owner: req.user._id })
        .populate('owner')
        .then((cardOwnerId) => {
          if (cardOwnerId === null) {
            const err = 'errorOwnerId';
            throw err;
          }
          res.send(card);
        });
    })
    .catch((err) => next(err));
};
