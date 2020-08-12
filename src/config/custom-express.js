require('marko/node-require').install();
require('marko/express');
const methodOverride = require('method-override');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/static', express.static('src/app/public'));

app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      var method = req.body._method;
      delete req.body._method;
      return method;
    }
}));

const routes = require('../app/routes/routes');
routes(app);

app.use(function(req, resp, next) {
  return resp.status(404).marko(
    require('../app/views/error/404.marko')
  )
});

app.use(function(error, req, resp, next) {
  return resp.status(500).marko(
    require('../app/views/error/500.marko')
  )
}); 

module.exports = app;