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

  return {
    list,
    get,
  };
};
