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

    add(book) {
        return new Promise((resolve, reject) => {
            this._db.run(`
            insert into livros (
                titulo,
                preco,
                descricao
            ) values (?,?,?)`,
            [
                book.titulo,
                book.preco,
                book.descricao

            ],
            function(err) {
                if(err) {
                    console.log(err);
                    return reject('was not possible to add book');
                }
                resolve();
            } )
        });
    }

    findById(id) {
        return new Promise((resolve, reject) => {
            
            this._db.get('select * from livros where id = ?'
                ,[id]
                ,(error, book) => {
                    if(error) {
                        return reject('Not possible find by id' + error);
                    }
                return resolve(book);
                }   
            );
        });
    }
}

module.exports = BookDao;