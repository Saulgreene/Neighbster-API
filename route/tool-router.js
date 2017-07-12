'use strict';

// npm modules
const {Router} = require('express');
const jsonParser = require('body-parser').json();

// app modules
const Tool = require('../model/tool.js');
const basicAuth = require('../lib/basic-auth-middleware.js');
const bearerAuth = require('../lib/bearer-auth-middleware.js');

// module logic
const toolRouter = module.exports = new Router();

// /api/tools
toolRouter.post('/api/tools', bearerAuth, jsonParser, (req, res, next) => {
  console.log('Hit POST /api/tools');

  new Tool(req.body)
    .save()
    .then(tool => res.json(tool))
    .catch(next);
});
//
toolRouter.get('/api/tools/:id', (req, res, next) => {
  console.log('Hit GET /api/tools/:id');
  Tool.findById(req.params.id)
    .then(tool => res.json(tool))
    .catch(next);
});

toolRouter.put('/api/tools/:id', bearerAuth, jsonParser, (req, res, next) => {
  console.log('Hit PUT /api/tools/:id');
  console.log('req.user._id', req.user._id);

  let options = {
    runValidators: true,
    new: true,
  };

  Tool.findById(req.params.id)
    .then(tool => {
      if (req.user._id.toString() !== tool.ownerId.toString()){
        throw Error('Unauthorized - cannot change another users resource');
      }
      return tool;
    })
    .then(tool => {
      console.log('hitting here');
      Tool.findByIdAndUpdate(req.params.id, req.body, options)
        .then(tool => res.json(tool))
        .catch(next);
    })
    .catch(next);
});

toolRouter.delete('/api/tools/:id', bearerAuth, (req, res, next) => {
  console.log('Hit DELETE /api/tools/:id');
  Tool.findById(req.params.id)
    .then(tool => {
      if (req.user._id.toString() !== tool.ownerId.toString()){
        throw Error('Unauthorized - cannot change another users resource');

        return tool;
      }
    })
    .then(tool => {
      Tool.findByIdAndRemove(req.params.id)
        .then(() => res.sendStatus(204));
    })
    .catch(next);
});
