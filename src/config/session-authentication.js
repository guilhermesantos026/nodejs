const uuid = require('uuid/v4');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const UserDao = require('../app/infra/user-dao');
const db = require('./database');
const { initialize } = require('passport');

module.exports = (app) => {

    passport.use(new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        (email, password, done) => {
            const userDao = new UserDao(db);
            userDao.findByEmail(email)
                .then(user => {
                    if(!user || password != user.password) {
                        return done(null, false, {
                            message: 'Incorrect login'
                        });
                    }
                    return done(null, user);
                }).catch(erro => done(erro, false));
        }
    ));

    passport.serializeUser((user, done) => {
        const userSession = {
            name: user.full_name,
            email: user.email
        };
        
        done(null, userSession);
    });

    passport.deserializeUser((userSession, done) => {
        done(null, userSession);
    });

    app.use(session({
        secret: 'node alura',
        genid: function(req) {
            return uuid();
        },
        resave: false,
        saveUninitialized: false
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    app.use(function (req, resp, next) {
        req.passport = passport;
        next();
    });
};