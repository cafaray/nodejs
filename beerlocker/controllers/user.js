var request = require('http');

// Load required packages
var User = require('../models/user');
var Client = require('../models/client');
var auth = require('./auth');

// Create endpoint /api/users for POST
exports.postUsers = function(req, res) {
  var user = new User({
    username: req.body.username,
    password: req.body.password
  });

  user.save(function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'New beer drinker added to the locker room!' });
  });
};

// Create endpoint /api/login
exports.authenticate = function(req, res) {
    User.findOne({ username: req.body.username }, function(err, user){
        
        if (err)
            res.send(err);
        // No user found with that username
        if (!user) { return callback(null, false); }
        
        // Make sure the password is correct
        user.verifyPassword(req.body.password, function(err, isMatch){
            console.log("isMatch: "+isMatch);
            if(!isMatch)
                res.json("{error: User not verified}");            
            else
                // Success
                Client.findOne({id : user.userId, id : '01110111', secret : '654321'}, function(err, client){
                    if(!client)
                        res.json("{error: Impossible get a valid app }");
                    console.log(client);
                    // localhost:3000/api/oauth2/authorize?client_id=01110111&response_type=code&redirect_uri=http://localhost:30008
                    var url = 'api/oauth/token';
                    var auth = {username: 'cafaray', password: '654321'};
                    var form = {grant_type: 'client_credentials' };
                    request.get( { url: url, auth: auth, form: form, method: 'post' }, function(err, res) {
                        if (err){
                            console.log('Error identified at:' + err);
                            return;
                        }
                        var json = JSON.parse(res.body);
                        console.log("Access Token:", json.access_token);
                      });
                    /*
                    var url = "http://localhost:3000/api/oauth2/authorize?client_id=01110111&response_type=code&redirect_uri=http://localhost:3000";
                    request.get(url, function(err, contents) {
                        if (err) {
                            console.log("unexpected error retrieving " + url, err);
                            return;
                        }
                    });
                    */
                    
                });
                
                res.render('index', { user: user });                
        });
        

        //return callback(null, user);
    });    
};

// Create endpoint /api/users for GET
exports.getUsers = function(req, res) {
  User.find(function(err, users) {
    if (err)
      res.send(err);

    res.json(users);
  });
};

exports.putUsers = function(req, res) {
    User.findOne( {username : req.body.username} , function(err, user){
        console.log("user:"+user);
        if (err)
            res.send(err);
        if(!user)
            res.json("error: user does not exist");
        user.password = req.body.password;
        user.save();
        res.json(user);
    });
};
