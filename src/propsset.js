const proxy = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(proxy('/',{ target: 'http://localhost:9093' }));
//   app.use(proxy('/api/v1',{ target: 'https://cnodejs.org',secure:false }));
};