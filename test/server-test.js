'use strict';

const path = require('path');

// require('dotenv').config({path: path.resolve(__dirname, `../.env`)});
require('dotenv').config({path: `${__dirname}/../.test.env`});

const expect = require('expect');
const superagent = require('superagent');

require('./lib/mock-aws.js');
const server = require('../lib/server.js');

const API_URL = process.env.API_URL;

describe('testing server', () => {
  before(server.start);
  after(server.stop);

  describe('testing server', () => {
    it('should return 404 for non-existent route', () => {
      return superagent.get(`${API_URL}/api/not-a-route`)
        .then(res => {throw res;})
        .catch(res => {
          expect(res.status).toEqual(404);
        });
    });
  });
});
