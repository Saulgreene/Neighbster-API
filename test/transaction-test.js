'use strict';

require('dotenv').config({path: `${__dirname}/../.test.env`});

const expect = require('expect');
const superagent = require('superagent');
const server = require('../lib/server.js');

const API_URL = process.env.API_URL;
const clearDB = require('./lib/clear-db.js');
const mockTransaction = require('./lib/mock-transaction.js');

describe('Testing Transaction router', () => {

  let tempUser;

  before(server.start);
  after(server.stop);
  // beforeEach('create')
  afterEach(clearDB);

  describe('Testing POST', () => {
    it('should return a token and a 200 status', () => {
      
    })
  })

})
