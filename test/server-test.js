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

  describe('Testing Server', () => {
    it('should return 404 for non-existent route', () => {
      server.start();
      return superagent.get(`${API_URL}/api/not-a-route`)
        .then(res => {throw res;})
        .catch(res => {
          expect(res.status).toEqual(404);
          server.stop();
        });
    });
    it('should throw an error if server already down', () => {
      server.stop();
    });
  });
});
