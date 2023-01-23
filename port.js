const http = require('http');
const port = process.env.PORT || 3000;
const server = http.createServer((req,res)=>{
        res.statusCode = 201;
        res.setHeader('Content-Type', 'text/html')
        res.end('hiiii')
})

server.listen(port,()=>{
    console.log(port)
})