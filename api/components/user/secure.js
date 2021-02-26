const auth = require('../../../auth');

module.exports = function checkAuth(action) {
  function middleware(req, res, next) {
    switch (action) {
      case 'update':
        const owner = req.body.id;
        console.log(owner);
        auth.check.own(req, owner);
        console.log('pasa el check');
        next();
        break;

      default:
        next();
    }
  }

  return middleware;
};
