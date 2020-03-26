class BookDao {

    constructor(db) {
        this._db = db;
    }

    list() {
        return new Promise((resolve, reject) => {
            this._db.all(
                'select * from livros', 
            (error, results) => {
                if(error) return reject('Not possible list books');

                return resolve(results);
                }
            ) 
        });
    }
}

module.exports = BookDao;