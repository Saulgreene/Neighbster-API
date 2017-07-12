'use strict';

// npm modules
const {Router} = require('express');
const jsonParser = require('body-parser').json();

// app modules
const Transaction = require('../model/transaction.js');

// module logic
const transactionRouter = module.exports = new Router();

// /api/signup
transactionRouter.post('/api/transactions', jsonParser, (req, res, next) => {
  console.log('Hit POST /api/transactions');
  new Transaction(req.body)
    .save()
    .then(transaction => res.json(transaction))
    .catch(next);
});
