class BookDao {

    constructor(db) {
        this._db = db;
    }

    listBooks(callback) {
        this._db.all('select * from livros', 
        (error, results) => 
            callback(error,results)
        )
    }
}

module.exports = BookDao;