const db = require('../../config/database');

const BookDao = require('../../app/infra/book-dao');

module.exports = (app) => {

    app.get('/', function(req, resp) {
        resp.marko(
            require('../views/books/default.marko')
            );
        
    });

    app.get('/books', function(req, resp) {

        const bookDao = new BookDao(db);

        bookDao.list()
            .then(books => resp.marko(
                require('../views/books/list/list.marko'),
                {
                    books: books
                }
            ))
            .catch(error => console.log(error));
    });

    app.get('/books/form', function(req, resp) {
        resp.marko(require('../views/books/form/form.marko'))
    });

    app.post('/books', function(req, resp) {

        const bookDao = new BookDao(db);

        bookDao.add(req.body)
        .then(resp.redirect('/books'))
        .catch(error => console.log(error));
    });
}