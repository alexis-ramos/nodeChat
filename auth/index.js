const jwt = require('jsonwebtoken');
const config = require('../config');
const secret = config.jwt.secret;

const sign = (data) => {
  return jwt.sign(data, secret);
};

const verify = (token) => {
  return jwt.verify(token, secret);
};

const check = {
  own: function (req, owner) {
    const decoded = decodeHeader(req);
    console.log(decoded);
  },
};

const getToken = (auth) => {
  if (!auth) {
    throw new Error('No viene el token');
  }

  if (auth.indexOf('Bearer') === -1) {
    throw new Error('Formato Invalido');
  }

  let token = auth.replace('Bearer', '');
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
};
