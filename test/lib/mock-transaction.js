'use strict';

const faker = require('faker');
const mockUser = require('./mock-user.js');

const Transaction = require('../../model/transaction.js');

const mockTransaction = module.exports = {};

mockTransaction.createOne = () => {
  let result = {};
  // result.password = faker.internet.password();
  return mockUser.createOne()
  .then(userData => {
    result.user = userData.user;
    return new Transaction({
      borrowerId: result.user._id,
      toolId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'tool'},
      startDate: {type: Date, required: true},
      endDate: {type: Date, required: true},
      transactionDate: {type: Date, required: true}
    })
  });
};
