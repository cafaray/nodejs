var express = require('express');
var birds = require('./birds');
var app = express();

app.use('/birds', birds);

app.get('/example/b', function(req, res, next){
	console.log('the response is sent to next route');
	next();
}, function(req, res){
	res.send('Hello from B!!!');
});

app.listen(3000, function(){
	console.log('Example app listening on port 3000!');
});
