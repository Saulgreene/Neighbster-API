'use strict';

// npm modules
const {Router} = require('express');
const jsonParser = require('body-parser').json();

// app modules
const basicAuth = require('../lib/basic-auth-middleware.js');
const Profile = require('../model/profile.js');

// module logic
const profileRouter = module.exports = new Router();

// /api/signup
profileRouter.post('/api/profile', jsonParser, (req, res, next) => {
  console.log('Hit POST /api/profile');
  Profile.create(req.body)
    .then(profile => {
      console.log('profile', profile);
      res.send(profile);})
    .catch(next);
});

profileRouter.get('/api/profile/:id', jsonParser, (req, res, next) => {
  console.log('Hit GET /api/profile');
  return Profile.findById(req.params.id)
    .then(profile => res.json(profile))
    .catch(next);
});
