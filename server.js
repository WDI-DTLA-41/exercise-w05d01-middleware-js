var express = require('express'),
    favicon = require('serve-favicon'),
    bodyParser = require('body-parser'),
    // fs = require('fs'),
    morgan = require('morgan');

var app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}));

// - serve a [favicon](http://minabach.co.uk/favicon.ico) from '/public'
// - serve static files from '/public'
// - log requests using morgan (format 'dev')

app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(morgan('dev'))

app.use(express.static(__dirname + '/public'));

// When a user visits '/', fills out the
// GET request form and clicks submit
// - render a string of HTML that says "You entered:"
// and the value from `<input type="text" name="key">`

app.get('/blah', (req, res) => {
  var query = req.query.key,
      html = '<h1>You entered: ' + query + '</h1>'
  res.send(html);
})

// When a user visits '/', fills out the
// POST request form and clicks submit

app.post('/blah', (req, res) => {
  var body = req.body.key;
    html = '<h1>You entered: ' + body + '</h1>'
  res.send(html);
})

// When a user visits '/internal.html'
// - serve an html file from 'public' that loads
// 'normalize.css' and 'jquery' from a 'vender' directory.

// When a user visits '/menu'
// - use `require` to load the products inside `lib/products.js`
// - render a string of HTML with the the products names
// in an unordered list

var products = require('./lib/products.js');

app.get('/menu', (req, res) => {
  var types = products.slice();
  var html = '<ul>';
    for ( var i = 0; i < types.length; i++ ) {
      html = html + '<li>' + types[i].name + '</li>';
      productName.push(types[i].name);
    }
    html += '</ul>';
    res.send(html)
})

// When a user visits '/search.html'
// - serve an html file from 'public' that displays an HTML form.
// - the form should perform a 'GET' request to '/search'
// and include an input field with a name attribute set to
// 'keyword' and a button that says "Search"

// When a user enters a keyword and clicks "Search"
// - if the keyword matches a name in the products array
// - render a string of HTML for that product

app.get('/search', (req, res) => {
  var query = req.query.keyword;
  var types = products.slice();
  var productName = [];
  for ( var i = 0; i < types.length; i++ ) {
    productName.push(types[i].name);
  }
  var containsQuery = productName.indexOf(query) > -1;
  if (containsQuery === true) {
    var capQuery = query.charAt(0).toUpperCase() + query.slice(1);
    var ind = productName.indexOf(query);
    var foundItem = types[ind];
    var text = 'Yes, we have that item:<br>' +
      capQuery + ' is ' + foundItem.price + '!<br>' +
      '<img src=\'' + foundItem.img + '\'>';
    res.send(text);
  }
  else {
    res.send('Sorry, go to a different restaurant.');
  }
});

// When a user visits '/sign.html'
// - serve a static page with a form
// - the form should include input fields with `name` attributes for 'username' and 'message'
// - the form should include a submit button
// - the form should POST to '/messages'

// When a user submits a POST request to '/messages'
// - Store the data from the POST request
// - redirect to '/messages'

// When a user visits '/messages'
// - Render a string of HTML that shows all the submitted messages

var archive = [];

app.post('/messages', (req, res) => {
  var user = req.body.username,
      message = req.body.message;
  var archFormat = '(' + user + ': ' + message + ')';
  var text = '<h1>Most Recent Msg</h1><br>' +
    'User: ' + user + '<br>' +
    'Message: ' + message + '<br><br>' +
    archive;

  archive.push(archFormat)
  res.send(text);
})

var port = 3000;
app.listen(port, () => {
  console.log('Listening on port ' + port);
});
