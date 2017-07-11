'use strict';

const faker = require('faker');
const mockUser = require('./mock-user.js');

const Transaction = require('../../model/transaction.js');

const mockTransaction = module.exports = {};

mockTransaction.createOne = () => {
  let result = {};
  // result.password = faker.internet.password();
  return mockUser.createOne()
  .then(user => {
    result.user = user;
    return new Transaction
  });
};
