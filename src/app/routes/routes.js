const db = require('../../config/database');

const BookDao = require('../../app/infra/book-dao');
const { response } = require('../../config/custom-express');

module.exports = (app) => {

    app.get('/', function(req, resp) {
        resp.marko(
            require('../views/home/home.marko')
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

    app.get('/book/form', function(req, resp) {
        resp.marko(require('../views/books/form/form.marko'), 
            {
                book: {}
            }
        );
    });

    app.post('/book', function(req, resp) {

        const bookDao = new BookDao(db);

        bookDao.add(req.body)
        .then(resp.redirect('/books'))
        .catch(error => console.log(error));
    });

    app.get('/book/find/:id', function(req, resp) {

        const bookDao = new BookDao(db);

        bookDao.findById(req.params.id)
        .then(
            book => resp.marko (
            require('../views/books/form/form.marko'),
            {
                book: book
            }
        ))
        .catch(error => console.log(error));

    });

    app.delete('/book/:id', function(req, resp) {

        const bookDao = new BookDao(db);

        bookDao.delete(req.params.id)
        .then(() => resp.status(200).end())
        .catch(error => console.log(error));
    });

    app.put('/book', function(req, resp) {

        const bookDao = new BookDao(db);

         bookDao.update(req.body)
        .then(() => resp.redirect('/books'))
        .catch(error => console.log(error));

    });
}