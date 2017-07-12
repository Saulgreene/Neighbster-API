'use strict';

const faker = require('faker');
const mockUser = require('./mock-user.js');
const mockTool = require('./mock-tool.js');
const Transaction = require('../../model/transaction.js');

const mockTransaction = module.exports = {};

mockTransaction.createOne = () => {
  let result = {};
  return mockUser.createOne()
    .then(borrowerData => {
      result.borrower = borrowerData.user;
      console.log('result after mockUser.createOne()', result);
      return mockTool.createOne()
        .then(toolData => {
          result.tool = toolData.tool;
          console.log('result after mockTool.createOne()', result);
          return new Transaction({
            borrowerId: result.borrower._id,
            toolId: result.tool._id,
            startDate: Date.now(),
            endDate: Date.now(),
            transactionDate: Date.now(),
          })
            .save();
        })
        .then(transaction => {
          result.transaction = transaction;
          console.log('result after transaction', result);
          return result;
        });
    });
};
