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

const list = (table) => {
  return new Promise((resolve, reject) => {
    connection.query(`select * from ${table}`, (err, data) => {
      if (err) {
        return reject(err);
      }
      resolve(data);
    });
  });
};

const get = (table, id) => {
  return new Promise((resolve, reject) => {
    connection.query(`select * from ${table} where id = ${id}`, (err, data) => {
      if (err) {
        return reject(err);
      }

      resolve(data);
    });
  });
};

const insert = (table, data) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `insert into ${table} set ? ON DUPLICATE KEY UPDATE ?`,
      [data, data],
      (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      }
    );
  });
};

const update = (table, data) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `update ${table} set ? where id=?`,
      [data, data.id],
      (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      }
    );
  });
};

const upsert = (table, data) => {
  if (data && data.id) {
    return update(table, data);
  } else {
    return insert(table, data);
  }
};

const query = (table, query, join) => {
  let joinQuery = '';
  if (join) {
    const key = Object.keys(join)[0];
    const val = join[key];
    joinQuery = `join ${key} on ${table}.${val} = ${key}.id`;
  }

  return new Promise((resolve, reject) => {
    connection.query(
      `select * from ${table} ${joinQuery} where ?`,
      query,
      (err, res) => {
        if (err) {
          return reject(err);
        } else {
          resolve(res[0] || null);
        }
      }
    );
  });
};

module.exports = {
  list,
  get,
  upsert,
  query,
};
