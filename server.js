const http = require('http');

const ip = 'localhost';
const port = 3000;

http.createServer(function(req, resp){
    resp.end('<html><body>First request</body></html>');
}).listen(port, ip);
