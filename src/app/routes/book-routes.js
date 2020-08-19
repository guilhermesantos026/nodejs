const BookController = require('../controller/book-controller');
const bookController = new BookController();
const Book = require('../model/book');

module.exports = (app) => {
    const bookRoutes = BookController.routes();

    app.get(bookRoutes.list, bookController.lista());

    app.get(bookRoutes.form, bookController.form());

    app.route(bookRoutes.book)
    .post(Book.validation(), bookController.create())
    .put(bookController.update());

    app.get(bookRoutes.findById, bookController.getById());

    app.delete(bookRoutes.delete, bookController.delete());
}
