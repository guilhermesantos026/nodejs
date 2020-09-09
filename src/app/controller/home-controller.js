const template = require('../views/template');

const BookController = require('./book-controller');

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
        return function(req, resp, next) {
            const passport = req.passport;
            passport.authenticate('local', (error, user, info) => {
                if(info) {
                    return resp.marko(template.home.login);
                }
                if(error) {
                    return next(error);
                }

                req.login(user, (error) => {
                    if(error) {
                        return next(error);
                    }
                    return resp.redirect(BookController.routes().list);
                });
            }) (req, resp, next);
        };
    }
}

module.exports = HomeController;