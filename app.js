const express = require('express');
const bodyParser = require('body-parser');
const process = require('process');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { errors } = require('celebrate');
const helmet = require('helmet');

require('dotenv').config();

const MONGO_URL = require('./config');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const handleErrors = require('./middlewares/handleErrors');
const index = require('./routes/index');

const { PORT = 3001 } = process.env;

const app = express();

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
});

// Сборка пакетов ----------------------------
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Cors Доступ к определенным источникам -----------------
const options = {
  originName: [
    'https://localhost:3000',
    'http://localhost:3000',
    'http://vik.diplom.nomoredomains.xyz',
    'https://vik.diplom.nomoredomains.xyz',
  ],
};

app.use('*', cors(options));

app.use(helmet());

app.use(requestLogger);

app.use(cookieParser());
app.use(index); // Роуты

// Обработка ошибок --------------------------------------
app.use(errorLogger);

app.use(errors());
app.use(handleErrors);

app.use((err, req, res, next) => {
  if (err.statusCode) {
    return res.status(err.statusCode).send({ message: err.message });
  }

  console.error(err.stack);

  res.status(500).send({ message: 'Что-то пошло не так' });

  return next();
});
// -----------------------------------------------------

app.listen(PORT, () => {
});
