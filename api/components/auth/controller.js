const bcrypt = require('bcrypt');
const auth = require('../../../auth');
const TABLA = 'auth';

module.exports = function (injectedStore) {
  let store = injectedStore;
  if (!store) {
    store = require('../../../store/dummy');
  }

  const login = async (username, password) => {
    const data = await store.query(TABLA, { username: username });
    return bcrypt.compare(password, data.password).then((sonIguales) => {
      if (sonIguales === true) {
        //se genera el token
        return auth.sign(JSON.parse(JSON.stringify(data)));
      } else {
        //se genera el error
        throw new Error('informacion invalida');
      }
    });
  };

  const upsert = async (data) => {
    const authData = {
      id: data.id,
    };

    if (data.username) {
      authData.username = data.username;
    }

    if (data.password) {
      authData.password = await bcrypt.hash(data.password, 5);
    }

    return store.upsert(TABLA, authData);
  };

  return {
    upsert,
    login,
  };
};
