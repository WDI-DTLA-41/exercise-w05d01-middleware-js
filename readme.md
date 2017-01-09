# Practice Middleware and Routing

We're going to practice routing requests,
sending static files and dynamically creating our own.

Configure a new express application to 
- serve a [favicon](http://minabach.co.uk/favicon.ico) from '/public'
- serve static files from '/public'
- log requests using morgan (format 'dev')

# Serving Static Files

When a user visits '/'
- serve index.html from 'public'
- Create a `main.js` and `style.css` and serve them from public as well.
- Include [`nomalize.css`](https://cdnjs.com/libraries/normalize) and [`jquery`](https://cdnjs.com/libraries/jquery/) from CDNS.
- Add a class to the body that makes the background pink.

When a user clicks "#greeting" 
- Use __client-side__ JavaScript to change the text to "Hello!"

# Requests with data!

When a user visits '/', fills out the GET request form and clicks submit
- render a string of HTML that says "You entered:" and the value from `<input type="text" name="key">`

# BodyParser

"Parse incoming request bodies in a middleware before your handlers, available under the req.body property."

> Install the express middleware 'body-parser' and configure it to handle JSON and url-encoded form requests

```
var bodyParser = require('body-parser')

var app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse application/json
app.use(bodyParser.json())
```

When a user visits '/', fills out the POST request form and clicks submit

- render a string of HTML that says "You entered:" and the value from `<input type="text" name="key">`

When a user visits '/internal.html'
- serve an html file from 'public' that loads 'normalize.css' and 'jquery' from a 'vender' directory.
> Hint! What do the express docs say about serving assets from multiple directories?

When a user visits '/menu' 
- use `require` to load the products inside `lib/products.js`
- render a string of HTML with the the products names in an unordered list

```
var products = [
  {name: 'bento box', price: 5.99, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Bento_box_from_a_grocery_store.jpg/220px-Bento_box_from_a_grocery_store.jpg',
  {name: 'hamburger', price: 2.99, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Big_Mac_hamburger.jpg/220px-Big_Mac_hamburger.jpg'},
  {name: 'kale salad', price: 8.99, img: 'http://www.seriouseats.com/recipes/assets_c/2012/11/2012-12-05-kale-currants-pinenuts-salad-thumb-625xauto-289152.jpg'},
  {name: 'milk shake', price: 4.99, img: 'http://www.torani.com/sites/default/files/recipes/illustration/Vanilla%20Milkshake.jpg'}
];
```

When a user visits '/search.html'
- serve an html file from 'public' that displays an HTML form.
- the form should perform a 'GET' request to '/search' and include an input field with a name attribute set to 'keyword' and a button that says "Search"

When a user enters a keyword and clicks "Search"
- if the keyword matches a name in the products array
- render a string of HTML for that product

When a user visits '/sign.html'
- serve a static page with a form
- the form should include input fields with `name` attributes for 'username' and 'message'
- the form should include a submit button
- the form should POST to '/messages'

When a user submits a POST request to '/messages'
- Store the data from the POST request 
- redirect to '/messages'

When a user visits '/messages'
- Render a string of HTML that shows all the submitted messages
