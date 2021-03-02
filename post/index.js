const express = require('express');
const config = require('../config.js');
const app = express();
const post = require('./components/post/network');
const errors = require('../network/errors.js');

app.use(express.json());

//RUTAS
app.use('/api/post', post);

app.use(errors);

app.listen(config.post.port, () => {
  console.log(`servicio post escuchando en el ${config.post.port}`);
});
