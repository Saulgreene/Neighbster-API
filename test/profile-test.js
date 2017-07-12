'use strict';

require('dotenv').config({path: `${__dirname}/../.test.env`});

const expect = require('expect');
const superagent = require('superagent');
const server = require('../lib/server.js');

const API_URL = process.env.API_URL;
const clearDB = require('./lib/clear-db.js');
const mockUser = require('./lib/mock-user.js');
// const mockProfile = require('./lib/mock-profile.js');


describe('Testing Profile Model', () =>{
  let tempUser;
  before(server.start);
  after(server.stop);
  // beforeEach('create mockProfile', () =>{
  //   return mockProfile.createOne()
  //     .then(userData => {tempUser = userData.user;});
  // });
  afterEach(clearDB);

  describe('Testing POST', () => {
    it.only('should return a 200 status and a profile', () =>{
      let tempUser;
      return mockUser.createOne();
      return superagent.post(`${API_URL}/api/profile`)
        .send({
          address: '6208 57th ave south seattle WA 98118',
          phone: '2533978733',
          realName: 'Saul Greene',
          picURI: 'some pic URI string',
          userId: tempUser._id,
        })
        .then(res => {
          console.log(req);
          console.log('tempuser', tempUser._id);
          expect(res.status).toEqual(200);
          expect(res.body.address).toEqual('6208 57th ave south seattle WA 98118');
          expect(res.body.phone).toEqual('2533978733');
          expect(res.body.realName).toEqual('Saul Greene');
          expect(res.body.picURI).toEqual('some pic URI string');
          expect(res.body.userId).toEqual(tempUser._id);
          expect(res.text.length > 1).toBeTruthy();
        });
      console.log('HELP ME');
    });
  });


});
