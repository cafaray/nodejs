var express = require('express');
var app = express();

var cb0 = function(req, res, next){
    console.log('CB0');
    next();
}

var cb1 = function(req, res, next){
    console.log('CB1');
    next();
}

var cb2 = function(req, res){
    res.send('Hello form C!');
}

app.get('/example/c', [cb0, cb1, cb2]);

app.listen(8080, function(){
	console.log('Example app listening on port 8080!');
});
