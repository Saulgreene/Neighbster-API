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

// profileSchema.pre('save',function(next) {
//   console.log('pre save doc', this);
//   User.findById(this.userId)
//     .then(user => {
//       user.profileId = this._id;
//       return user.save();
//     })
//     .then(() => next())
//     .catch(() =>
//       next(new Error('validation failed to create profileId because userId does not exist')));
// });
//
// profileSchema.post('remove', function(doc, next) {
//   console.log('post remove doc', doc);
//   User.findById(doc.userId)
//     .then(user => {
//       user.profileId = null;
//       return user.save();
//     })
//     .then(() => next())
//     .catch(next);
// });

module.exports = mongoose.model('profile', profileSchema);
