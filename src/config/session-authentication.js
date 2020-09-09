const uuid = require('uuid/v4');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const userDao = require('../app/infra/user-dao.js');
const db = require('./database');
const { initialize } = require('passport');

module.exports = (app) => {

    passport.use(new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        (email, password, done) => {
            const userDao = new userDao(db);
            userDao.findByEmail(email)
                .then(user => {
                    if(!user || password != user.password) {
                        return done(null, false, {
                            message: 'Incorrect login'
                        });
                    }
                    return done(null, user);
                }). catch (error => (error, false));
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
};