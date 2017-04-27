var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

var repoSchema = mongoose.Schema({
  id: Number,
  name: String,
  user_id: Number
});

var userSchema = mongoose.Schema({
  id: Number,
  name: String,
  user_id: Number
});




var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('OPEN connection to database!');
});


module.exports.repo = repoSchema;
module.exports.user = userSchema;

