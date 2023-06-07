module.exports.http = {
  middleware: {
    order: ['cookieParser', 'session', 'bodyParser', 'cors'],
    cors: (function () {
      var cors = require('cors');
      return cors();
    })(),
  },
};
