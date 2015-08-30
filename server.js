var express = require('express');
var app = express();
var mongojs = require('mongojs');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');



var db = mongojs('mongodb://jneljneljnel:Treepick1@ds035563.mongolab.com:35563/heroku_nj559zcv', ['tododb']);

 // var db = mongoose.connect('mongodb://localhost/tododb');
 // db.on('error', console.error.bind(console, 'connection error:')); 

app.use(express.static(__dirname ));
app.use(bodyParser.json());

app.get('/tododb', function (req, res) {
 

  db.tododb.find(function (err, docs) {
  
    res.json(docs);
  });
});

app.post('/tododb', function (req, res) { 
  db.tododb.insert(req.body, function(err, doc) {
    res.json(doc);
  });
});

app.delete('/tododb/:id', function (req, res) {
  var id = req.params.id;
  db.tododb.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.get('/tododb/:id', function (req, res) {
  var id = req.params.id;
  db.tododb.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.put('/tododb/:id', function (req, res) {
  var id = req.params.id;
  db.tododb.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
    new: true}, function (err, doc) {
      res.json(doc);
    }
  );
});

app.listen(3000);
console.log("Server running on port 3000");