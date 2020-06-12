const http = require('http')
const url = 'http://nodeprogram.com'
http.get(url, (response) => {
    let c = 0
    response.on('data', (chunk) => { 
        c++
        console.log(chunk.toString('utf-8'))
    })
    response.on('end', () => {
        console.log('Se crearon ' + c + ' chunks')
    })
}).on('error', (error) => {
  console.error(`Got error: ${error.message}`)
})