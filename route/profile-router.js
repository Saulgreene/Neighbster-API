'use strict';

// npm modules
const {Router} = require('express');
const jsonParser = require('body-parser').json();

// app modules
const bearerAuth = require('../lib/bearer-auth-middleware.js');
const basicAuth = require('../lib/basic-auth-middleware.js');
const Profile = require('../model/profile.js');

// module logic
const profileRouter = module.exports = new Router();

// /api/signup
profileRouter.post('/api/profile',bearerAuth, jsonParser, (req, res, next) => {
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

profileRouter.delete('/api/profile/:id',bearerAuth, (req, res, next) => {
  console.log('Hit DELETE /api/profile');
  Profile.findById(req.params.id)
    .then(profile => {
      if(req.user._id.toString() !== profile.userId.toString()){
        console.log(req.params.id);
        console.log('profile in findById', profile);
        throw Error('Unauthorized cannot change another users profile');
      }
      return profile;
    })
    .then(profile => {
      Profile.findByIdAndRemove(req.params.id)
        .then(() => res.sendStatus(204))
        .catch(next);
    })
    .catch(next);
});

profileRouter.put('/api/profile/:id',bearerAuth, jsonParser, (req, res, next) => {
  console.log('Hit PUT /api/profile');
  let options ={
    new: true,
  };
  Profile.findById(req.params.id)
    .then(profile => {
      if(req.user._id.toString() !== profile.userId.toString()){
        console.log(req.params.id);
        console.log('profile in findById', profile);
        throw Error('Unauthorized cannot change another users profile');
      }
      return profile;
    })
    .then(profile => {
      // console.log('profile returned', profile);
      Profile.findOneAndUpdate(req.params.id, req.body, options)
        .then(profile => res.json(profile))
        .catch(next);
    })
    .catch(next);
});
