const naoid = require('nanoid');
const TABLA = 'user';

module.exports = function (injectedStore) {
  let store = injectedStore;
  if (!store) {
    store = require('../../../store/dummy');
  }

  const list = () => {
    return store.list(TABLA);
  };
  const get = (id) => {
    return store.list(TABLA, id);
  };

  const upsert = (body) => {
    const user = {
      name: body.name,
    };

    if (body.id) {
      user.id = body.id;
    } else {
      user.id = naoid();
    }
    return store.upsert(TABLA, user);
  };

  return {
    list,
    get,
    upsert,
  };
};
