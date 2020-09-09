class UserDao {

    constructor(db) {
        this._db = db;
    }

    findByEmail(email) {
        return new Promise((resolve, reject) => {
            this._db.get(
                `
                    SELECT *
                    FROM usuarios
                    WHERE email = ?
                `,
                [email],
                (erro, user) => {
                    if (erro) {
                        return reject('Não foi possível encontrar o usuário!');
                    }

                    return resolve(user);
                }
            )
        });
    }
}

module.exports = UserDao;