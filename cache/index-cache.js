const express = require('express');
const config = require('../config.js');
const router = require('./network.js');
const app = express();

app.use(express.json());

//Rutas
app.use('/', router);

app.listen(config.mysqlService.port, () => {
  console.log(
    'servicio de cache service en el puerto',
    config.cacheService.port
  );
});
