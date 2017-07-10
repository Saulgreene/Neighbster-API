'use strict';

const mongoose = require('mongoose');
const User = require('./user.js');

const profileSchema = mongoose.Schema({
  address: {type: String, required: true},
  phone: {type: String, required: true},
  realName: {type: String, required: true},
  picURI: {type: String, required: true},
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
});


module.exports = mongoose.model('profile', profileSchema);
