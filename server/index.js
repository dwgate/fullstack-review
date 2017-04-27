let express = require('express');
let db = require('../database/index.js');
let bodyParser = require('body-parser');
let request = require('request');
let cors = require('cors');
let app = express();

app.use(cors());

app.use(bodyParser());
app.use(bodyParser.json());

app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos/import', function (req, res) {
  let userName = req.body.user;
  let userAgent = req.headers['user-agent'] + 'dwgate';
  console.log('processing request for user: ' , userName);

  let options = {
    'url': 'https://api.github.com/users/' + userName + '/repos',
    headers: {
      'user-agent':'dwgate' 
    }
  };


// e49dd7c7bd0dfc907b7c32eef1187b0b93aa7cf8

let names = [];
request(options, function(err, res) {
  if (err) {
    console.log('Error: ', err);
  
  } else {
    console.log('Successful get from GitHub! \nstatus code: ', res.statusCode);
    var returnRepo = JSON.parse(res.body);
    returnRepo.forEach( (repo) => {
      names.push([repo.name, repo.forks]);
    });
  }

  console.log('repo names: ', names);
});

  res.end('cool');
});











app.get('/repos', function (req, res) {
  console.log('get request received by server');
  // TODO
});

app.options('/', function(req, res) {
  console.log('options request received by server');
  res.end('okay');
})

var port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

