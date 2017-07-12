'use strict';

const faker = require('faker');
const Profile = require('../../model/profile.js');
const mockUser = require('./mock-user.js');
const mockProfile = module.exports = {};





mockProfile.createOne = () => {
  let tempUser;
  return mockUser.createOne();
  return new Profile({
    address: faker.internet.userName(),
    phone: faker.internet.userName(),
    realName: faker.internet.userName(),
    // picURI:
    userId: tempUser._id,
  });
};
