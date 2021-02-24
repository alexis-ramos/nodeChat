const naoid = require('nanoid');
const auth = require('../auth');
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
    return store.get(TABLA, id);
  };

  const upsert = async (body) => {
    console.log(body);
    const user = {
      name: body.name,
      username: body.username,
      password: body.password,
    };

    if (body.id) {
      user.id = body.id;
    } else {
      user.id = naoid();
    }

    if (body.password || body.username) {
      await auth.upsert({
        id: user.id,
        username: user.username,
        password: body.password,
      });
    }

    return store.upsert(TABLA, user);
  };

  return {
    list,
    get,
    upsert,
  };
};
