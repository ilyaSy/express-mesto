const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors, celebrate, Joi } = require('celebrate');
const usersRoutes = require('./routes/users');
const cardsRoutes = require('./routes/cards');
const { createUser, login } = require('./controllers/users');
// const auth = require('./middlewares/auth');

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const { PORT = 3000 } = process.env;

const app = express();
app.listen(PORT);

app.use(bodyParser.json());
app.use(cookieParser());

// app.post('/signin', login);
// app.post('/signup', createUser);
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string(),
    about: Joi.string(),
    avatar: Joi.string(),
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
}), createUser);

// app.use(auth);

app.use('/', usersRoutes);
app.use('/', cardsRoutes);
app.use('/', (req, res) => {
  res.status(404).send({ message: 'ресурс не найден' });
});

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message: statusCode === 500 ? 'На сервере произошла ошибка' : message,
  });
});
