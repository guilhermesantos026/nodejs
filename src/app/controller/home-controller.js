const template = require('../views/template');

class HomeController {

    static routes() {
        return {
            home: '/',
            login: '/login'
        };
    }

    home(){
        return function(req, resp) {
            resp.marko(
                (template.home.home)
            ); 
        }
    }

    login(){
        return function(req, resp) {
            resp.marko(
                (template.home.login)
            );
        }
    }

    doLogin() {
        return function(req, resp) {
            console.log('login');
        }
    }
}

module.exports = HomeController;