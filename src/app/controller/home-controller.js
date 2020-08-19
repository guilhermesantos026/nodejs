const template = require('../views/template');

class HomeController {

    static routes() {
        return {
            home: '/'
        };
    }

    home(){
        return function(req, resp) {
            resp.marko(
                (template.home.home)
                //require('../views/home/home')
            ); 
        }
    }
}

module.exports = HomeController;