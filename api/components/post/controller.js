const TABLA = 'post';

module.exports = function (injectedStore) {
  let store = injectedStore;
  if (!store) {
    store = require('../../../store/dummy');
  }
  const list = () => {
    return store.list(TABLA);
  };

  return {
    list,
  };
};
