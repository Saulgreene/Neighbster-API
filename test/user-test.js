'use strict';

require('dotenv').config({path: `${__dirname}/../.test.env`});

const expect = require('expect');
const superagent = require('superagent');
const server = require('../lib/server.js');

const API_URL = process.env.API_URL;
const clearDB = require('./lib/clear-db.js');
const mockUser = require('./lib/mock-user.js');

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
    it('should respond with a 400 if invalid body', () => {
      return superagent.post(`${API_URL}/api/signup`)
        .send({
          username: '',
          email: '',
          password: '',
        })
        .catch(res => {
          expect(res.status).toEqual(400);
        });
    });
    it('should respond with a 409 if username already exists', () => {
      return mockUser.createOne()
        .then(userData => {
          return userData.user.save();
        })
        .then(user => {
          let tempUser = user;
          return superagent.post(`${API_URL}/api/signup`)
            .send({
              username: tempUser.username,
              password: 'secret2',
              email: 'test2@email.com',
            });
        })
        .then(res => {throw res;})
        .catch(err => {
          expect(err.response.status).toEqual(409);
        });
    });
  });
}); // close final describe block
