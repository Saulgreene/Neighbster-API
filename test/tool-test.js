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
    it('should respond with a 400 if invalid body', () => {
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
  });
  describe('Testing GET /api/tools', () => {
    it('should return a tool and a 200 status', () => {
      superagent.get(`${API_URL}/api/tools/${tempUserData.tool._id}`)
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body.ownerId).toEqual(tempUserData.user._id.toString());
          expect(res.body.serialNumber).toEqual(tempUserData.tool.serialNumber);
          expect(res.body.toolName).toEqual(tempUserData.tool.toolName);
          expect(res.body.toolDescription).toEqual(tempUserData.tool.toolDescription);
          expect(res.body.toolInstructions).toEqual(tempUserData.tool.toolInstructions);
          expect(res.body.category).toEqual(tempUserData.tool.category);
        });
    });
    it('should respond with status 404 for tool.id not found', () => {
      superagent.get(`${API_URL}/api/tools/not-an-id`)
        .catch(res => {
          expect(res.status).toEqual(404);
        });
    });
  });
  describe('Testing PUT', () => {
    it('should return an updated tool and a 200 status', () => {
      return superagent.put(`${API_URL}/api/tools/${tempUserData.tool._id}`)
        .send({
          toolDescription: 'updated-description',
        })
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body.toolDescription).toEqual('updated-description');
        });
    });
    it('should respond with a 400 if no body provided', () => {
      return superagent.put(`${API_URL}/api/tools/${tempUserData.tool._id}`)
        .send({})
        .catch(res => {
          expect(res.status).toEqual(400);
        });
    });
    it('should respond with a 400 if invalid body', () => {
      return superagent.put(`${API_URL}/api/tools/${tempUserData.tool._id}`)
        .send({
          serialNumber: 'not-a-number',
        })
        .then(res => {
          throw res;})
        .catch(res => {
          expect(res.status).toEqual(400);
        });
    });
    it('should respond with status 404 for tool.id not found', () => {
      superagent.put(`${API_URL}/api/tools/not-an-id`)
        .send({
          serialNumber: 54321,
        })
        .catch(res => {
          expect(res.status).toEqual(404);
        });
    });
  });
  describe('Testing DELETE /api/tools', () => {
    it('should delete a tool and respond with a 204 status', () => {
      superagent.delete(`${API_URL}/api/tools/${tempUserData.tool._id}`)
        .then(res => {throw res;})
        .catch(res => {
          console.log();
          expect(res.status).toEqual(204);
        });
    });
    it('should respond with status 404 for tool.id not found', () => {
      superagent.delete(`${API_URL}/api/tools/not-an-id`)
        .catch(res => {
          expect(res.status).toEqual(404);
        });
    });
  });
}); // close final describe block
