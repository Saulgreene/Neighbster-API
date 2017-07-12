'use strict';

const path = require('path');

// require('dotenv').config({path: path.resolve(__dirname, `../.env`)});
require('dotenv').config({path: `${__dirname}/../.test.env`});

const expect = require('expect');
const superagent = require('superagent');

require('./lib/mock-aws.js');
const server = require('../lib/server.js');
const clearDB = require('./lib/clear-db.js');
const mockUser = require('./lib/mock-user.js');
const mockProfile = require('./lib/mock-profile.js');

const API_URL = process.env.API_URL;

describe('Testing Profile Model', () =>{
  let tempUserData;
  before(server.start);
  after(server.stop);
  beforeEach('create mockProfile', () =>{
    return mockProfile.createOne()
      .then(userData => {
        // console.log('UserData', userData);
        tempUserData = userData;
      });
  });
  afterEach(clearDB);
  // afterEach(tempUserData = {});

  describe('Testing POST', () => {
    it('should return a 200 status and a profile', () =>{
      console.log('POST tempUserData', tempUserData);
      return superagent.post(`${API_URL}/api/profile`)
        .set('Authorization', `Bearer ${tempUserData.token}`)
        .send({
          address: '6208 57th ave south seattle WA 98118',
          phone: '2533978733',
          realName: 'Saul Greene',
          picURI: 'some pic URI string',
          userId: tempUserData.user._id,
        })
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body.address).toEqual('6208 57th ave south seattle WA 98118');
          expect(res.body.phone).toEqual('2533978733');
          expect(res.body.realName).toEqual('Saul Greene');
          expect(res.body.picURI).toEqual('some pic URI string');
          expect(res.body.userId).toEqual(tempUserData.user._id);
          expect(res.text.length > 1).toBeTruthy();
        });
    });
    it('should return a 400 status Bad Request', () =>{
      return superagent.post(`${API_URL}/api/profile/`)
        .set('Authorization', `Bearer ${tempUserData.token}`)
        .send({})
        .catch(res => {
          expect(res.status).toEqual(400);
        });
    });
  });//end of POST describe block
  describe('Testing GET', () => {
    it('should return a status 200 and a retrieved profile', () => {
      return superagent.get(`${API_URL}/api/profile/${tempUserData.user._id}`)
        .then(res => {
          expect(res.status).toEqual(200);
        });
    });
    it('should return a status 404', () => {
      return superagent.get(`${API_URL}/api/profile/67383`)
        .catch(res => {
          expect(res.status).toEqual(404);
        });
    });
  });//end of GET describe block

  describe('Testing DELETE', () => {
    it('should delete a profile and return status 204', () => {
      console.log(tempUserData);
      return superagent.delete(`${API_URL}/api/profile/${tempUserData.profile._id}`)
        .set('Authorization', `Bearer ${tempUserData.token}`)
        .then( res => {
          expect(res.status).toEqual(204);
        });
    });
    it('should return status 404', () => {
      return superagent.delete(`${API_URL}/api/profile/69843`)
        .set('Authorization', `Bearer ${tempUserData.token}`)
        .catch( res => {
          expect(res.status).toEqual(404);
        });
    });
    it('should return status 401', () => {
      return superagent.delete(`${API_URL}/api/profile/${tempUserData.profile._id}`)
        .catch( res => {
          expect(res.status).toEqual(401);
        });
    });
  });//end of DELETE describe block

  describe('Testing PUT', () => {
    it('should respond with a 200 and modify the selected profile', () => {
      return superagent.put(`${API_URL}/api/profile/${tempUserData.profile._id}`)
        .set('Authorization', `Bearer ${tempUserData.token}`)
        .send({
          realName: 'Josh Farber',
        })
        .then(res =>{
          // console.log('res.body', res.body);
          console.log('tempUserData.user._id', tempUserData.user._id);
          expect(res.status).toEqual(200);
        });
    });
    it('should respond with a status 400 Bad request', () => {
      return superagent.put(`${API_URL}/api/profile/${tempUserData.profile._id}`)
        .set('Authorization', `Bearer ${tempUserData.token}`)
        .send({})
        .catch(res => {
          expect(res.status).toEqual(400);
        });
    });
    it('should respond with a status 404 Not Found', () => {
      return superagent.put(`${API_URL}/api/profile/75493`)
        .set('Authorization', `Bearer ${tempUserData.token}`)
        .catch(res => {
          expect(res.status).toEqual(404);
        });
    });
    it('should respond with a status 401 Unauthorized', () => {
      return superagent.put(`${API_URL}/api/profile/${tempUserData.profile._id}`)
        .send({})
        .catch(res => {
          expect(res.status).toEqual(401);
        });
    });
  });//end of PUT describe block

}); //end of describe block
