const jwt = require('jsonwebtoken');
const config = require('../config');
const error = require('./../utils/error');

const secret = config.jwt.secret;

const sign = (data) => {
  return jwt.sign(data, secret);
};

const verify = (token) => {
  console.log('el token', token);
  return jwt.verify(token, secret);
};

const check = {
  own: function (req, owner) {
    const decoded = decodeHeader(req);
    console.log(decoded);
    //comprobar si es o no propio
    if (decoded.id !== owner) {
      throw error('No puedes hacer esto', 401);
      //throw new Error('No puedes editar esto');
    }
  },
};

const getToken = (auth) => {
  if (!auth) {
    throw new Error('No viene el token');
  }

  if (auth.indexOf('Bearer ') === -1) {
    throw new Error('Formato Invalido');
  }

  let token = auth.replace('Bearer ', '');
  return token;
};

function decodeHeader(req) {
  const authorization = req.headers.authorization || '';
  const token = getToken(authorization);
  const decoded = verify(token);

  req.user = decoded;

  return decoded;
}

module.exports = {
  sign,
  check,
};
