'use strict';

require('dotenv').config({path: `${__dirname}/../.test.env`});

const expect = require('expect');
const superagent = require('superagent');
const server = require('../lib/server.js');

const clearDB = require('./lib/clear-db.js');
const API_URL = process.env.API_URL;

describe('Testing User model', () => {

  before(server.start);
  after(server.stop);
  afterEach(clearDB);

  let data = {
    username: 'test-user',
    password: 'secret',
    email: 'test@email.com',
  };

  describe('Testing POST', () => {
    it('should return a token and a 200 status', () => {
      return superagent.post(`${API_URL}/api/signup`)
        .send(data)
        .then(res => {
          console.log('res.text', res.text);
          expect(res.status).toEqual(200);
          expect(res.text).toExist();
          expect(res.text.length > 1).toBeTruthy();
        });
    });
    it('should respond with a 400 if no body provided', () => {
      return superagent.post(`${API_URL}/api/signup`)
        .send({})
        .catch(res => {
          expect(res.status).toEqual(400);
        });
    });
    it('should respond with a 401 if invalid body', () => {
      return superagent.post(`${API_URL}/api/signup`)
        .send({
          username: '',
          email: '',
          password: '',
        })
        .catch(res => {
          expect(res.status).toEqual(401);
        });
    });
  });
}); // close final describe block
