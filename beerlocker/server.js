var express = require("express"); // Get the packages we need
var mongoose = require('mongoose'); // Get the package to connect mongo
var bodyParser = require('body-parser'); // for understand the request body
var passport = require('passport');
var session = require('express-session');

var ejs = require('ejs');

// requiered models
var beerController = require('./controllers/beer');
var userController = require('./controllers/user');
var authController = require('./controllers/auth');
var clientController = require('./controllers/client');
var oauth2Controller = require('./controllers/oauth2');

// make the connection to db:
mongoose.connect('mongodb://localhost:27017/beerlocker');

var app = express(); // Create our Express application

app.set('view engine', 'ejs'); // Set view engine to ejs

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(session({
    secret: 'Super Secret Session Key',
    saveUninitialized: true,
    resave: true
}));

// Use the passport package in our application
app.use(passport.initialize());

var port = process.env.PORT || 3000; // Use environment defined port or 3000
var router = express.Router(); // Create our Express router
/*
    Initial dummy route for testing
    http://localhost:3000/api
*/
router.get('/', function(req, res){
    res.render('login');
    //res.json({ message: 'You are running dangerously low on beer!' });
});

// Create a new route with the prefix /beers
router.route('/api/beers')
    .post(authController.isAuthenticated, beerController.postBeers)
    .get(authController.isAuthenticated, beerController.getBeers);

router.route('/api/beers/:beer_id')
    .get(authController.isAuthenticated, beerController.getBeer)
    .put(authController.isAuthenticated, beerController.putBeer)
    .delete(authController.isAuthenticated, beerController.deleteBeer);

router.route('/api/login')
    .post(userController.authenticate);

router.route('/api/users')
    .post(userController.postUsers)
    .get(userController.getUsers)
    .put(userController.putUsers);

// Create endpoint handlers for /clients
router.route('/api/clients')
    .post(authController.isAuthenticated, clientController.postClients)
    .get(authController.isAuthenticated, clientController.getClients);

// Create endpoint handlers for oauth2 authorize
router.route('/api/oauth2/authorize')
    .get(authController.isAuthenticated, oauth2Controller.authorization)
    .post(authController.isAuthenticated, oauth2Controller.decision);

// Create endpoint handlers for oauth2 token
router.route('/api/oauth2/token')
    .post(authController.isClientAuthenticated, oauth2Controller.token);

app.use(router); // Register all our routes with /api

// Start the server
app.listen(port); 
// set log to console
// console.log('insert beer on port:' + port);
