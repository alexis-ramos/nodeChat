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
    const user = {
      name: body.name,
      username: body.username,
    };

    if (body.id) {
      user.id = body.id;
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

  const follow = (from, to) => {
    console.log('follow');
    return store.upsert(TABLA + '_follow', {
      user_from: from,
      user_to: to,
    });
  };

  return {
    list,
    get,
    upsert,
    follow,
  };
};
