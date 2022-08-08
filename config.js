const MONGO_DEFAULT_URL = 'mongodb://localhost:27017/moviesdb';

const MONGO_URL = process.env.MONGO_URL || MONGO_DEFAULT_URL;

module.exports = MONGO_URL;
