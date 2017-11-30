var server = require('./server.js');
var router = require('./router.js');
var requestHandler = require('./requestHandlers.js');

var handle = {};
handle["/"] = requestHandler.engine;
handle["/start"] = requestHandler.engine;
handle["/upload"] = requestHandler.upload;

server.start(router.route, handle);