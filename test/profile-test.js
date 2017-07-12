'use strict';

require('dotenv').config({path: `${__dirname}/../.test.env`});

const expect = require('expect');
const superagent = require('superagent');
const server = require('../lib/server.js');

const API_URL = process.env.API_URL;
const clearDB = require('./lib/clear-db.js');
const mockUser = require('./lib/mock-user.js');
const mockProfile = require('./lib/mock-profile.js');


describe('Testing Profile Model', () =>{
  let tempUserData;
  before(server.start);
  after(server.stop);
  beforeEach('create mockProfile', () =>{
    return mockProfile.createOne()
      .then(userData => {tempUserData = userData.user;});
  });
  afterEach(clearDB);

  describe('Testing POST', () => {
    it('should return a 200 status and a profile', () =>{
      return superagent.post(`${API_URL}/api/profile`)
        .send({
          address: '6208 57th ave south seattle WA 98118',
          phone: '2533978733',
          realName: 'Saul Greene',
          picURI: 'some pic URI string',
          userId: tempUserData._id,
        })
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body.address).toEqual('6208 57th ave south seattle WA 98118');
          expect(res.body.phone).toEqual('2533978733');
          expect(res.body.realName).toEqual('Saul Greene');
          expect(res.body.picURI).toEqual('some pic URI string');
          expect(res.body.userId).toEqual(tempUserData._id);
          expect(res.text.length > 1).toBeTruthy();
        });
    });
    it('should return a 400 status Bad Request', () =>{
      return superagent.post(`${API_URL}/api/profile/`)
        .send({})
        .catch(res => {
          expect(res.status).toEqual(400);
        });
    });
  });//end of POST describe block
  describe('Testing GET', () => {
    it('should return a status 200 and a retrieved profile', () => {
      return superagent.get(`${API_URL}/api/profile/${tempUserData._id}`)
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
  });

}); //end of describe block
