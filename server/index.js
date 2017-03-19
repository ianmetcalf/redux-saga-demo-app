'use strict';

const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const compression = require('compression');
const viewHelpers = require('./views/helpers');

const app = express();

const isDev = app.get('env') === 'development';

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Only use the hashed assets when not running in development
// eslint-disable-next-line global-require, import/no-unresolved
if (!isDev) viewHelpers.assets(require('../assets.json'));

app.use(logger(isDev ? 'dev' : 'common'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(compression());

// setup routes for app
app.use('/', require('./routes/index'));

/* eslint-disable global-require */
if (isDev) {
  const webpack = require('webpack');
  const webpackConfig = require('../webpack.dev.config');

  const compiler = webpack(webpackConfig);

  app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: {colors: true},
  }));
  app.use(require('webpack-hot-middleware')(compiler));
}
/* eslint-enable global-require */

// setup static assets
app.use(express.static(path.join(__dirname, '..', 'public')));

// catch 404 and render not found
app.use((req, res, next) => {
  res.status(404).render('error', {
    message: 'Not Found',
    layout: false,
  });
});

if (isDev) {
  app.use((err, req, res, next) => {
    res.status(err.status || 500).render('error', {
      message: err.message || 'Server Error',
      error: err,
      layout: false,
    });

    // eslint-disable-next-line no-console
    console.error(err);
  });
}

app.use((err, req, res, next) => {
  res.status(500).render('error', {
    message: 'Server Error',
    layout: false,
  });

  // eslint-disable-next-line no-console
  console.error(err);
});

module.exports = app;
