const http = require('http')
const port = 3000
http.createServer((req, res) => {
    console.log(req.headers)
    console.log(req.method)
    console.log(req.url)
    if(req.method=='POST'){
        let buff = ''
        req.on('data', function(chunk){
            buff += chunk
        })
        req.on('end', function(){
            console.log(`Body: ${buff}`)
            res.end('\nAccepted body\n\n')            
        })
    } else {
        res.writeHead(200, {"Content-Type" : "text/plain"})
        res.end('Hello World!\n')
    }    
}).listen(port)

console.log(`Server running at http://localhost:${port}/`)