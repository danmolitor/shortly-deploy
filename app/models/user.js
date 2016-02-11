var db = require('../config.js');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var mongoose = require('mongoose');

//Schema creation
var userSchema = mongoose.Schema({
  username: String,
  password: String,
  ts: String
});

userSchema.pre('save', function(next){
  var cipher = Promise.promisify(bcrypt.hash);
  return cipher(this.password, null, null).bind(this)
    .then(function(hash) {
      this.password = hash;
      next();
    });
});

userSchema.methods.comparePassword = function(attemptedPassword, callback) {
  bcrypt.compare(attemptedPassword, this.password, function(err, isMatch) {
    callback(isMatch);
  });
}

//Creating the model
module.exports.User = User = db.model('User', userSchema);

//Instantiating
// var gordon = new User({username: "Gordon", password: "password"})

// gordon.save(function(err, instance) {
//   if (err) {
//     return console.log(err);
//   }
//   console.log(instance);
//   instance.comparePassword('password', function(isMatch) {
//     console.log('match: ', isMatch);
//   })
// })

// User.find(function (err, instance) {
//   if (err) return console.error(err);
//   console.log(instance);
// })

// User.find({username: 'Gordon'}, function(err, instance) {
//   if (err) {
//     console.log(err);
//   }
//   console.log(instance);
// })






// var db = require('../config');
// var bcrypt = require('bcrypt-nodejs');
// var Promise = require('bluebird');

// var User = db.Model.extend({
//   tableName: 'users',
//   hasTimestamps: true,
//   initialize: function(){
//     this.on('creating', this.hashPassword);
//   },
//   comparePassword: function(attemptedPassword, callback) {
//     bcrypt.compare(attemptedPassword, this.get('password'), function(err, isMatch) {
//       callback(isMatch);
//     });
//   },
//   hashPassword: function(){
//     var cipher = Promise.promisify(bcrypt.hash);
//     return cipher(this.get('password'), null, null).bind(this)
//       .then(function(hash) {
//         this.set('password', hash);
//       });
//   }
// });

// module.exports = User;
