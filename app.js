const express = require('express');

const {PORT = 3000} = process.env;

const app = express();

app.listen(PORT, (req, res) => { console.log('Hello world!') })

app.get('/', (req, res) => {
  console.log(new Date(), ' ', req.method)
  res.send('<h1>Hello World!</h1>')
})