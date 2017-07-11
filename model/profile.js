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

profileSchema.pre('save',function(next) {
  console.log('pre save doc', this);
  User.findById(this.user)
    .then(user => {
      let profileIDSet = new Set(user.profile);
      profileIDSet.add(this._id);
      user.profile = Array.from(profileIDSet);
      return user.save();
    })
    .then(() => next())
    .catch(() =>
      next(new Error('validation failed to create profile because user does not exist')));
});

profileSchema.post('save', function(doc, next) {
  console.log('post save doc', doc);
  User.findById(doc.user)
    .then(user => {
      user.profile.push(doc._id);
      return user.save();
    })
    .then(() => next())
    .catch(next);
});


profileSchema.post('remove', function(doc, next) {
  console.log('post remove doc', doc);
  User.findById(doc.user)
    .then(user => {
      user.profile = user.profile.filter(profile => profile._id !== doc._id);
      return user.save();
    })
    .then(() => next())
    .catch(next);
});

module.exports = mongoose.model('profile', profileSchema);
