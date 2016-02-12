var mongoose = require('mongoose');

// TODO: see https://devcenter.heroku.com/articles/nodejs-mongoose#initializing-and-connecting
var uristring =
  process.env.MONGOLAB_URI || 'mongodb://localhost/shortly';

mongoose.connect(uristring);

var db = mongoose.connection;

module.exports = db;
