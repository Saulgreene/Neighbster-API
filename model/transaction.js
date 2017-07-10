'use strict';

const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema({

  toolID: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'tool'},
  toolOwner: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'user'},
  personRequesting: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'user'},
  startDate: {type: Date},
  endDate: {type: Date},
});

module.exports = mongoose.model('transaction', transactionSchema);
