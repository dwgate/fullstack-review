const express = require('express');
const db = require('../database/index.js');
const bodyParser = require('body-parser');
const request = require('request');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const fs = require('fs');
const rp = require('request-promise');

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
    // Authorization: 'dwgate https://api.github.com',
    headers: {
      'Authorization': 'token e49dd7c7bd0dfc907b7c32eef1187b0b93aa7cf8',
      'user-agent':'dwgate' 
    }
  };


  rp(options)
  .then( (repos) => {
      //filter out the information we want -> or do this in the request
      //if I can filter like that, I can maybe pass each item right into the db
      let response = JSON.parse(repos);
      // console.log(response);
      console.log('SUCCESS FROM GITHUB');

      response.forEach( (repo) => {
        let formatted = formatRepo(repo);

        db.repo.find({link: repo.html_url}, function(err, doc) {   
          if (doc.length === 0) {//this repo doesnt exists in our database
            db.repo(formatted).save(function(err, doc) {
              if (err) { console.log('error', err.message);
              
              } else { console.log('INPUTED INTO DB SUCCESSFULLY LOLOL'); }//repo doesn't exist
            })
          
          } else { console.log('Repo already exists!'); }
        
        })

      });

    }
  )
  .catch( (err) => {
    console.log('CAUGHT ERROR ', err);
  })
  .then( () => {
    res.sendStatus(200);
    res.end();
    console.log('whatever')
  });


});





app.get('/repos', function (req, res) {
  db.repo.find({}, (err, docs) => {
  
    var top = docs.sort( (x, y) => {
      return y.size - x.size;
    }).slice(0, 25);

    res.send(top);
  });

});



app.get('', (req, res) => {
  console.log('a;lsdhflak;sdjfklasdkjfal;ksdfja');
})


app.get('/', function(req, res) {
  console.log('page load req sent to server');
  res.end('okay');
})

app.options('/', function(req, res) {
  console.log('options request received by server');
  res.end('okay');
})

var port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});


