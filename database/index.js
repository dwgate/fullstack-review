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



var Repo = mongoose.model('Repo', repoSchema);
var User = mongoose.model('User', userSchema);



var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.on('open', function() {
  console.log('OPEN connection to database!');
});


module.exports.repo = Repo;
module.exports.user = User;