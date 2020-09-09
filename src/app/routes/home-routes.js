const HomeController = require('../controller/home-controller');
const { routes } = require('../controller/home-controller');
const homeController = new HomeController();

module.exports = (app) => {
    const homeRoutes = HomeController.routes();

    app.get(homeRoutes.home, homeController.home());

    app.route(homeRoutes.login)
        .get(homeController.login())
        .post(homeController.doLogin());
}