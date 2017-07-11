'use strict';

// npm modules
const {Router} = require('express');
const jsonParser = require('body-parser').json();

// app modules
const basicAuth = require('../lib/basic-auth-middleware.js');
const User = require('../model/user.js');

// module logic
const userRouter = module.exports = new Router();

// /api/signup
userRouter.post('/api/signup', jsonParser, (req, res, next) => {
  console.log('Hit POST /api/signup');
  User.create(req.body)
    .then(console.log('req.body', req.body))
    .then(token => res.send(token))
    .catch(next);
});
