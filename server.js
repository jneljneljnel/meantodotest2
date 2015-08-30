var express = require('express');
var app = express();
var mongojs = require('mongojs');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');



var db = mongojs('tododb', ['tododb']);

 // var db = mongoose.connect('mongodb://localhost/tododb');
 // db.on('error', console.error.bind(console, 'connection error:'));  


var todoSchema = new mongoose.Schema({  
   name: String,
   desc: String
});
mongoose.model('Todo', todoSchema);  




app.use(express.static(__dirname ));
app.use(bodyParser.json());

app.get('/tododb', function (req, res) {
  console.log('I received a GET request');

  db.tododb.find(function (err, docs) {
    console.log(docs);
    res.json(docs);
  });
});

app.post('/tododb', function (req, res) {
  console.log(req.body);
  db.tododb.insert(req.body, function(err, doc) {
    res.json(doc);
  });
});

app.delete('/tododb/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.tododb.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.get('/tododb/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.tododb.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.put('/tododb/:id', function (req, res) {
  var id = req.params.id;
  console.log(req.body.name);
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