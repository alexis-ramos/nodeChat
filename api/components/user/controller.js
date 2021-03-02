const naoid = require('nanoid');
const auth = require('../auth');
const TABLA = 'user';

module.exports = function (injectedStore, injectedCache) {
  let store = injectedStore;
  let cache = injectedCache;

  if (!store) {
    store = require('../../../store/dummy');
  }

  if (!cache) {
    store = require('../../../store/dummy');
  }

  const list = async () => {
    let users = await cache.list(TABLA);
    if (!users) {
      console.log('No estaba en cache, buscando en db');
      users = await store.list(TABLA);
      cache.upsert(TABLA, users);
    } else {
      console.log('nos traemos datos de cache');
    }
    return users;
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

  const following = async (user) => {
    const join = {};
    join[TABLA] = 'user_to';
    const query = { user_from: user };

    return await store.query(TABLA + '_follow', query, join);
  };

  return {
    list,
    get,
    upsert,
    follow,
  };
};
