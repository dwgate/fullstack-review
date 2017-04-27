const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');
const Schema = mongoose.Schema;


const repoSchema = new Schema({
  id: Number,
  owner: String,
  name: String,
  description: String,
  link: String,
  size: Number
});

const userSchema = new Schema({
  id: Number,
  name: String,
  user_id: Number
});

const repoModel = mongoose.model('repos', repoSchema);
const userModel = mongoose.model('users', userSchema);




const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('OPEN connection to database!');
});


module.exports.repo = repoModel;
module.exports.user = userModel;

