const express = require('express');
const usersRoutes = require('./routes/users');
const cardsRoutes = require('./routes/cards');

const {PORT = 3000} = process.env;

const app = express();
app.listen(PORT, (req, res) => { console.log(`Server works at port ${PORT}`) })

//authentication middleware
app.use((req, res, next) => {
  req.user = {
    _id: '5d8b8592978f8bd833ca8133'
  };

  next();
});

app.use('/', usersRoutes);
app.use('/', cardsRoutes);

app.get('/', (req, res) => {
  console.log(new Date(), ' ', req.method)
  res.send('<h1>Hello World!</h1>')
})