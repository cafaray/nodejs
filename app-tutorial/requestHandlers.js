//var exec = require('child_process').exec;
var queryString = require("querystring");

function engine(response, postData){
    //console.log("function engine was called");
    //function sleep(milliseconds){
    //    var startTime = new Date().getTime();
    //    while(new Date().getTime() < startTime + milliseconds);
    //}
    //sleep(10000);
/*exec("ls -lah", function(error, stdout, stderr) {
    //    response.writeHead(200, {"Content-Type": "text/html"});
    //    response.write(stdout);
    //    response.end;
});*/

    //return "Hello start engine";

    var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" method="post">'+
    '<textarea name="text" rows="20" cols="60"></textarea>'+
    '<input type="submit" value="Enviar texto" />'+
    '</form>'+
    '</body>'+
    '</html>';
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}

function upload(response, dataPosted){
    //console.log("function upload was called");
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write("Tu enviaste: "+ queryString.parse(dataPosted)["text"]);
    response.end();
}

exports.engine  = engine;
exports.upload = upload;