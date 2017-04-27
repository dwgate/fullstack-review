var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/fetcher');


var repoSchema = new Schema({
  id: Number,
  owner: String,
  name: String,
  description: String,
  link: String,
  size: Number
});

var userSchema = new Schema({
  id: Number,
  name: String,
  user_id: Number
});

var repoModel = mongoose.model('repos', repoSchema);
var userModel = mongoose.model('users', userSchema);




var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('OPEN connection to database!');
});


module.exports.repo = repoModel;
module.exports.user = userModel;

