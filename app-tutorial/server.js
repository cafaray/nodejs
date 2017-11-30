var http = require('http');
var url = require('url');
// function start make posible to listen http requests
function start(route, handle){
	function onRequest(request, response) {
		var dataPosted = "";
		var pathName = url.parse(request.url).pathname;
		console.log("request for " + pathName + " received");
		
		request.setEncoding("utf8");
		request.addListener("data", function(chunk){
			dataPosted += chunk;
			console.log("chunk is: '"+chunk+"'.");
		});
		request.addListener("end", function(){
			route(handle, pathName, response, dataPosted);
		});
		
		//response.writeHead(200, {"Content-Type" : "text/html"});
		//var content = route(handle, pathName);
		//response.write(content);
		//response.end();
	}
	http.createServer(onRequest).listen(3000);
	console.log("server started");
}

// exports this function to be used in another modules
exports.start = start;