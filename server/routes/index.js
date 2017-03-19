'use strict';

const Router = require('express').Router;

const router = new Router();

router.get('/', (req, res, next) => {
  res.redirect('/app');
});

router.get('/app*', (req, res, next) => {
  res.render('index', {
    title: 'Redux Saga Demo App',
  });
});

module.exports = router;
