'use strict';

// npm modules
const {Router} = require('express');
const jsonParser = require('body-parser').json();

// app modules
const Tool = require('../model/tool.js');

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
// toolRouter.get('/api/tools', basicAuth, (req, res, next) => {
//   console.log('Hit GET /api/tools');
//   req.user.tokenCreate()
//     .then(token => res.send(token))
//     .catch(next);
// });
