const db = require('../database/index.js');
const mongoose = require('mongoose');


const DB = {


  save: function() {

  },

  find: function(options, res) {
    db.repo.find(options)
      .exec( (err, docs) => {
        let top = docs.sort( (x, y) => {
          return y.size - x.size;
        }).slice(0, 20);
        
        res.send(top);
      })
  }


};



module.exports = DB;