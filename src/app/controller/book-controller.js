const db = require('../../config/database');
const BookDao = require('../../app/infra/book-dao');
const { validationResult } = require('express-validator');

const template = require('../views/template');

class BookController {

    static routes() {
        return {
            list: '/books',
            form: '/book/form',
            book: '/book',
            findById: '/book/find/:id',
            delete: '/book/:id'
        };
    }

    lista(){
        return function(req, resp) {

            const bookDao = new BookDao(db);
    
            bookDao.list()
                .then(books => resp.marko(
                    template.book.list,
                    {
                        books: books
                    }
                ))
                .catch(error => console.log(error));
        }
    }

    form(){
        return function(req, resp) {
            resp.marko(template.book.form,
                {
                    book: {}
                }
            );
        }
    }

    getById(){
        return function(req, resp) {

            const bookDao = new BookDao(db);
    
            bookDao.findById(req.params.id)
            .then(
                book => resp.marko (
                    template.book.form,
                {
                    book: book
                }
            ))
            .catch(error => console.log(error));
        }
    }

    delete(){
        return function(req, resp) {

            const bookDao = new BookDao(db);
    
            bookDao.delete(req.params.id)
            .then(() => resp.status(200).end())
            .catch(error => console.log(error));
        }
    }

    update(){
        return function(req, resp) {

            const bookDao = new BookDao(db);
    
             bookDao.update(req.body)
            .then(() => resp.redirect('/books'))
            .catch(error => console.log(error));
    
        }
    }

    create(){
        
        return function(req, resp) {
        
            const bookDao = new BookDao(db);
            
            const errors = validationResult(req);
            
            if(!errors.isEmpty()){
                return resp.marko(
                    template.book.form,
                    {
                        book: req.body,
                        errorValidation: errors.array()
                    }
                );
            } 
        
            bookDao.add(req.body)
            .then(resp.redirect('/books'))
            .catch(error => console.log(error));
        }
    }
}

module.exports = BookController;