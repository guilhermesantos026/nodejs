const db = require('../../config/database');

module.exports = (app) => {

    app.get('/', function(req, resp) {
        resp.marko(
            require('../views/books/default.marko')
            );
        
    });

    app.get('/books', function(req, resp) {

        db.all('select * from livros', function(error, results) {

            console.log(results);

            resp.marko(
                require('../views/books/list/list.marko'),
                {
                    books: results
                }
            );

        });
    });
}