const express = require('express');
const db = require('../database/index.js');
const bodyParser = require('body-parser');
const request = require('request');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const fs = require('fs');
const rp = require('request-promise')

app.use(cors());

app.use(bodyParser());
app.use(bodyParser.json());

app.use(express.static(__dirname + '/../client/dist'));


let formatRepo = function(repo) {
  let formatted = {
    id: repo.id,
    owner: repo.owner.login,
    name: repo.name,
    description: repo.description,
    link: repo.html_url,
    size: repo.size
  };
  return formatted;
};

app.post('/repos/import', function (req, res) {
  // e49dd7c7bd0dfc907b7c32eef1187b0b93aa7cf8
  // 'e49dd7c7bd0dfc907b7c32eef1187b0b93aa7cf8': 'x-oauth-basic',
  let userName = req.body.user;
  console.log('processing request for user: ' , userName);

  let options = {
    url: 'https://api.github.com/users/' + userName + '/repos',
    Authorization: 'dwgate https://api.github.com',
    headers: {
      'user-agent':'dwgate' 
    }
  };


  rp(options)
  .then( (repos) => {
      //filter out the information we want -> or do this in the request
      //if I can filter like that, I can maybe pass each item right into the db
      let formattedRepos = [];
      let response = JSON.parse(repos);
      // console.log(response);
      console.log('SUCCESS FROM GITHUB');

      response.forEach( (repo) => {
        let formatted = formatRepo(repo);

        formattedRepos.push(formatted);

        db.repo(formatted).save(function(err, doc) {
          if (err) {
            console.log('error', err.message);
          } else {
            console.log('INPUTED INTO DB SUCCESSFULLY LOLOL');
          }
        })

      });
      // console.log('', formattedRepos)
      //send back an array of repos



      res.send(JSON.stringify(formattedRepos));

    }
  )
  .catch( (err) => {
    console.log('ERROR ', err);
  });


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


