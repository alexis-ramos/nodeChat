const mysql = require('mysql');
const config = require('../config');

const dbConfig = {
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
};

// se hace la conexion

let connection;

const handleConn = () => {
  connection = mysql.createConnection(dbConfig);

  connection.connect((err) => {
    if (err) {
      console.error('[db err]', err);
      setTimeout(handleConn, 2000);
    } else {
      console.log('DB Connected');
    }
  });

  connection.on('error', (err) => {
    console.error('[db err]', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      handleConn();
    } else {
      throw err;
    }
  });
};

handleConn();

const list = (table, id) => {
  return new Promise((resolve, reject) => {
    connection.query(`select * from ${table}`, (err, data) => {
      if (err) {
        return reject(err);
      }
      resolve(data);
    });
  });
};

module.exports = {
  list,
};
