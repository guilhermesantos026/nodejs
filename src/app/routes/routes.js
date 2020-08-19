const { body, validationResult } = require('express-validator');
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

    app.post('/book', [
        body('titulo').isLength({ min: 5 }).withMessage('O titulo precisa ter 5 caracteres'),
        body('preco').isCurrency().withMessage('O preço precisa ter um valor monetário válido')
    ],function(req, resp) {

        const bookDao = new BookDao(db);
        
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return resp.marko(
                require('../views/books/form/form.marko'),
                {
                    book: {},
                    errorValidation: errors.array()
                }
            );
        }

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