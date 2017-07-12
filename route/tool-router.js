'use strict';

// npm modules
const {Router} = require('express');
const jsonParser = require('body-parser').json();

// app modules
const Tool = require('../model/tool.js');
const basicAuth = require('../lib/basic-auth-middleware.js');

// module logic
const toolRouter = module.exports = new Router();

// /api/tools
toolRouter.post('/api/tools', jsonParser, (req, res, next) => {
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

toolRouter.delete('/api/tools/:id', (req, res, next) => {
  console.log('Hit DELETE /api/tools/:id');
  Tool.findByIdAndRemove(req.params.id)
    .then(() => res.sendStatus(204))
    .catch(next);
});
