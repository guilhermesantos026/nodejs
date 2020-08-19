const bookRoutes = require('./book-routes');
const homeRoutes = require('./home-routes');

module.exports = (app) => {
    homeRoutes(app);
    bookRoutes(app);
}