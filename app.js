const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const usersRoutes = require('./routes/users');
const cardsRoutes = require('./routes/cards');

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const { PORT = 3000 } = process.env;

const app = express();
app.listen(PORT, (req, res) => {
  if (false) {
    console.log(req, res);
  }
  console.log(`Server works at port ${PORT}`);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//  authentication middleware
app.use((req, res, next) => {
  req.user = {
    _id: '60a78e756d4fa91478058db8',
  };

  next();
});

app.use('/', usersRoutes);
app.use('/', cardsRoutes);

app.get('/', (req, res) => {
  console.log(`${new Date()} ${req.method}`);
  res.send('<h1>Hello World!</h1>');
});
