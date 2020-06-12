// Load required packages
var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var BearerStrategy = require('passport-http-bearer').Strategy;
var Token = require('../models/token');
var User = require('../models/user');

/**
 * cofa ->
 * This is for digest solution, a kind of challenge token to encode the username and password 
 * this make unclear the request: it's a fancy solution to implement something different that jwt
 */
// Load required packages
var DigestStrategy = require('passport-http').DigestStrategy;

passport.use(new DigestStrategy(
    { qop: 'auth' },
    function(username, callback) {
        console.log("DigestStrategy:data:" + username);   
        User.findOne({ username: username }, function (err, user) {
            if (err) { return callback(err); }
  
            // No user found with that username
            if (!user) { return callback(null, false); }
  
            // Success
            return callback(null, user, user.password);
        });
    },
    function(params, callback) {
        // validate nonces as necessary
        callback(null, true);
    }
));

// <- cofa

passport.use(new BasicStrategy(
    function(username, password, callback) {
        console.log("BasicStrategy:data:" + username + '-' + password);        
        User.findOne({ username: username }, function (err, user) {
            if (err) { return callback(err); }

            // No user found with that username
            if (!user) { return callback(null, false); }

            // Make sure the password is correct
            user.verifyPassword(password, function(err, isMatch) {
                if (err) { return callback(err); }

                // Password did not match
                if (!isMatch) { return callback(null, false); }

                // Success
                return callback(null, user);
            });
        });
    }
));

passport.use('client-basic', new BasicStrategy(
    function(username, password, callback) {
        console.log("client-basic:data:" + username + '-' + password);        
      Client.findOne({ id: username }, function (err, client) {
        if (err) { return callback(err); }
  
        // No client found with that id or bad password
        if (!client || client.secret !== password) { return callback(null, false); }
  
        // Success
        return callback(null, client);
      });
    }
));

passport.use(new BearerStrategy(
    function(accessToken, callback) {
        console.log("client-basic:data:" + accessToken);    
      Token.findOne({value: accessToken }, function (err, token) {
        if (err) { return callback(err); }
  
        // No token found
        if (!token) { return callback(null, false); }
  
        User.findOne({ _id: token.userId }, function (err, user) {
          if (err) { return callback(err); }
  
          // No user found
          if (!user) { return callback(null, false); }
  
          // Simple example with no scope
          callback(null, user, { scope: '*' });
        });
      });
    }
));


exports.isAuthenticated = passport.authenticate(['basic', 'bearer'], { session : false });
exports.isClientAuthenticated = passport.authenticate('client-basic', { session : false });
exports.isBearerAuthenticated = passport.authenticate('bearer', { session: false });
/**
 * --> cofa
 * This endppoint is for the digest solution 
 */
//exports.isAuthenticated = passport.authenticate(['digest', 'bearer'], { session : false });