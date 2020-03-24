module.exports = (app) => {

    app.get('/', function(req, resp) {
        resp.marko(
            require('../views/books/default.marko')
            );
        
    });

    app.get('/books', function(req, resp) {
        resp.marko(
            require('../views/books/list/list.marko'),
            {
                books: [
                    {
                        id: 1,
                        title: 'Node fundamentals'
                    },
                    {
                        id: 2,
                        title: 'Node advanced'
                    }
                ]
            }
        );
    });
}