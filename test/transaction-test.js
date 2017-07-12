'use strict';

require('dotenv').config({path: `${__dirname}/../.test.env`});

const expect = require('expect');
const superagent = require('superagent');
const server = require('../lib/server.js');

const API_URL = process.env.API_URL;
const clearDB = require('./lib/clear-db.js');
const mockTransaction = require('./lib/mock-transaction.js');

describe('Testing Transaction router', () => {

  let tempTransaction;

  before(server.start);
  after(server.stop);
  beforeEach('create mockTransaction', () => {
    return mockTransaction.createOne()
      .then(transactionData => {
        tempTransaction = transactionData;
      });
  });
  afterEach(clearDB);

  // console.log('tempTransaction', tempTransaction);

  describe('Testing POST', () => {
    it('should return a transaction and a 200 status', () => {
      return superagent.post(`${API_URL}/api/transactions`)
        .send({
          borrowerId: tempTransaction.borrower._id,
          toolId: tempTransaction.tool._id,
          startDate: Date.now(),
          endDate: Date.now(),
          transactionDate: Date.now(),
        })
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body.borrowerId).toEqual(tempTransaction.borrower._id);
          expect(res.body.toolId).toEqual(tempTransaction.tool._id);
          expect(res.body.startDate).toExist();
          expect(res.body.endDate).toExist();
          expect(res.body.transactionDate).toExist();
        });
    });
    it('should respod with a 400 status', () => {
      return superagent.post(`${API_URL}/api/transactions`)
        .send({
          // borrowerId: tempTransaction.borrower._id,
          toolId: tempTransaction.tool._id,
          startDate: Date.now(),
          endDate: Date.now(),
          transactionDate: Date.now(),
        })
        .catch(res => {
          expect(res.status).toEqual(400);
        });
    });
    // it('should respod with a 409 status', () => {
    //   return superagent.post(`${API_URL}/api/transactions`)
    //     .send({
    //       // borrowerId: tempTransaction.borrower._id,
    //       toolId: tempTransaction.tool._id,
    //       startDate: Date.now(),
    //       endDate: Date.now(),
    //       transactionDate: Date.now(),
    //     })
    //     .catch(res => {
    //       expect(res.status).toEqual(409);
    //     });
    // });
  });
  describe('Testing GET', () => {
    it('should return a transaction and a 200 status', () => {
      console.log('tempTransaction.transaction._id', tempTransaction.transaction._id);
      return superagent.get(`${API_URL}/api/transactions${tempTransaction.transaction._id}`)
        .then(res => {
          console.log('get route', tempTransaction.transaction._id );
          expect(res.status).toEqual(200);
          expect(res.body._id).toEqual(tempTransaction.transaction._id);
          expect(res.body.borrowerId).toEqual(tempTransaction.borrower._id);
          expect(res.body.toolId).toEqual(tempTransaction.tool._id);
          expect(res.body.startDate).toExist();
          expect(res.body.endDate).toExist();
          expect(res.body.transactionDate).toExist();
        });
    });
  });
});
