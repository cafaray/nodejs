function route(handle, pathName, response, postData){
    console.log("Routing request to " + pathName);
    if(typeof handle[pathName] === 'function') {
        return handle[pathName](response, postData);
    } else {
        console.log("Could not find the route to the resource"+pathName);
        response.writeHead(404, {"Content-Type": "text/html"});
        response.write("404 Resource unavailable");
		response.end();
    }
}

exports.route = route;