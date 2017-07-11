'use strict';

// npm modules
const {Router} = require('express');
const jsonParser = require('body-parser').json();

// app modules
const Transaction = require('../model/transaction.js');
const basicAuth = require('../lib/basic-auth-middleware.js');
// const User = require('../model/user.js');

// module logic
const userRouter = module.exports = new Router();

// /api/signup
transactionRouter.post('/api/transaction', jsonParser, (req, res, next) => {
  console.log('Hit POST /api/transaction');
  Transaction.create(req.body)
    // .then(console.log('req.body', req.body))
    .then(token => {
      console.log('token', token);
      res.send(token);})
    .catch(next);
});

// userRouter.get('/api/signin', basicAuth, (req, res, next) => {
//   console.log('Hit GET /api/signin');
//   req.user.tokenCreate()
//     .then(token => res.send(token))
//     .catch(next);
// });
