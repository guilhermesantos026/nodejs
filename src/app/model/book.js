const { body } = require('express-validator');

class Livro {

    static validation(){ 
        return [
        body('titulo').isLength({ min: 5 }).withMessage('O titulo precisa ter 5 caracteres'),
        body('preco').isCurrency().withMessage('O preço precisa ter um valor monetário válido')
        ];
    };
}

module.exports = Livro;