// install morgan and serve favicon
// install express
// load favicon image file into public!
// install body-parser
var express = require('express');
var app = express();
// include these
var favicon = require('serve-favicon');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var lib = require('./lib/products.js');


// log requests using morgan(format 'dev')
app.use(morgan('dev'));
// serve a favicon from '/public'
app.use(favicon(__dirname + '/public/favicon.ico'));
// serve static files from '/public'
app.use(express.static(__dirname + '/public'));
app.use('/vendor', express.static('public'))
// configured for HTML forms
app.use(bodyParser.urlencoded({ extended: true }))
// configuired for JSON requests
app.use(bodyParser.json())

// route handlers
// action in html attr defnes paths
app.get('/blah', function(req, res){
  var key = req.query.key;
  var html = "you entered: " + key;
  res.send(html);
});

app.post('/blah',function(req,res){
  var key = req.body.key;
  var html = "You entered: " + key;
  res.send(html);
});
app.get('/internal', function(req, res){
  res.redirect('/vendor');
});

app.get('/menu', function(req, res){
  var html = "<ul>";
  lib.forEach(function(value){
    html += "<li>" + value.name + " price: " + value.price + " <img src='" + value.img + "'>" + "</li>"
  })
  html += "</ul>"
  // console.log(html);

  res.send(html);
});

app.get('/search',function(req,res){
  console.log('hello');
  var key = req.query.keyword;
  var html;
  lib.forEach(function(value){
   if(value["name"] === key){
    return html = value["name"]
   }
   console.log("res.send");
  });
   res.send(html);
});
  var messages = [];

app.post('/messages',function(req,res){
  console.log('req.body=', req.body);
  var username = req.body.username;
  var message = req.body.message;
  var html = username +  " posted: " + message;
  messages.push(req.body);
  res.send(messages);
});


// include this listener
var port = 3000;
app.listen(port, function(){
  console.log('Listening on port ' + port);
});
