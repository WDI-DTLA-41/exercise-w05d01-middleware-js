var express = require('express');
var app = express();
var morgan = require('morgan');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');


// serve a favicon from '/public'
// serve static files from '/public'
// log requests using morgan (format 'dev')

app.use(morgan('dev'));
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/vendor'));
//app.use(express.static(__dirname + '/lib'));
// use body parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({entended: true}));
// parse application/json
app.use(bodyParser.json());


//route handlers
app.get('/blah', function(req, res) {
  res.send('You entered: ' + req.query.key);
});
// uses body parser
app.post('/blah', function(req, res) {
  res.send('You entered : ' + req.body.key);
});
app.get('/menu', function(req, res) {
  var products = require('./lib/products.js');
  var menu = '<ul>';
  products.forEach(function(obj) {
    menu += '<li>' + obj.name + '</li>';
  });
  menu += '</ul>';
  res.send(menu);
});
app.get('/search', function(req, res) {
  var products = require('./lib/products.js');
  var noMatch = 'Sorry, no matches found!';
  var match = '';
  products.forEach(function(obj) {
    if(req.query.keyword === obj.name) {
      match = '<img src=' + obj.img + '><br>' + obj.name + ' Price: ' + obj.price;
    }
  });
  if(match) {
    res.send(match);
  } else {
    res.send(noMatch);
  }
});

var messages = [];
app.post('/messages', function(req, res) {
  var message = {};
  message.user = req.body.username;
  message.input = req.body.message;
  messages.push(message);
  res.redirect('/messages');
});
app.get('/messages', function(req, res) {
  var list = '<ul>';
  messages.forEach(function(el) {
    list += '<li>' + el.user + ': ' + el.input + '</li>';
  });
  list += '</ul>';
  res.send(list);
});

var port = 3000;
app.listen(port, function(){
  console.log('Listening on port ' + port);
});
