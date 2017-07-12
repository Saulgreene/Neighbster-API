'use strict';

require('dotenv').config({path: `${__dirname}/../.test.env`});

const expect = require('expect');
const superagent = require('superagent');
const server = require('../lib/server.js');

const API_URL = process.env.API_URL;
const clearDB = require('./lib/clear-db.js');
const mockUser = require('./lib/mock-user.js');
const mockTool = require('./lib/mock-tool.js');

describe('Testing Tool model', () => {
  let tempUserData;

  before(server.start);
  after(server.stop);
  beforeEach('create mockTool', () => {
    return mockTool.createOne()
      .then(userData => {
        tempUserData = userData;
      });
  });
  afterEach(clearDB);

  describe('Testing POST', () => {
    it('should return a tool and a 200 status', () => {
      return superagent.post(`${API_URL}/api/tools`)
        .send({
          ownerId: tempUserData.user._id,
          serialNumber: 67890,
          toolName: 'test-tool-2',
          toolDescription: 'description-of-test-tool-2',
          toolInstructions: 'instructions-for-test-tool-2',
          category: 'auto',
        })
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body.ownerId).toEqual(tempUserData.user._id.toString());
          expect(res.body.serialNumber).toEqual(67890);
          expect(res.body.toolName).toEqual('test-tool-2');
          expect(res.body.toolDescription).toEqual('description-of-test-tool-2');
          expect(res.body.toolInstructions).toEqual('instructions-for-test-tool-2');
          expect(res.body.category).toEqual('auto');
        });
    });
    it('should respond with a 400 if no body provided', () => {
      return superagent.post(`${API_URL}/api/tools`)
        .send({})
        .catch(res => {
          expect(res.status).toEqual(400);
        });
    });
    it.only('should respond with a 400 if invalid body', () => {
      return superagent.post(`${API_URL}/api/tools`)
        .send({
          ownerId: 'not-an-id',
          serialNumber: 67890,
          toolName: 'test-tool-2',
          toolDescription: 'description-of-test-tool-2',
          toolInstructions: 'instructions-for-test-tool-2',
          category: 'auto',
        })
        .catch(res => {
          expect(res.status).toEqual(400);
        });
    });
    // it('should respond with a 409 if username already exists', () => {
    //   return mockUser.createOne()
    //     .then(userData => {
    //       return userData.user.save();
    //     })
    //     .then(user => {
    //       let tempUser = user;
    //       return superagent.post(`${API_URL}/api/signup`)
    //         .send({
    //           username: tempUser.username,
    //           password: 'secret2',
    //           email: 'test2@email.com',
    //         });
    //     })
    //     .then(res => {throw res;})
    //     .catch(err => {
    //       expect(err.response.status).toEqual(409);
    //     });
    // });
  });
  // describe('Testing GET /api/signin', () => {
  //   it('should return a token and a 200 status', () => {
  //     let tempUser;
  //     return mockUser.createOne()
  //       .then(userData => {
  //         tempUser = userData.user;
  //         let encoded = new Buffer(`${tempUser.username}:${userData.password}`).toString('base64');
  //         return superagent.get(`${API_URL}/api/signin`).set('Authorization', `Basic ${encoded}`);
  //       })
  //       .then(res => {
  //         expect(res.status).toEqual(200);
  //         expect(res.text).toExist();
  //         expect(res.text.length > 1).toBeTruthy();
  //       });
  //   });
  //   it('should respond with a status 401 for improperly formatted request', () => {
  //     let tempUser;
  //     return mockUser.createOne()
  //       .then(userData => {
  //         tempUser = userData.user;
  //         let encoded = new Buffer(`${tempUser.username}:${userData.password}`).toString('base64');
  //         return superagent.get(`${API_URL}/api/signin`);
  //       })
  //       .catch(res => {
  //         expect(res.status).toEqual(401);
  //       });
  //   });
  // });
}); // close final describe block
