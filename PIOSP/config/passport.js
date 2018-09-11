/*eslint no-undef: "error"*/
/*eslint-env node*/ 

var admin = require('../app/controllers/admin');
var activity = require('../app/controllers/activity');
// var express = require('express');
// var router = express.Router();

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var bcrypt = require('bcrypt-nodejs');

// var jwt = require('jsonwebtoken');

var JwtStrategy = require('passport-jwt').Strategy;
    // ExtractJwt = require('passport-jwt').ExtractJwt;



    var localLogin = new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) { // callback with email and password from our form

        // ===============
        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        admin.getUserByUsername(email, function(err, user) {
            // if there are any errors, return the error before anything else

            if (err)
                return done(null, false, {'error': err}); // req.flash is the way to set flashdata using connect-flash


            // if no user is found, return the message
            if (!user)
                return done(null, false, {'error': 'Sorry Your Account Not Exits ,Please Create Account.'}); // req.flash is the way to set flashdata using connect-flash


            // if the user is found but the password is wrong
            if (!bcrypt.compareSync(password, user.password))
                return done(null, false, {'error': 'Email and Password Does Not Match.'}); // create the loginMessage and save it to session as flashdata

            if (user.status === 'inactive')
                return done(null, false, {'error': 'Your Account Not Activated ,Please Check Your Email'}); // create the loginMessage and save it to session as flashdata


            // all is well, return successful user

            activity.insertActivity(user._id, true);
            
            return done(null, user);
        });

    });


var cookieExtractor = function(req) {
    var token = null;
    if (req && req.cookies)
    {
        token = req.cookies['jwt'];
    }
    // console.log(req);
    return token;
};

// Setting up JWT login strategy
var jwtLogin = new JwtStrategy(
    {
        // Telling Passport to check authorization headers for JWT
        jwtFromRequest: cookieExtractor, //ExtractJwt.fromAuthHeaderAsBearerToken(), //ExtractJwt.fromAuthHeaderWithScheme("jwt"),
        // Telling Passport where to find the secret
        secretOrKey: 'secret'
    
        // TO-DO: Add issuer and audience checks
    }, 
    function (payload, done) {
        console.log(payload);
    admin.getUserById(payload._id, function (err, user) {
    if (err) { 
        return done(err, false); 
    }

    if (user) {
        done(null, user);
    } else {
        done(null, false);
    }
    });
});

passport.use(jwtLogin);
passport.use(localLogin);