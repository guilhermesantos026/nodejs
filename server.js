const express = require('express');

const app = express();

app.listen(3000, function() {
    
});

app.get('/', function(req, resp) {
    resp.send('<html><body>First get method request</body></html>');
});

app.get('/books', function(req, resp) {
    resp.send('<html><body>list books</body></html>');
});